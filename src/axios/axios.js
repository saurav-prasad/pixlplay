import axios from "axios";

// url
const url = "http://192.168.29.83:5000";

// axios instances

// auth route
export const auth = axios.create({
    baseURL: `${url}/auth`,
})

// canvas route
export const canvas = axios.create({
    baseURL: `${url}/canvas`,
})