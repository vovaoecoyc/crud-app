import axios from 'axios';

export const requestInstance = axios.create({
  baseURL: 'http://conquest.weekendads.ru',
  // responseType: 'json',
});
