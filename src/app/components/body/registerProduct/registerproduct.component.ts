import { Component } from "@angular/core";
import { tokenService } from "src/app/services/token.service";

import { productModule } from "src/app/models/product";
import { productService } from '../../../services/product.service';
import { BrandService } from '../../../services/brand.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from "src/app/models/category";
import { Brand } from "src/app/models/brand";
import Swal from 'sweetalert2';


@Component({
    selector: 'register-product',
    templateUrl: './registerproduct.component.html',
    styleUrls: ['./registerproduct.component.css']
})
export class RegisterProductComponent {

    private title: string;
    private subtitle: string;
    public product: productModule;
    public categories:Category[];
    public brands: Brand[];
    public file: any;



    constructor(private tokenService: tokenService, private productService: productService, private categoryService: CategoryService, private brandService: BrandService) {
        this.title = 'REGISTRO DE ARTICULO';
        this.subtitle = 'Ingresa los datos del articulo';
        this.product = new productModule();
        this.categories = [];
        this.brands = [];
        this.file = "";
    }

    ngOnInit(): void {
        this.getCategory();
        this.getBrands();
    }

    public getTitle(): string {
        return this.title;
    }
    public getSubTitle(): string {
        return this.subtitle;
    }


    public async sendData(form: any) {
        let formData = new FormData();
        let image = this.file;
        this.product.imagen = image;
        formData.set("nombre", this.product.nombre);
        formData.set("precio", this.product.precio.toString());
        formData.set("descripcion", this.product.descripcion);
        formData.set("categoria", this.product.categoria._id);
        formData.set("marca", this.product.marca._id);
        formData.set("cantidad", this.product.cantidad.toString());
        formData.set("imagen", this.product.imagen);
        formData.set("modelo", this.product.modelo);
        let res = await this.productService.createProduct(formData).toPromise();
        if(res.error){
            Swal.fire({
                icon: 'error',
                title: '¡Upps ocurrio un error!',
                text: res.error
            })
            return;
        }
        Swal.fire({
            icon: 'success',
            title: '¡Producto Registrado!',
            text: res.msg
        }).then(()=>{
            form.reset();
        });        
    }

    public getCategory(): void{
        this.categoryService.getCategories().subscribe(
            (response) => {
                this.categories = response;
                
            },
            (err) => {
                console.log(err);
                
            }
        )
    }

    public getBrands(): void{
        this.brandService.getBrands().subscribe(
            (response) => this.brands = response,
            (err) => console.log(err)
            
        )
    }

    public uploadImage(event: any): void{
        this.file = event.target.files[0];
        console.log(this.file);
    }


}