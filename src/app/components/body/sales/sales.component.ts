import { Component, OnInit } from '@angular/core';
import { userService } from 'src/app/services/user.service';
import { tokenService } from 'src/app/services/token.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { global } from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit{
  
  public url: string; 
  public idUser: string;

  constructor(private userService: userService, private tokenService: tokenService,
              private router: Router, private cartService: CartService){
    this.url = global.url;
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
    
  }
}
