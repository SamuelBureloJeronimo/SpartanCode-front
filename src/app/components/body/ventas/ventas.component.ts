import { global } from 'src/app/services/global';
import { SalesService } from 'src/app/services/sales.service';
import { Component, OnInit } from '@angular/core';
import { saleModel } from 'src/app/models/sale';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  sales: any;
  protected sale: saleModel = new saleModel();
  url: string;

  constructor(private salesService: SalesService, private pdfService: PdfService){

    this.url = global.url+"api/";

  }
  async ngOnInit() {
    let res = await this.salesService.getSales().toPromise();
    this.sales = res;
  }
  async generatePDF(sale: saleModel) {
    this.sale = sale;
    console.log(sale);

    this.pdfService.generatePdf("contentToConvert", "ejemplo.pdf");
  }

}
