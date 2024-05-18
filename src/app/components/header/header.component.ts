import { AfterViewInit, Component, Input, ViewChild } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { postalCodeService } from "src/app/services/postalCode.service";
import { userService } from "src/app/services/user.service";
import { tokenService } from "src/app/services/token.service";
import { productService } from "src/app/services/product.service";
import { productModule } from "src/app/models/product";
import { global } from "src/app/services/global";



@Component
({
    selector: 'header-component',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent
{
    public product: productModule;
    public data:any;
    public isLoading:boolean;
    public dataToken: any;
    public userAddresses: Array<any>;
    public isHiddenNickUser: Boolean;
    public isHiddenDefault: Boolean;
    public isHiddenSH: Boolean;
    public isUser: Boolean;
    protected idUser:string = "";
    @ViewChild('myButton') myButton: any;
    public hiddenCPalert: Boolean;
    public cp: number;
    public url:string;
    public carr: Array<any>;

    constructor(private _pc:postalCodeService, private tokenService: tokenService, private _login:userService, private router: Router,private _productService:productService){
        this.isHiddenNickUser = true;
        this.isHiddenDefault = false;
        this.isUser = true;
        this.hiddenCPalert = true;
        this.isHiddenSH = true;
        this.cp = 0;
        this.userAddresses = [];
        this.carr = [];
        this.product = new productModule();
        this.isLoading = false;
        this.url = global.url;
        this.dataToken = {
            nick: ""
        }
    }

    async ngOnInit()
    {
        if(this.tokenService.token == null){
            this.isHiddenNickUser = true;
            this.isHiddenDefault = false;
            return;
        }
        // --- ---
        let tokenDecoded = await this.tokenService.decodedToken(this.tokenService.token).toPromise();
        if(tokenDecoded.error){
            this.isHiddenNickUser = true;
            this.isHiddenDefault = false;
            console.log(tokenDecoded.error);
            return;
        }
        console.log(tokenDecoded);
        this.idUser = tokenDecoded.datosToken.id;


        // --- ---
        this.dataToken = tokenDecoded.datosToken;
        this.isHiddenNickUser = false;
        this.isHiddenDefault = true;

        // --- ---
        if(this.dataToken.rol == "ADMIN")
            this.isUser = false;
        // --- ---
        let user = await this._login.getUser(this.dataToken.id).toPromise();
        if(user.error)
            return;

        this.userAddresses = user.addresses;
        this.carr = user.carrito;

    }
    addNewAddress(){
        this.hiddenCPalert = false;
        this.myButton.nativeElement.click();
    }
    validateCP(){
        let State = "";
        let colonias = [{ value: '', label: ''}];
        let municipios = [{ value: '', label: ''}];

        this._pc.getColonias(this.cp.toString()).subscribe(
            (res) => {
                const places = res.data.places;
                for(let i=0; i<places.length;i++){
                    let place = places[i];
                    colonias.push({
                        value: place['place name'],
                        label: place['place name']
                    });
                    State = place.state;
                }
                this._pc.getMunicipios(State).subscribe(
                    (res) => {
                        const mun = res.data;
                        for(let i=0; i<mun.length;i++){
                            municipios.push({
                                value: mun[i].Municipio,
                                label: mun[i].Municipio
                            });
                        }
                        const pack = [State, municipios, colonias, this.cp];

                        const objetoJson = JSON.stringify(pack);
                        const objetoParametro = encodeURIComponent(objetoJson);
                        this.router.navigate(['/register-address', objetoParametro]);
                    },
                    (error) => {
                        console.log("Hubo un error: ", error);
                    }
                );
            },
            (error) => {
                console.log("Hubo un error: ", error);
            }
        );
    }

    logOut():void {
        localStorage.removeItem('token');
        window.location.href = window.location.origin;
    }

    public async SearchName(name:any){
        // --- ---
        if(name == ""){
            this.isHiddenSH = true;
            return;
        }
        // --- ---
        this.isHiddenSH = false;
        this.isLoading = true;

        // --- ---
        let products = await this._productService.searchProduct(name).toPromise();
        if(products.error)
            return console.log("ERROR!!", products.error);
        // --- ---
        this.data = products.searchFinal;

    }

    public noneDisplay(product: any):void{
        this.isHiddenSH = true;
        this.router.navigate(['/product-detail/'+product._id]);
    }
}
