import { Socket } from "socket.io";

export const desconectar = (cliente:Socket) =>{
    cliente.on('disconnect',()=>{
        console.log('Cliente deconectado');
    });
}


//escuchar mensajes
export const mensaje=(cliente:Socket, io: SocketIO.Server)=>{
    cliente.on('mensaje',(payload:{de:string, cuerpo:string})=>{
        console.log('\nMensaje recibido: ' + payload.cuerpo +"\nEnviado por: "+ payload.de);

        io.emit('mensaje-nuevo',payload);
    });    
};