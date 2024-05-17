import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { global } from './global';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})

export class PdfService {
    public url:string;
    constructor(private _http:HttpClient) {
        this.url = global.url;
    }

    public generatePdf(elementId: string, pdfName: string): void {
      const element = document.getElementById(elementId);
      if (element) {
        // Clona el elemento
        const clone = element.cloneNode(true) as HTMLElement;

        // Añade el clon al DOM temporalmente
        clone.style.position = 'absolute';
        clone.style.top = '-10000px';
        document.body.appendChild(clone);

        html2canvas(clone).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(pdfName);

          // Elimina el clon del DOM
          document.body.removeChild(clone);
        });
      }
    }
}
