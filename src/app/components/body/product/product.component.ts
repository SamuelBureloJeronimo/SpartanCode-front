import { Component } from '@angular/core';
import { productService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { global } from 'src/app/services/global';

@Component({
    selector: 'product-component',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent {

    public data: any;
    public url: string;
    public pVuelta: number;
    public maxElemByRow: number;


    constructor(private _productService: productService, private _router: Router) {
        this.url = global.url;
        this.pVuelta = 0;
        this.maxElemByRow = 4;
    }
    ngOnInit(): void {
        this.fillData(this.pVuelta * this.maxElemByRow, (this.pVuelta + 1) * this.maxElemByRow, 1);
    }

    public fillData(from: number, to: number, sentido: number) {
        this._productService.getData().subscribe(
            (data) => {
                //Si ya no hay mas productos que cargar hacias atras retorna
                if (from < 0)
                    return console.log("No puedes ir mas para atras");

                //Si ya no hay mas productos que cargar hacias adelante retorna
                if ((this.pVuelta * this.maxElemByRow) >= data.length && sentido == 1)
                    return console.log("No puedes ir mas para adelante");

                this.data = this.loadDataTo(from, to, data);
                

                if (sentido == 1)
                    this.pVuelta++;
                else if (sentido == -1)
                    this.pVuelta--;
            }
        );
    }

    clickProduct(product: any) {
        this._router.navigate(['/product-detail/'+product._id]);
    }

    private loadDataTo(min: number, max: number, data: any): any {
        let res = [];
        for (let i = min; i < max; i++) {
            if (data[i] == undefined)
                return res;
            res.push(data[i]);
        }
        return res;

    }


}