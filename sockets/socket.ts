import { Socket } from "socket.io";
import UsersController from "../controllers/users-controller";
import { User } from "../models/user";

const usuariosConectados=UsersController.instance;

// crear usuario nuevo
export const conectarCliente =(cliente:Socket, io: SocketIO.Server)=>{
    const usuario = new User(cliente.id);
    usuariosConectados.agregar(usuario);   
}

//borrar usuario desconectado
export const desconectar = (cliente:Socket, io: SocketIO.Server) =>{
    cliente.on('disconnect',()=>{
        let usr=usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos',usuariosConectados.getLista());
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
        io.emit('usuarios-activos',usuariosConectados.getLista());         
        callback({
            ok: true,
            mensaje :'Usuario ' +payload.nombre+' configurado'
        });
    });    
};

//escuchar solicitud de un cliente para saber que usuarios están conectados
export const dameListaUsuarios=(cliente:Socket, io: SocketIO.Server)=>{
    cliente.on('lista-usuarios',()=>{
        io.in(cliente.id).emit('usuarios-activos',usuariosConectados.getLista()); 
    });    
};