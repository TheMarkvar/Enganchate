import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-privadopage',
  templateUrl: './privadopage.component.html',
  styleUrls: ['./privadopage.component.scss']
})
export class PrivadopageComponent implements OnInit {

  @ViewChild('content') content:ElementRef;
  public downloadPDF(){
    let doc = new jsPDF();
    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    };
    let content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML,15,15,{
      'width':190,
      'elementHandlers':specialElementHandlers
    });
    doc.save('factura.pdf');
  }

  constructor() { }

  ngOnInit() {
  }

}
