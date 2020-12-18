interface OrderRequest {
    id: number,
    amount: number
}

export interface PaymentRequest {
  order: OrderRequest,
  token: string
}