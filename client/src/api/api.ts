import axios from "axios";
import { store } from "../store/store";
import {API_URL} from '@env';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  const token = store.getState().user.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const publicApi = axios.create({
  baseURL: API_URL,
});

export { api, publicApi };