import { PaymentRequest } from '../interface/paymentRequest';
import Payment from '../models/payment';

export default class PaymentService{
  async createPayment(request: PaymentRequest): Promise<Payment> {
    let payment = new Payment();
    payment.amount = request.order.amount;
    payment.order_id = request.order.id;
    payment.number = new Date().getTime().toString();
    payment.status = await this.enoughBalance(request.token) ? Payment.STATUS_PAID : Payment.STATUS_REJECTED;
    payment = await payment.save();

    return payment
  }

  async enoughBalance(token: string) {
    // SIMULATION!!!
    // get user detail from auth service through the token. 
    // check the balance.

    const rand = Math.floor(Math.random() * 10);
    console.log(rand % 2);
    return rand % 2 === 1;
  }
}