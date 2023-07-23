import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { global } from 'src/app/services/global';

// imports Services
import { tokenService } from 'src/app/services/token.service';
import { BrandService } from '../../../services/brand.service';
import { CategoryService } from '../../../services/category.service';
import { productService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

// imports Modules
import { Category } from "src/app/models/category";
import { productModule } from 'src/app/models/product';
import { Brand } from 'src/app/models/brand';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  // ---- ----
  public urlAPI: string;
  public srcIMG: string;

  public isHiddenAdminMode: Boolean;
  public dataToken: any;

  public product: productModule;
  public imagen: any;

  public brands:any[];
  public categories:Category[];

  // ---- ----
  constructor(private _route: ActivatedRoute, private router: Router, private tokenService: tokenService,
              private categoryService: CategoryService, private brandService: BrandService,
              private productService:productService, private cartService:CartService) {
    // --- ---
    this.urlAPI = global.url;
    this.srcIMG = '../../../assets/beating-heart_1f493.gif';
    this.isHiddenAdminMode = true;
    this.categories = [];
    this.brands = [];
    this.product = new productModule();
  }
  /**
   * The initial tasks are executed here.
   */
  ngOnInit(): void {
    // --- ---
    if (this.tokenService.token == null){
      this.isHiddenAdminMode = true;
    } else {
      // --- ---
      this.tokenService.decodedToken(this.tokenService.token).subscribe(
        (res) => {
          this.dataToken = res.datosToken;
          // --- ---
          if(res.datosToken.rol != "ADMIN")
            this.isHiddenAdminMode = true;
          else this.isHiddenAdminMode = false;
        }, (error) => {
          console.log(error);
        }
      );
    }

    // --- ---
    this._route.paramMap.subscribe(
      (params) => {
        // --- ---
        const idProduct = params.get('id');
        if (idProduct == null) {
          this.router.navigate(['/']);
          return;
        }
        // --- ---
        this.productService.getProduct(idProduct).subscribe(
          (res) => {
            // --- ---
            this.product = res;
            this.product.imagen = this.urlAPI + "api/" + this.product.imagen;
            // --- ---
            if(this.product.marca == null){
              this.product.marca = new Brand();
            }
            if(this.product.categoria == null){
              this.product.categoria = new Category();
            }
            // --- ---
            this.getCategory();
            this.getBrands();
          }, (error) => {
            if (error) {
              console.log(error);
              this.router.navigate(['/']);
              return;
            }
          }
        );
      }
    );
  }
  /**
   * This method is activated when an autorized user
   * wants to edit the image of product
   * 
   * @return void
   */
  public updateIMG(): void{
    let imagen = document.getElementById("nameProduct");
    if(imagen == null)
      return;
    imagen.click();
  }
  public async addCarr() {
    let formData = {
      productId: this.product._id
    }
    let res = await this.cartService.addCart(this.dataToken.id, formData).toPromise();
    if(res.error) {
      Swal.fire({
        icon: 'error',
        title: '¡Algo salio mal!',
        text: res.error
      })
      return;
    }
    this.router.navigate(["/carrito"]);
  }
  public changeImage(event: any): void {
    const file = event.target.files[0];
    this.imagen = file;
    const lector = new FileReader();
    lector.onload = () => {
      this.product.imagen = lector.result;
    };
    lector.readAsDataURL(file);
  }
  public edithDescrip(): void {
    let edithDescrip = document.getElementById("edithDescrip");
    let pDescrip = document.getElementById("pDescrip");
    if(edithDescrip == null || pDescrip == null)
      return;
    //--- ---
    if(edithDescrip.hidden == true){
      edithDescrip.hidden = false;
      pDescrip.hidden = true;
      return;
    }
    // --- ---
    edithDescrip.hidden = true;
    pDescrip.hidden = false;
  }
  /**
   * This method is activated when an autorized user
   * wants to save the changes of product: name, price,
   * quantity, category, brand and model.
   * 
   */
  public async saveChanges() {
    let formData = new FormData();
    
    formData.set("nombre", this.product.nombre);
    formData.set("precio", this.product.precio.toString());
    formData.set("descripcion", this.product.descripcion);
    formData.set("categoria", this.product.categoria._id);
    formData.set("marca", this.product.marca._id);
    formData.set("cantidad", this.product.cantidad.toString());
    formData.set("imagen", this.imagen);
    formData.set("modelo", this.product.modelo);
    
    let res = await this.productService.updateProduct(this.product._id, formData).toPromise();
    await Swal.fire({
      icon: 'success',
      title: '¡Enhorabuena!',
      text: res.msg
    })
    this.edithProduct();
    this.router.navigate(['/product-detail/'+this.product._id]);
  }
  public deleteProduct(): void {
    Swal
    .fire({
        title: "Esta acción no se puede deshacer.",
        text: "¿Quieres eliminar este producto?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (!resultado.value) {
          console.log("*Se cancelo la acción*");
          return;
        }
        // --- ---
        if(this.tokenService.token == null){
          this.router.navigate(['/']);
          return;
        }
        // --- ---
        this.tokenService.decodedToken(this.tokenService.token).subscribe(
          (res) => {
            this.productService.deleteProduct(this.product._id).subscribe(
              (res) => {
                Swal.fire({
                  icon: 'success',
                  title: '¡Producto eliminado!',
                  text: 'El producto se elimino correctamente'
                }).then(() => {
                  this.router.navigate(['/']);
                })
                console.log(res);
              }, (error) => {
                Swal.fire({
                  icon: 'error',
                  title: '¡Error al eliminar!',
                  text: 'El producto no se pudo eliminar correctamente'
                })
                console.log(error);  
              }
            );
          }, (error) => {
            Swal.fire({
              icon: 'error',
              title: '¡Token Invalido!',
              text: 'El producto no se pudo eliminar correctamente'
            })
            console.log(error);                      
          }
        );
        // --- ---
    });
  }
  /**
   * This method is activated when an autorized user
   * wants to edit the main characteristics of the
   * product on the screen, such as name, price,
   * quantity, category, brand and model.
   * 
   * @returns void
   */
  public edithProduct(): void{
    // --- ---
    const edithInfoProduct = document.getElementById("edithInfoProduct");
    const divInfoProduct = document.getElementById("divInfoProduct");
    // --- ---
    if(edithInfoProduct == null || divInfoProduct == null)
      return;  
    //--- ---
    if(edithInfoProduct.style.display == 'block'){
      edithInfoProduct.style.display = 'none';
      divInfoProduct.style.width = '320px';
      return;
    }
    // --- ---
    edithInfoProduct.style.display = 'block';
    divInfoProduct.style.width = '640px';
  }
  /**
   * This method is activated to fill
   * in all the categories and display 
   * them in the comboBoxes.
   * 
   * @returns void
   */
  public async getCategory(){
    // --- ---
    let categories = await this.categoryService.getCategories().toPromise();
    if(categories.error){
      console.log(categories.error);      
      return;
    }
    // --- ---
    this.categories = categories;
  }
  /**
   * This method is activated to fill
   * in all the brands and display 
   * them in the comboBoxes.
   * 
   * @returns void
   */
  public getBrands(): void{
    this.brandService.getBrands().subscribe(
        (response) => this.brands = response,
        (err) => console.log(err)
        
    )
  }
}
