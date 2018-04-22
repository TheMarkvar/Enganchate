import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { DatabaseService } from '../../servicios/database.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { AuthService } from '../../servicios/auth.service';
import { FormsModule } from '@angular/forms';
import { DatabaseServicioService } from '../../servicios/database-servicio.service';
import {  OptionsService } from '../../servicios/options.service';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Ciudad } from  '../../modelos/ciudad';
import { Observable } from 'rxjs/Observable';
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
  private zona_cobertura = [];
  private modalidad:string;
  private efectivo:string;
  private credito:string;
  private debito:string;
  private tipo_pago:Array<string>;
  private fecha:Date;
  private ciudades = [];
  private dropdownSettings = {};
  private selectedItems = [];

  constructor(
    //public databaseService: DatabaseService,
    public databaseServicio:DatabaseServicioService,
    public OptionsService:OptionsService,
    public router:Router,
    public flashMensaje: FlashMessagesService,
    public authService: AuthService
  ) {
    this.efectivo="";
    this.debito="";
    this.credito="";
    this.tipo_pago = new Array<string>();
    this.fecha=new Date();
    //this.ciudades=new Array<Ciudad>();

  }

  ngOnInit() {
    var ciudades2 = [];
    //this.OptionsService.getCiudades();
    this.OptionsService.getCiudades().snapshotChanges().subscribe(item => {
      this.ciudades = [];

      item.forEach(element => {
      let x = element.payload.toJSON();
      x["$key"] = element.key;
       this.ciudades.push(x as Ciudad);});});

        this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'nombre',
            selectAllText: 'Seleccionar todas',
            unSelectAllText: 'Deseleccionar todas',
            searchPlaceholderText: 'Buscar',
            itemsShowLimit: 10,
            allowSearchFilter: true
        };
  }
  onItemSelect(item:any){
      //console.log(item);
      this.selectedItems.push(item);
      console.log(this.selectedItems);
      //console.log(item);

  }
  OnItemDeSelect(item:any){
    //console.log(item);
    var newSelectedItems = this.selectedItems.filter(function(element) {
    return element.nombre !== item.nombre;
    });
    //console.log("removed");
    //console.log(removed);
    this.selectedItems = newSelectedItems;

    //console.log(this.selectedItems);
  }
  onSelectAll(items: any){
      //console.log(items);
  }
  onDeSelectAll(items: any){
      //console.log(items);
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

      this.databaseServicio.insertServiceDatabase(this.authService.afAuth.auth.currentUser.uid,this.categoria,this.nombre,
      this.descripcion,this.tiempo_duracion,this.opcion_duracion,this.precio,this.selectedItems,
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
