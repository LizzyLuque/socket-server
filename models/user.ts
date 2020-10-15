//Modelo para los usuarios
export class User{
   
    public nombre: string;
    public sala:string;

    constructor(
        public _id:string
    ){
            this.nombre='usuario-anónimo';
            this.sala="sin-sala";
    }
}