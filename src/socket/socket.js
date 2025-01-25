import { io } from 'socket.io-client'

const urll = "http://192.168.29.83:8080"
const url = import.meta.env.VITE_VERCEL_ENV_SOCKET_URL

const socket = io(url);

socket.on("connect", () => {
    console.log("✅ Connected to server:", socket.id);
});

export default socket