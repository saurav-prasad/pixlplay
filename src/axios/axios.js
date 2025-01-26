import axios from "axios";

// url
const ur = "http://192.168.29.83:5000";
const url = import.meta.env.VITE_VERCEL_ENV_SERVER_URL

// axios instances

// auth route
export const authRoute = axios.create({
    baseURL: `${url}/auth`,
})

// canvas route
export const canvasRoute = axios.create({
    baseURL: `${url}/canvas`,
})