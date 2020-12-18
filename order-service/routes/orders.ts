import { Router } from 'express';
import Order from '../models/order';
import { OrderRequest } from '../interface/orderRequest';
import OrderService from '../services/orderService';

const orders = Router();
const orderService = new OrderService();
const wait = (timeToDelay: number) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

orders.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    return res.json(orders); 
  } catch (error) {
    next(error);
  }
})

orders.post('/', async (req, res, next) => {
  try {
    const request: OrderRequest = req.body;
    const order = await orderService.createOrder(request)
    
    return res.json(order);
  } catch (error) {
    next(error)
  }
})

orders.get('/:id/check_status', async (req, res, next) => {
  try {
    let order: Order | null = null;

    for (let i = 0; i < 30; i++){
      // sleep for 1s
      await wait(1000);

      // check if order is completed
      order = await Order.findOne({where: { id: req.params.id }});
      if (order && order.completed)
        break;
    }

    return res.json(order); 
  } catch (error) {
    next(error);
  }
})

orders.put('/:id/cancel', async (req, res, next) => { 
  try {
    const order = await orderService.cancelOrder(parseInt(req.params.id));
    return res.json(order);
  } catch (error) {
    next(error);
  }
})

export default orders;