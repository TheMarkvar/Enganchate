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
      console.log("**"+this.categoria + " " + this.nombre + " " + this.descripcion
      +" "+this.tiempo_duracion+" "+this.precio+" "+ this.zona_cobertura + " "
      +this.modalidad + " " + this.tipo_pago+ " "+ this.fecha + "**");
      this.router.navigate(['/home']);
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
