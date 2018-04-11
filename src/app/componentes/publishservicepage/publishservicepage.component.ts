import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../../servicios/database.service';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-publishservicepage',
  templateUrl: './publishservicepage.component.html',
  styleUrls: ['./publishservicepage.component.scss']
})
export class PublishservicepageComponent implements OnInit {
  private categoria:string;
  private nombre:string;
  private descripcion:string;
  private tiempo_duracion:number;
  private opcion_duracion:string;
  private total_duracion:string;
  private precio:number;
  private zona_cobertura:string;
  private modalidad:string;
  private efectivo:string;
  private credito:string;
  private debito:string;
  private tipo_pago:Array<string>;
  private fecha:Date;

  constructor(
    public databaseService: DatabaseService,
    public router:Router,
    public flashMensaje: FlashMessagesService
  ) {
    this.efectivo="";
    this.debito="";
    this.credito="";
    this.tipo_pago = new Array<string>();
  }

  ngOnInit() {
  }

  onSubmitPublicarServicio(){
    if(this.verificarFormulario()){
      this.total_duracion = this.tiempo_duracion+this.opcion_duracion;
      console.log("categoria: "+this.categoria + ", nombre: " + this.nombre +
       ", descripción: " + this.descripcion + ", duracion: "+this.total_duracion+
       ", precio: "+this.precio+", zona: "+ this.zona_cobertura + ", modalidad:  "
      +this.modalidad + ", tipo_pago: " + this.tipo_pago+ ",  fecha: "+ this.fecha + "**");
      //this.router.navigate(['/home']);
      this.tipo_pago = new Array<string>();
    }


  }

  verificarFormulario(){
    this.fecha = new Date();

    if(this.efectivo!="")
      this.tipo_pago.push('Efectivo');
    if(this.debito!="")
      this.tipo_pago.push('Debito');
    if(this.credito!="")
      this.tipo_pago.push('Credito');

    return true;
  }

}
