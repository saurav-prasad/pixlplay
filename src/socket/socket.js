import { io } from 'socket.io-client'

const ur = "http://192.168.29.83:8080"
const url = "pixlplay-socket_server.railway.internal"
const socket = io(url)

export default socket