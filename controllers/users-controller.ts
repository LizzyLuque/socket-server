import { User } from "../models/user";

export default class UsersController{  // Gestión de los usuarios
    private static _instance: UsersController;  
    private lista: User[];

    private constructor(){
        this.lista=[];
    }

    public static get instance(){
        return this._instance || (this._instance=new this());
    }    

     ///agregar usuario
    public agregar (usuario:User){
        this.lista.push(usuario);
        return usuario;
    }

     ///actualizar nombre de un usuario
    public actualizarNombre(_id:string, nombre:string){
        for(let usr of this.lista){
            if(usr._id==_id){
                usr.nombre=nombre;
                break;
            }
        }
        console.log(this.lista);
        console.log("______ Actualizando Usuario ______");
    }


    ///obtener lista de usuarios
    public getLista(){
        return this.lista;
    }

     ///obtener un usuario
    public getUsuario(id:string){
        return this.lista.find(usuario=>usuario._id===id);
    }

     ///obtener lista de usuarios en sala
    public getUsuariosEnSala(sala:string){
        return this.lista.filter(usuario=>usuario.sala===sala);
    }

    /// borra un usuario
    public borrarUsuario(id:string){
        const tempUsr = this.getUsuario(id);
        this.lista= this.lista.filter(usr=>usr._id!==id);
        return tempUsr;
    }
}