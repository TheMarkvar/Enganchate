import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advancedsearchpage',
  templateUrl: './advancedsearchpage.component.html',
  styleUrls: ['./advancedsearchpage.component.scss']
})
export class AdvancedsearchpageComponent implements OnInit {
  private precioMinimo: number;
  private precioMaximo: number;
  private precioActual: number;
  private efectivo:string;
  private credito:string;
  private debito:string;
  private modalidad:string;
  private zona_cobertura:string;

  constructor() {

   }

  ngOnInit() {
  }





}
