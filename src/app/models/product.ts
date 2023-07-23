import { Category } from "./category";
import { Brand } from "./brand";

export class productModule {
    public _id: string;
    public nombre: string;
    public precio: number;
    public descripcion: string;
    public categoria: Category;
    public marca: Brand;
    public cantidad: number;
    public imagen: any;
    public modelo: string;

    constructor(){
        this._id = "";
        this.nombre = "";
        this.precio = 0;
        this.descripcion = "";
        this.categoria = new Category();
        this.marca = new Brand();
        this.cantidad = 0;
        this.imagen = "";
        this.modelo = "";
    }
}
