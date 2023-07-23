export class User{
    public _id:string;
    public nick:string;
    public correo_electronico:string;
    public nombre:string;
    public imagen: any;
    public fecha_nacimiento:string;
    public password:string;
    public sexo:string;

    constructor(){
        this._id = "";
        this.nick = ""
        this.correo_electronico = "";
        this.nombre = "";
        this.fecha_nacimiento = "";
        this.password = "";
        this.sexo = "";
    }
}