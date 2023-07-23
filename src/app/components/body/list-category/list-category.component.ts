import { Component,OnInit,Input } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit{
  
  private title:string;
  public Categories:Array<Category>;

  @Input() listen:any; 

  constructor(private _categoryService:CategoryService){
    this.title = 'Lista de Categorias';
    this.Categories = [];
  }

  ngOnInit(): void {
    this.getCategories();  
  }

  public setTitle(title:string):void{
    this.title = title;
  }

  public getTitle():string{
    return this.title;
  }

  public getCategories():void{
    this._categoryService.getCategories().subscribe(
      (response) => {
        this.Categories = response;
        console.log(this.Categories);
      },
      (error) => {
        console.error(<any>error);
      }
    );
  }

  public deleteCategory(_id:string):void{
    
    Swal.fire({
          title: 'Estas seguro?',
          text: "¡No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '¡Sí, bórralo!'
        }).then((result) => {
          if (result.isConfirmed) {
            this._categoryService.deteleCategory(_id).subscribe(
                (response) => {
                    Swal.fire({
                    icon: 'success',
                    title: '¡Enhorabuena!',
                    text: response.mensaje
                  })
                    this.getCategories();
                  },
                  (error) => {
                    console.error(<any>error);
                  }
              ); 
           }
        }); 
  }

}
