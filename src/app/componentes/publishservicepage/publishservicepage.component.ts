import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { DatabaseService } from '../../servicios/database.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { AuthService } from '../../servicios/auth.service';
import { FormsModule } from '@angular/forms';
import { DatabaseServicioService } from '../../servicios/database-servicio.service';
import {  OptionsService } from '../../servicios/options.service';
import {  UploadService } from '../../servicios/upload.service';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Ciudad } from  '../../modelos/ciudad';
import { Categoria } from  '../../modelos/categoria';
import { OpcionDuracion } from  '../../modelos/opcion-duracion';
import { TipoPago } from  '../../modelos/tipo-pago';
import { Observable } from 'rxjs/Observable';
import { Modalidad } from '../../modelos/modalidad';
@Component({
  selector: 'app-publishservicepage',
  templateUrl: './publishservicepage.component.html',
  styleUrls: ['./publishservicepage.component.scss']
})

export class PublishservicepageComponent implements OnInit {
  uploadPercent: Observable<number>;
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
  private dropdownSettings2 = {};
  private selectedItems = [];
  private categorias = [];
  private opcDuracion = [];
  private tipoPago = [];
  private selectedPayType = [];
  private modalidades = [];
  private gender:string;
  private selectedItems2 = [];
  private event;
  private file:File;


  constructor(
    public databaseServicio:DatabaseServicioService,
    public OptionsService:OptionsService,
    public uploadService:UploadService,
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
        this.dropdownSettings2 = {
            singleSelection: false,
            idField: 'id',
            textField: 'nombre',
            selectAllText: 'Seleccionar todas',
            unSelectAllText: 'Deseleccionar todas',
            searchPlaceholderText: 'Buscar',
            itemsShowLimit: 10,
            allowSearchFilter: true
        };

        this.OptionsService.getCategorias().snapshotChanges().subscribe(item => {
        this.categorias = [];

        item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
         this.categorias.push(x as Categoria);});});

         this.OptionsService.getOpcDuracion().snapshotChanges().subscribe(item => {
         this.opcDuracion = [];

         item.forEach(element => {
         let x = element.payload.toJSON();
         x["$key"] = element.key;
          this.opcDuracion.push(x as OpcionDuracion);});});

          this.OptionsService.getTipoPago().snapshotChanges().subscribe(item => {
          this.tipoPago = [];

          item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
           this.tipoPago.push(x as TipoPago);});});

           this.OptionsService.getModalidad().snapshotChanges().subscribe(item => {
           this.modalidades = [];

           item.forEach(element => {
           let x = element.payload.toJSON();
           x["$key"] = element.key;
            this.modalidades.push(x as Modalidad);});});
  }

  onItemSelect(item:any){
      this.selectedItems.push(item);
      //console.log(this.selectedItems);
  }
  OnItemDeSelect(item:any){
    var newSelectedItems = this.selectedItems.filter(function(element) {
    return element.nombre !== item.nombre;
    });
    this.selectedItems = newSelectedItems;
  }
  onItemSelect2(item:any){
      this.selectedItems2.push(item);
      //console.log(this.selectedItems);
  }
  OnItemDeSelect2(item:any){
    var newSelectedItems = this.selectedItems2.filter(function(element) {
    return element.nombre !== item.nombre;
    });
    this.selectedItems2 = newSelectedItems;
  }
  onSelectAll(items: any){
      //console.log(items);
  }
  onDeSelectAll(items: any){
      //console.log(items);
  }
  onSubmitPublicarServicio(){
    /*
      if(this.efectivo!=""){
        this.tipo_pago.push("EFECTIVO");
      }
      if(this.credito!=""){
        this.tipo_pago.push("CREDITO");
      }
      if(this.debito!=""){
        this.tipo_pago.push("DEBITO");
      }*/

      //this.fecha = new Date();

      this.databaseServicio.insertServiceDatabase(this.authService.afAuth.auth.currentUser.uid,this.categoria,this.nombre,
      this.descripcion,this.tiempo_duracion,this.opcion_duracion,this.precio,this.selectedItems,
      this.modalidad,this.selectedItems2,this.fecha);
      this.router.navigate(['/privado']);
      //this.uploadFile();



  }
  uploadFile(){
    //const task = this.storage.upload(filePath, file);
    const path = "servicios/"+this.authService.afAuth.auth.currentUser.uid;
    console.log(path);
    const task = this.uploadService.uploadFile(this.event, path);
    this.uploadPercent = task.percentageChanges();
  }
  getEvent(event){
    this.event = event;
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
