import { io } from 'socket.io-client'

const ur = "http://192.168.29.83:8080"
const url = import.meta.env.VITE_VERCEL_ENV_SERVER_URL
const socket = io(url)

export default socket