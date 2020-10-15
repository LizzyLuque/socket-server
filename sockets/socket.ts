import { Socket } from "socket.io";
import UsersController from "../controllers/users-controller";
import { User } from "../models/user";

export const usuariosConectados=UsersController.instance;

// crear usuario nuevo
export const conectarCliente =(cliente:Socket)=>{
    const usuario = new User(cliente.id);
    usuariosConectados.agregar(usuario);
    console.log(usuariosConectados.getLista());
}

//borrar usuario desconectado
export const desconectar = (cliente:Socket) =>{
    cliente.on('disconnect',()=>{
        let usr=usuariosConectados.borrarUsuario(cliente.id);
        console.log(usuariosConectados.getLista());
    });
}


//escuchar mensajes
export const mensaje=(cliente:Socket, io: SocketIO.Server)=>{
    cliente.on('mensaje',(payload:{de:string, cuerpo:string})=>{
        io.emit('mensaje-nuevo',payload);
    });    
};


//Configurar usuarios
export const configurarUsuario=(cliente:Socket, io: SocketIO.Server)=>{
    cliente.on('configurar-usuario',(payload:{nombre:string}, callback:({})=>any)=>{
        usuariosConectados.actualizarNombre(cliente.id,payload.nombre);
        callback({
            ok: true,
            mensaje :'Usuario ' +payload.nombre+' configurado'
        });
    });    
};