import { OrderRequest } from "../interface/orderRequest";
import Order from "../models/order";
import { PaymentRequest } from '../interface/paymentRequest';
import { PaymentResponse } from '../interface/paymentResponse';
import paymentBridge from '../bridges/payment';

const REJECTED = 0;
const PAID = 1;

export default class OrderService {
  async createOrder(request: OrderRequest): Promise<Order> {
    
    let order: Order = new Order();
    order.status = Order.STATUS_CREATED;
    order.number = new Date().getTime().toString();
    order.amount = request.amount;
    order = await order.save();

    // made payment
    const response = await this.transaction(order);
    
    order.status = response.status === PAID ? Order.STATUS_CONFIRM : Order.STATUS_CANCELED;
    order.payment_id = response.id;
    order.completed = response.status === REJECTED;
    order = await order.save();

    // deliver order
    if (order.status === Order.STATUS_CONFIRM) {
      this.deliver(order.id);
    }

    return order;
  }

  async transaction(order: Order): Promise<PaymentResponse> {
    const paymentRequest: PaymentRequest = { order: order, token:"8n439284n92365n9215698fduefhirewjhnfjxrkhqwxf98342y5942" };
    const { data } = await paymentBridge.post<PaymentResponse>('/', paymentRequest);
    
    return data;
  }

  async deliver(orderId: number) {
    // update the order status in between 20s to 30s
    const delay = Math.floor(Math.random() * 10) + 20;
    
    setTimeout(async () => {
      console.log('delivering order');
      const order = await Order.findByPk(orderId);
      
      if (order && !order.completed) {
        order.status = Order.STATUS_DELIVERED;
        order.completed = true;
        order.save();
      }
      
    }, delay * 1000);
  }

  async cancelOrder(id: number): Promise<Order | null> {
    const order = await Order.findOne({ where: { id: id } });
    
    if (order) {
      order.status = Order.STATUS_CANCELED;
      order.completed = true;
      await order.save();
    }

    return order;
  }
}