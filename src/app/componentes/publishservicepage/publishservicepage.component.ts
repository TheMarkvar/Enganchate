import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../../servicios/database.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { AuthService } from '../../servicios/auth.service';

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
    public flashMensaje: FlashMessagesService,
    public authService: AuthService
  ) {
    this.efectivo="";
    this.debito="";
    this.credito="";
    this.tipo_pago = new Array<string>();
    this.fecha=new Date();
  }

  ngOnInit() {
  }

  onSubmitPublicarServicio(){

      if(this.efectivo!=""){
        this.tipo_pago.push("EFECTIVO");
      }
      if(this.credito!=""){
        this.tipo_pago.push("CREDITO");
      }
      if(this.debito!=""){
        this.tipo_pago.push("DEBITO");
      }

      this.fecha = new Date();


      this.databaseService.insertServiceDatabase(this.authService.afAuth.auth.currentUser.uid,this.categoria,this.nombre,
      this.descripcion,this.tiempo_duracion,this.opcion_duracion,this.precio,this.zona_cobertura,
      this.modalidad,this.tipo_pago,this.fecha);
      this.router.navigate(['/privado']);



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
