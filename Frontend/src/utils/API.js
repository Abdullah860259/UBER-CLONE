import axios from "axios";
import {store} from "../app/store"

const API = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

API.interceptors.request.use((config) => {
    const token = store.getState().user.token
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default API