import { Component } from '@angular/core';
import { AddressModel } from 'src/app/models/address';
import { ActivatedRoute, Router } from '@angular/router';
import { addressService } from 'src/app/services/address.service';
import { tokenService } from 'src/app/services/token.service';
import { userService } from 'src/app/services/user.service';

@Component({
    selector: 'registerAddress-component',
    templateUrl: './registerAddress.component.html',
    styleUrls: ['./registerAddress.component.css']
})

export class registerAddressComponent {
    public isHiddenSeeMore: Boolean;
    
    public municipiosArray: any;
    public ColoniasArray: any;
    public idUser:string;

    public token: any;

    public addressData: AddressModel;
    
    
    constructor(private tokenService: tokenService,private _route: ActivatedRoute,
                private router: Router, private _addressService: addressService,
                private userService:userService){
        this.idUser = ""
        this.isHiddenSeeMore = true;
        this.addressData = new AddressModel();
    }
    async ngOnInit() {
        let token = this.tokenService.token;
        if(token == null){
        this.router.navigate(["/"]);
        return;
        }
        let res = await this.tokenService.decodedToken(token).toPromise();
        if(res.error){
        this.router.navigate(["/"]);
        return;
        }

        let user = await this.userService.getUser(res.datosToken.id).toPromise();
        if(user.error){
        this.router.navigate(["/"]);
        return;
        }
        this.idUser = user._id;
    }
    createAddress() {
        let formData = {
            "nombreRef": this.addressData.nombreRef,
            "cp": this.addressData.cp,
            "estado": this.addressData.estado,
            "municipio": this.addressData.municipio,
            "colonia": this.addressData.colonia,
            "calle": this.addressData.calle,
            "nExterior": this.addressData.nExterior,
            "nInterior": this.addressData.nInterior,
            "calleRef1": this.addressData.calleRef1,
            "calleRef2": this.addressData.calleRef2,
            "Tel": this.addressData.Tel,
            "descripcionDomicilio": this.addressData.descripcionDomicilio
        };
        if(this.tokenService.token == null){
            alert("Inicia sesion primero");
            return;
        }
        this._addressService.createAddress(this.idUser, formData).subscribe(
            (res) => {
                alert("La dirreccion se guardo correctamente");
                console.log(res);
                this.router.navigate(['/home']);
            }, (error) => {
                alert("Error al guardar la direccion");
                console.log(error);
                this.router.navigate(['/home']);
            }
        );
    }
}