import { global } from 'src/app/services/global';
import { SalesService } from 'src/app/services/sales.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  private isViewChecked: boolean = false;

  constructor(private salesService: SalesService, private pdfService: PdfService,
    private cdr: ChangeDetectorRef){

    this.url = global.url+"api/";

  }
  async ngOnInit() {
    let res = await this.salesService.getSales().toPromise();
    this.sales = res;
  }
  generatePDF(sale: saleModel){
    this.sale = sale;
    // Marcar la vista como no comprobada
    this.isViewChecked = false;
    // Forzar la detección de cambios
    this.cdr.detectChanges();
    if (!this.isViewChecked && this.sale) {
      this.isViewChecked = true;
      this.pdfService.generatePdf('contentToConvert', 'ejemplo.pdf');
    }
  }

  async changeStatus(idSale:any ,estado: string){
    let res = await this.salesService.changeStatus(idSale._id, {status: estado}).toPromise();
    console.log(res);
    idSale.status = estado;

  }

}
