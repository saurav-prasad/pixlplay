import axios from "axios";

// url
const url = "http://192.168.29.83:5000";
const ur = "https://pixlplay-backend.vercel.app"

// axios instances

// auth route
export const authRoute = axios.create({
    baseURL: `${url}/auth`,
})

// canvas route
export const canvasRoute = axios.create({
    baseURL: `${url}/canvas`,
})