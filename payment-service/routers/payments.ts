import { Router } from 'express';
import Payment from '../models/payment';
import PaymentService from '../services/paymentService';
import {PaymentRequest} from '../interface/paymentRequest';

const payments = Router();
const paymentService = new PaymentService();

payments.get('/order/:id', (req, res, next) => {
  try {
    res.json(req.params.id)
  } catch (error) {
    next(error)
  }
})

payments.post('/', async(req, res, next) => {
  try {
    const request = <PaymentRequest>req.body;
    const payment = await paymentService.createPayment(request);

    return res.json(payment);
  } catch (error) {
    next(error)
  }
})

export default payments;