import { Component,OnInit } from '@angular/core';
import { userService } from 'src/app/services/user.service';
import { tokenService } from 'src/app/services/token.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { global } from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public carrito:any[];
  public url: string; 
  public idUser: string;
  public precioTotal: number;
  public processPromise:boolean;

  constructor(private userService: userService, private tokenService: tokenService,
              private router: Router, private cartService: CartService){
    this.url = global.url;
    this.carrito = [];
    this.idUser = "";
    this.precioTotal = 0;
    this.processPromise = false;
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
    this.carrito = user.carrito;

    for (let index = 0; index < this.carrito.length; index++)
    {
      let name = this.carrito[index].product.nombre;
      if(name.length > 60)
        this.carrito[index].product.nombre = name.substring(0,60)+"...";
      this.precioTotal += this.carrito[index].product.precio*this.carrito[index].cantidad;
    }
  }
  async deleteOfCar(id: string) {
    let res = await this.cartService.deleteItemOfCart(this.idUser, { "productId": id }).toPromise();
    if(res.error) {
      Swal.fire({
        icon: 'error',
        title: '¡Algo salio mal!',
        text: res.error
      })
      return;
    }
    for(let i = 0; i<this.carrito.length; i++){
      if(this.carrito[i].product._id == id){
        this.carrito.splice(i, 1);
        break;
      }
    }
    this.updatePrecioTotal();
  }
  public updatePrecioTotal() 
  {
    this.precioTotal = 0;
    for (let index = 0; index < this.carrito.length; index++)
    {
      this.precioTotal += this.carrito[index].product.precio*this.carrito[index].cantidad;
    }
    this.processPromise = false
  }
  public async reduceP(id:string) 
  {
    let formData = {
      product: {
        product: id,
        cantidad: 1
      }
    }
    for(let i = 0; i<this.carrito.length; i++)
    {
      if(this.carrito[i].product._id == id)
      {
        if(this.carrito[i].cantidad <= 1)
          return;        
        this.carrito[i].cantidad--;
        formData.product.cantidad = this.carrito[i].cantidad;
        break;
      }
    }
    this.processPromise = true;
    let res = await this.cartService.updateItemOfCart(this.idUser, formData).toPromise();
    if(res.error){
      Swal.fire({
        icon: 'error',
        title: '¡Algo salio mal!',
        text: res.error
      })
      return;
    }
    this.updatePrecioTotal();
  }

  public async increaseP(id:string)
  {
    let formData = {
      product: {
        product: id,
        cantidad: 1
      }
    }
    for(let i = 0; i<this.carrito.length; i++)
    {
      if(this.carrito[i].product._id == id)
      {
        if(this.carrito[i].cantidad >= this.carrito[i].product.cantidad)
          return;
        this.carrito[i].cantidad++;
        formData.product.cantidad = this.carrito[i].cantidad;
        break;
      }
    }
    this.processPromise = true;
    let res = await this.cartService.updateItemOfCart(this.idUser, formData).toPromise();
    if(res.error){
      Swal.fire({
        icon: 'error',
        title: '¡Algo salio mal!',
        text: res.error
      })
      return;
    }
    this.updatePrecioTotal();
  }
}
