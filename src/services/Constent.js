/* THIS IS APP CONSTENT */
import axios from "axios"
import { getToken } from "../auth/auth";

export const SERVER = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER_URL,
});

/* For All Secure Request */
export const SECURE_SERVER = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER_URL,
});

/* INTERCEPT USER REQUEST SEND WITH TOKEN */
SECURE_SERVER.interceptors.request.use(config => {
        const token = getToken();
        /* check token is there */
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log(config)
            return config;
        }
    }, error => Promise.reject(error));