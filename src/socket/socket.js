import { io } from 'socket.io-client'

const url = "http://192.168.29.83:8080"

const socket = io(url)

export default socket