import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Brand } from '../../../models/brand';
import Swal from 'sweetalert2';
import { global } from 'src/app/services/global';


import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  public url:string;
  public brand: Brand
  private title: string;
  private page:string;
  private nombre: string;
  private imagen: string;
  public file: any;
  public logo:any;
  public brandArray:Brand[];

  constructor(private brandService: BrandService){
    this.brand = new Brand();
    this.title = 'Registra una nueva marca';
    this.nombre = 'Nombre de la marca';
    this.imagen = "Imagen de la marca";
    this.page = 'Informacion de las marcas';
    this.brandArray = []
    this.url = global.url;
}

ngOnInit(): void {
  this.getBrands()
}

public getTitle():string{
  return this.title;
}

public getNombre():string{
  return this.nombre;
}

public getImagen():string{
  return this.imagen;
}

public getPage():string{
  return this.page;
}


public getFile(event: any): void{
  this.file = event.target.files[0];
  console.log(this.file);
  
}

  public onSubmit(form:NgForm){
    const formData:FormData = new FormData();
    this.logo = this.file;
    this.brand.logo = this.logo;
    formData.set("nombre",this.brand.nombre);
    formData.set("imagen",this.brand.logo)

    this.brandService.createBrand(formData).subscribe(
      (response) => {
        if(response){
          Swal.fire({
            icon: 'success',
            title: '¡Enhorabuena!',
            text: response.message
          })
        }
        this.getBrands();
        form.reset();
      },
      (error) => {
        console.log(error)
      }
    )

  }

  public getBrands():void{
    this.brandService.getBrands().subscribe(
      (response) => {
        this.brandArray = response;
        console.log(this.brandArray)
      },
      (error) => {
        console.error(<any>error)
      }
    );
  }

  public deleteBrand(_id:string):void{
    Swal.fire({
      title: 'Estas seguro??',
      text: "No podrás revertir esto!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.brandService.deteteBrand(_id).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: '¡Enhorabuena!',
              text: response.msg
            })
            this.getBrands();
          },
          (error) => {
            console.error(<any>error)
          }
        );
      }
    })
  }
 
}

