import { io } from 'socket.io-client'

import { SERVER_URL } from '../config'

const socket = io(SERVER_URL)

const rootSocket = {
  connect: () => socket.emit('conectado'),
  disconnect: () => {
    socket.removeAllListeners('conectado')
    socket.close()
  },
  register: (payload) => socket.emit('registrar', payload),
  isConnected: () => {
    console.log(socket.connected)
    return socket.connected
  },
}

export default rootSocket
