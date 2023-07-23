import { Component,OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { Category } from 'src/app/models/category';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent  implements OnInit{

  private title:string;
  public category:Category;
  private nombre:string;
  private descripcion:string;

  constructor(private _categoryService:CategoryService){
    this.title = 'Registro de categorias';
    this.category = new Category();
    this.nombre = 'Nombre';
    this.descripcion = 'Descripcion';
  }

  ngOnInit(): void {
    
  }

  public setTitle(title:string):void{
    this.title = title;
  }

  public getTitle():string{
    return this.title;
  }

  public setNombre(nombre:string):void{
    this.nombre = nombre;
  }

  public getNombre():string{
    return this.nombre;
  }

  public setDescripcion(descripcion:string):void{
    this.descripcion = descripcion;
  }

  public getDescripcion():string{
    return this.descripcion;
  }

  

  public onSubmit(form:NgForm):void{
    let formData = new FormData();
    formData.set("nombre",this.category.nombre);
    formData.set("descripcion",this.category.descripcion);

    this._categoryService.createCategory(formData).subscribe(
      (response) => {
        if(response){
          Swal.fire({
            icon: 'success',
            title: '¡Enhorabuena!',
            text: response.mensaje
          })
        }

        form.reset();
      },
      (error) => {
        console.error(<any>error);
      }
    );

  }

}
