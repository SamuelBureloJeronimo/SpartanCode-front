import { global } from 'src/app/services/global';
import { SalesService } from 'src/app/services/sales.service';
import { Component, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  sales: any;
  url: string;

  constructor(private salesService: SalesService){

    this.url = global.url+"api/";

  }
  async ngOnInit() {
    let res = await this.salesService.getSales().toPromise();
    console.log(res);
    this.sales = res;
  }
  generatePDF(sale: any) {
    const data = document.getElementById('contentToConvert');
    if(data != null){
      html2canvas(data).then(canvas => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('GeneratedPDF.pdf');
      });
    }
  }

}
