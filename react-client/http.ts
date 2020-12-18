import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class Http {
  private instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {'Content-Type': 'application/json'}
  })
  
  async get(url: string, config?: AxiosRequestConfig) {
    return await this.instance.get(url, config);
  }
  
  async put(url: string, data?: any) {
    return await this.instance.put(url, data);
  }
  
  async post(url: string, data?: any) {
    return await this.instance.post(url, data);
  }
  
  async delete(url: string, config?: AxiosRequestConfig) {
    return await this.instance.delete(url, config);
  } 
}

export default new Http();