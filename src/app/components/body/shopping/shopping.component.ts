import { Component, OnInit } from '@angular/core';
import { tokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { userService } from 'src/app/services/user.service';
import { global } from 'src/app/services/global';

import { AddressModel } from 'src/app/models/address';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit{
  public cart: any[];
  public payment: any;
  public addressP: AddressModel;
  public url: string; 
  public idUser: string;
  public precioTotal: number;
  public precioTotalFormated: string;
  public disableContinue: Boolean;

  public tabNumber: number = 0;

  constructor(private tokenService: tokenService, private router: Router, private userService: userService)
  {
    this.disableContinue = true;
    this.payment = {
      card: "",
      owner: "",
      expirationData: "",
      securityCode: ""
    }
    this.addressP = new AddressModel();
    this.cart = []
    this.idUser = "";
    this.url = global.url;
    this.precioTotal = 0;
    this.precioTotalFormated = "";
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

    this.idUser = res.datosToken.id;

    let user = await this.userService.getUser(this.idUser).toPromise();
    if(user.error){
      this.router.navigate(["/"]);
      return;
    }
    this.cart = user.carrito;
    if(user.addresses == 0 || null){
      await Swal.fire({
        icon: 'warning',
        title: '¡No tienes ninguna dirección registrada!',
        text: 'Primero debes registra una dirección'
      }).then(()=>{this.router.navigate(["/register-address"]);});
    }
    this.addressP = user.addresses[0];
    for (let index = 0; index < this.cart.length; index++)
    {
      this.precioTotal += this.cart[index].product.precio*this.cart[index].cantidad;
    }    
  }
  public verificCardNumber() {
    // Eliminamos todos los espacios en blanco del número actual
    let numeroLimpio = this.payment.card.replace(/\s/g, '');

    // Aplicamos el formato: agregamos un espacio cada 4 dígitos
    const formato = /(\d{1,4})/g;
    const grupos = numeroLimpio.match(formato);
    this.payment.card = grupos ? grupos.join(' ') : '';
    this.enableContinue();
  }

  public enableContinue(){
    if(this.payment.card == "" || this.payment.card.length < 19){
      this.disableContinue = true;
      return;
    }
    if(this.payment.owner == "" || this.payment.owner.length < 10){
      this.disableContinue = true;
      return;
    }
    if(this.payment.expirationData == "" || this.payment.expirationData.length < 5){
      this.disableContinue = true;
      return;
    }
    if(this.payment.securityCode == "" || this.payment.securityCode.length < 3){
      this.disableContinue = true;
      return;
    }
    this.disableContinue = false;
  }
  verificCode(){
    this.enableContinue();
  }

  public continue(num: number){
    this.tabNumber = num;
  }
  public verificName(){
    this.payment.owner = this.payment.owner.toUpperCase();
    this.enableContinue();
  }
  onInputChange(event: any) {
    const inputText = event.target.value;
    this.payment.owner = inputText ? inputText.toUpperCase() : null;
  }
  verificData(){
    // Eliminamos todos los espacios en blanco del número actual
    let numeroLimpio = this.payment.expirationData.replace(/\s/g, '');

    // Aplicamos el formato: agregamos un espacio cada 4 dígitos
    const formato = /(\d{1,2})/g;
    const grupos = numeroLimpio.match(formato);
    this.payment.expirationData = grupos ? grupos.join('/') : '';
    this.enableContinue();
  }
  confirmShop(){
    console.log(this.payment);
  }
}
