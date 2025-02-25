//  type:module, indica que se utilizara modulos de ecma6

import express from 'express';
import{engine} from 'express-handlebars';
import { Server } from 'socket.io';
const app = express();
const PORT = 8080;

// middleware, funciones que se ejecutan entre las solicitudes(req) del cliente y la respuesta(res) del servidor de la app

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // esto va a avisar que vamos a estar recibiendo varios datos complejos desde el cliente
app.use(express.static('./src/public'));

// Configuramos handlebars
app.engine('handlebars', engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Vamos a abrir un canal de comuinicacion con websocket, para simular chat online

// instanciass sopcket io


// crear rutas
app.get('/', (req, res) => {
    res.render('index');
});

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const io = new Server(httpServer);

let messages = [];

io.on('connection', (socket) => {
    console.log('Usuario conectado');    
    
    socket.on('message', data => {  //recibir el mensaje que se de por el front
        messages.push(data);
        // emitir mensaje para el cliente con todo el array de datos
        socket.emit('message-logs', messages);
    });

})