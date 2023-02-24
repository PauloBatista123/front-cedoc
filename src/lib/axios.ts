import axios from "axios";

export const api = axios.create({
  baseURL: 'http://10.54.56.139:8000/api'
});

export const apiUbots = axios.create({
  baseURL: 'http://10.54.56.236:3000/',
})