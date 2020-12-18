import Order from "../models/order";

export interface PaymentRequest {
  order: Order,
  token: string
}