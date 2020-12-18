import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class PaymentBridge {
  private instance: AxiosInstance = axios.create({
    baseURL: 'http://payment-service:8081/payments',
    headers: {'Content-Type': 'application/json'}
  })
  
  async get(url: string, config?: AxiosRequestConfig) {
    return await this.instance.get(url, config)
  }
  
  async put(url: string, data?: any) {
    return await this.instance.put(url, data)
  }
  
  async post<T>(url: string, data?: any) {
    return await this.instance.post<T>(url, data)
  }
  
  async delete(url: string, config?: AxiosRequestConfig) {
    return await this.instance.delete(url, config)
  }
}

export default new PaymentBridge()