import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit{

  
  public category:Category;
  private title:string;
  private nombre:string;
  private descripcion:string;

  constructor(
    private _categoryService:CategoryService,
    private _router:Router,
    private _route:ActivatedRoute
    ){
    this.category = new Category();
    this.title = 'Modifica la categoria';
    this.nombre = 'Nombre';
    this.descripcion = 'Descripcion';
  }

  ngOnInit(): void {
    this.getCategorie();
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

     this._categoryService.updateCategory(formData,this.category._id).subscribe(
        (response) => {
          if(response){
            Swal.fire({
              icon: 'success',
              title: '¡Enhorabuena!',
              text: response.mensaje
            })

            this._router.navigate(['/category']);

          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡Algo salió mal!'
            })
          }
        },
        (error) => {
          console.error(<any>error);
        }
     );
  }

  public getCategorie():void{
    this._route.params.subscribe((params) => {
      const _id = params['id'];
      this._categoryService.getCategorie(_id).subscribe(
        (response) => {
          if(response){
            this.category = response;
          }else{
            this._router.navigate(['/category']);
          }
        },
        (error) => {
          console.error(<any>error);
        }
      );
    });
  }

}
