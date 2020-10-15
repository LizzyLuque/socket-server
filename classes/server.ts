import express from 'express';
import {SERVER_PORT} from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';

export default class Server{  //Singleton
    private static _instance: Server;  

    public app:express.Application;
    public port:number;
    public io:socketIO.Server;         // servior de sockets
    private httpServer: http.Server;   //intermediario entre extress y socket.io

    private constructor(){
        this.app=express();
        this.port=SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io=socketIO(this.httpServer);
        this.escucharSockets();
    }

    public static get instance(){
        return this._instance || (this._instance=new this());
    }

    private escucharSockets(){
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente=>{

            // Conectar usuario
            socket.conectarCliente(cliente);

            // Configurar usuario
            socket.configurarUsuario(cliente,this.io);            

            //Mensajes
            socket.mensaje(cliente,this.io);

            // Desconectar
            socket.desconectar(cliente);

        });
    }

    start( callback:() =>any ) {

        this.httpServer.listen( this.port, callback );

    }
}