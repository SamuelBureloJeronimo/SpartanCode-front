import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { global } from 'src/app/services/global';
import { tokenService } from 'src/app/services/token.service';
import { userService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';

@Component({
    selector: 'my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.css']
})

export class myProfileComponent implements OnInit {
    public user: User;
    public url: string;
    public file: any;

    constructor(private tokenService: tokenService, private router: Router,
                private userService: userService){
        this.user = new User();
        this.url = global.url;
    }
    async ngOnInit() {
        let token = this.tokenService.token;
        if(token == null){
            this.router.navigate(["/"])
            return;
        }
        let res = await this.tokenService.decodedToken(token).toPromise();
        if(res.error){
            this.router.navigate(["/"])
            return;
        }
        res = await this.userService.getUser(res.datosToken.id).toPromise();
        if(res.error){
            this.router.navigate(["/"])
            return;
        }
        this.user = res;
        this.user.imagen = this.url+"api/"+this.user.imagen;
    }
    public updateIMG(): void{
        let imagen = document.getElementById("imgUser");
        if(imagen == null)
          return;
        imagen.click();
    }
    public changeIMG(event: any) {
        const file = event.target.files[0];
        this.file = file;
        const lector = new FileReader();
        lector.onload = () => {
          this.user.imagen = lector.result;
        };
        lector.readAsDataURL(file);
    }
    public hideChangeUser(){
        let dataUpdate = document.getElementById("dataUpdate");
        if(dataUpdate == null)
            return;
        if(dataUpdate.hidden == true){
            dataUpdate.hidden = false;
            return;
        }
        dataUpdate.hidden = true;
    }
    public async updateUser(){
        let formData = new FormData();
    
        formData.set("nick",this.user.nick);
        formData.set("correo_electronico",this.user.correo_electronico);
        formData.set("nombre",this.user.nombre);
        formData.set("imagen",this.file);
        formData.set("fecha_nacimiento",this.user.fecha_nacimiento);
        formData.set("sexo",this.user.sexo);
        console.log(this.user.sexo);
        
        
        let res = await this.userService.updateUser(this.user._id, formData).toPromise();
        if(res.error){
            console.error(res.error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se logro hacer el registro'
            })
            let dataUpdate = document.getElementById("dataUpdate");
            if(dataUpdate != null)
                dataUpdate.hidden = true;
            return;
        }
        Swal.fire({
            icon: 'success',
            title: '¡Actualizado!',
            text: res.msg
        }).then(() => {
            let dataUpdate = document.getElementById("dataUpdate");
            if(dataUpdate != null)
                dataUpdate.hidden = true;
            this.router.navigate(["/my-profile"])
        });
    }
}