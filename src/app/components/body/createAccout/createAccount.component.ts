import { Component,OnInit } from "@angular/core";
import { userService } from "src/app/services/user.service";
import { UserModel } from "src/app/models/user";
import Swal from 'sweetalert2';
import { global } from "src/app/services/global";
import { tokenService } from "src/app/services/token.service";
import { Router } from "@angular/router";

@Component
({
    selector: 'createAccount',
    templateUrl: './createAccount.component.html',
    styleUrls: ['./createAccount.component.css']
})

export class createAccountComponent {

    private title:string;
    private labelnick:string;
    private labelCorreo:string;
    private labelNombre:string;
    private labelRol:string;
    private labelImagen:string;
    private labelFechaN:string;
    private labelPass:string;
    private labelSex:string

    private textMessage:string;

    public url:string;

    public isExist:boolean;

    public user:UserModel;
    private file:any;

    constructor(private _userService:userService, private tokenService: tokenService, private router:Router){
        this.title = 'Registrate'
        this.labelnick = 'Nick';
        this.labelCorreo = 'Correo Electronico';
        this.labelNombre = 'Nombre';
        this.labelRol = 'Rol';
        this.labelImagen = 'Imagen';
        this.labelFechaN = 'Fecha de Nacimiento';
        this.labelPass = 'Contraseña';
        this.labelSex = 'Genero';

        this.textMessage = '¿Ya estas registrado? ve a';

        this.isExist = true;

        this.url = global.url;

        this.user = new UserModel();
    }

    public setTitle(title:string):void{
        this.title = title;
    }

    public getTitle():string{
        return this.title;
    }

    public setNick(nick:string):void{
        this.labelnick = nick;
    }

    public getNick():string{
        return this.labelnick;
    }

    public setCorreo(correo:string):void{
        this.labelCorreo = correo;
    }

    public getCorreo():string{
        return this.labelCorreo;
    }

    public setNombre(nombre:string):void{
        this.labelNombre = nombre;
    }

    public getNombre():string{
        return this.labelNombre;
    }

    public setRol(rol:string):void{
        this.labelRol = rol;
    }

    public getRol():string{
        return this.labelRol;
    }

    public setImagen(imagen:string):void{
        this.labelImagen = imagen;
    }

    public getImagen():string{
        return this.labelImagen;
    }


    public setFechaN(fechaN:string):void{
        this.labelFechaN = fechaN;
    }

    public getFechaN():string{
        return this.labelFechaN;
    }

    public setPassword(password:string):void{
        this.labelPass = password;
    }

    public getPassword():string{
        return this.labelPass;
    }

    public setSex(sex:string):void{
        this.labelSex = sex;
    }

    public getSex():string{
        return this.labelSex;
    }

    public getFile(event:any){
        this.file = event.target.files[0];
        console.log(this.file)
    }

    public setMessageText(messageText:string):void{
        this.textMessage = messageText;
    }

    public getMessageText():string{
        return this.textMessage;
    }

    public onSubmit(form:any){

        let formData = new FormData();
        let getImage = this.file;
        this.user.imagen = getImage;
        formData.set("nick",this.user.nick);
        formData.set("correo_electronico",this.user.correo_electronico);
        formData.set("nombre",this.user.nombre);
        formData.set("imagen",this.user.imagen);
        formData.set("fecha_nacimiento",this.user.fecha_nacimiento);
        formData.set("password",this.user.password);
        formData.set("sexo",this.user.sexo)


        this._userService.createUser(formData).subscribe(
            (response) => {

                console.log(response);
                if(response){
                    Swal.fire({
                        icon: 'success',
                        title: '¡Enhorabuena!',
                        text: response.msg
                      })
                }

                form.reset();
            },
            (error) => {
                console.error(<any>error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No se logro hacer el registro'
                })
            }
        );
    }
}
