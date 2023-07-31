import { log } from 'console';
import express from 'express';
//Express: sirve para crear el backend, es un framework
//de servidor que nos va a permitir crear rutas y tambien
//unirlo a socket.io o los websockets para hacer comunicacion en tiempo real
import http from 'http';
import {Server as SocketServer} from 'socket.io';
//socket.io: biblioteca que permite hacer conexion
//en tiempo real tanto frontend como backend y que 
//se una a express para hacer un servidor que soporte
//ambos protocolos

// Initializations
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

io.on('connection', (socket) => {
	console.log(socket.id);

	socket.on('message',(body)=>{
		socket.broadcast.emit('message', {
			body, 
			from: socket.id.slice(7)
		});
		// broadcast emite un mensaje a todos los clientes 
		//conectados menos a el mismo y le emite al resto otro
		//evento que se llama message, este message del socket.on
		//no es el mismo que el socket broadcast.emit
	})
});
 //on: escuchar eventos (cuando pase algo como por ejemplo
 //una nueva aplicacion se conecte tu vas a recibir un socket
 //y la informacion del cliente que se conecto o la aplicacion
 //que se conecto)

server.listen(3000);
console.log('Server on port', 3000);