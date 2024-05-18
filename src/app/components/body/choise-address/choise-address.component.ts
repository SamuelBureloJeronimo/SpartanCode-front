import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressModel } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-choise-address',
  templateUrl: './choise-address.component.html',
  styleUrls: ['./choise-address.component.css']
})
export class ChoiseAddressComponent implements OnInit {
  [x: string]: any;
  public address: AddressModel[];
  selectedAdd:string = "";
  defaultAdd: string = "";
  isHidden:boolean = true;
  idUser: string = "";

  constructor(private addressService: AddressService, private route: ActivatedRoute,
              private router: Router
  ){
    this.address = [];
  }
  async ngOnInit(){
    const idUser = this.route.snapshot.paramMap.get('change');

    if(idUser !== null){
      this.idUser = idUser;
      let res = await this.addressService.getAddressByUser(idUser).toPromise();
      console.log(res);

      this.address = res;
      this.defaultAdd = this.address[0]._id;
      this.selectedAdd = this.defaultAdd;
      return;
    }

  }

  // Método que se ejecuta cada vez que se cambia la opción seleccionada
  onRadioChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    console.log('Opción seleccionada:', this.selectedAdd);
    console.log("Seleccionado: " + this.defaultAdd);
    if(this.selectedAdd !== this.defaultAdd)
      this.isHidden = false;
    else
      this.isHidden = true;
  }

  async changeAddress(){
    let addressExt = {
      "address": [this.selectedAdd]
    };
    for (let i = 0; i < this.address.length; i++) {
      const element = this.address[i];
      if(element._id !== this.selectedAdd){
        addressExt.address.push(element._id);
      }
    }
    console.log(addressExt);
    let res = await this.addressService.changeAddressDefault(this.idUser, addressExt).toPromise();
    console.log(res);
    await Swal.fire({
      icon: 'success',
      title: '!Direccion cambiada!',
      text: 'Aqui siempre puede cambiar su direccion por defecto'
    }).then(()=>{this.router.navigate(["/"]);});

  }
}
