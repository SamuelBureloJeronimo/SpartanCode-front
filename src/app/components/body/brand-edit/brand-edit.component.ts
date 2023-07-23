import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from 'src/app/models/brand';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {

  public url:string;
  public brand:any;
  private title:string;
  private nombre:string;
  public imagen:string;
  public file:any;
  public isExist:boolean;

  constructor(
    private _brandService:BrandService,
    private _router:Router,
    private _route:ActivatedRoute
     ){
      this.url = global.url;
      this.title = 'Editar Marca';
      this.nombre = 'Nombre de la marca';
      this.imagen = 'Imagen de la marca';
      this.isExist = true;
  }
  ngOnInit(): void {
    this.getBrand()
  }

  public getFile(event:any){
    this.file = event.target.files[0];
    const file = event.target.files[0];
    this.imagen = file;
    const lector = new FileReader();
    lector.onload = () => {
      this.brand.logo = lector.result;
    };
    lector.readAsDataURL(file);
  }

   public onSubmit(form:NgForm):void{
    let formData:FormData = new FormData();

    formData.set("nombre",this.brand.nombre);
    formData.set("imagen",this.file);

    this._brandService.updateBrand(formData, this.brand._id).subscribe(
      (response) => {
        if(response){
          Swal.fire({
            icon: 'success',
            title: '¡Enhorabuena!',
            text: response.msg
          })

          this._router.navigate(['/register-brand']);

        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo salió mal!'
          })
        }
      },
      (err) => {
        console.error(<any>err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal!'
        })
      }
    );
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

  public getBrand():void{
    this._route.params.subscribe((params) => {
      let _id = params['id'];
      this._brandService.getBrand(_id).subscribe(
        (response) => {
          this.brand = response;
          this.brand.logo = this.url+'api/'+ this.brand.logo;
          console.log(this.brand)
        },
        (error) => {
          console.error(<any>error)
        }
      );
    })
  }

}
