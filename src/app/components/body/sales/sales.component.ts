import { Component, OnInit } from '@angular/core';
import { userService } from 'src/app/services/user.service';
import { tokenService } from 'src/app/services/token.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { global } from 'src/app/services/global';
import { SalesService } from 'src/app/services/sales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit{

  public url: string;
  public idUser: string;
  public compras: any;

  constructor(private userService: userService, private tokenService: tokenService,
              private router: Router, private salesService: SalesService){
    this.url = global.url+"api/";
    this.idUser = "";
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

    let comp = await this.salesService.getSalesById(res.datosToken.id).toPromise();
    if(comp.error){
      this.router.navigate(["/"]);
      return;
    }
    this.compras = comp;
  }
  async confirmarEntrega(idSale: string){
    Swal.fire({
        title: "Confirmar entrega de la compra.",
        text: "¿Quieres confirmar la entrega del producto?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, confirmar",
        cancelButtonText: "Cancelar",
    })
    .then(async resultado => {
      if (!resultado.value) {
        console.log("*Se cancelo la acción*");
        return;
      }
      let res = await this.salesService.changeStatus(idSale, {status: "Entregado y Confirmado"}).toPromise();
      console.log(res);

      Swal.fire({
        icon: 'success',
        title: '¡Producto entregado!',
        text: 'Felicidades por recibir tu compra'
      }).then(() => {
        this.router.navigate(["/"]);
      });
    });
  }
}
