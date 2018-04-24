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
  private dropdownSettings3 = {};
  private selectedItems = [];
  private categorias = [];
  private opcDuracion = [];
  private tipoPago = [];
  private selectedPayType = [];
  private modalidades = [];
  private gender:string;
  private selectedItems2 = [];
  private selectedItems3 = [];
  private event;
  //private file:File;
  private file:File=null;
  private nombreArchivo:string;
  private fotoDisponible:boolean = false;
  private cargarFoto:boolean = false;
  //private iniciales:string;



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
        this.dropdownSettings3 = {
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
  onItemSelect3(item:any){
      this.selectedItems3.push(item);
      //console.log(this.selectedItems);
  }
  OnItemDeSelect3(item:any){
    var newSelectedItems = this.selectedItems3.filter(function(element) {
    return element.nombre !== item.nombre;
    });
    this.selectedItems3 = newSelectedItems;
  }
  onSelectAll(items: any){
      //console.log(items);
  }
  onDeSelectAll(items: any){
      //console.log(items);
  }
  onSubmitPublicarServicio(publishform){
    if(publishform.valid){
      var ciudades = [];
      var modalidades = [];
      var pagos = [];
      var path2:string;
      var cuentaValidada;
      var estado = true;


      this.nombre = publishform.controls.nombre.value;
      this.descripcion = publishform.controls.descripcion.value;
      this.categoria = publishform.controls.categoria.value;
      this.precio = publishform.controls.precio.value;
      this.tiempo_duracion = publishform.controls.tiempo_duracion.value;
      this.opcion_duracion = publishform.controls.opcion_duracion.value;

      cuentaValidada = this.authService.getVerficationAccount();

      //console.log(publishform);

      if(this.precio<=0){
        this.flashMensaje.show("El precio debe ser mayor a 0",
        {cssClass: 'alert-danger', timeout: 4000});
        estado = false;
      }
      else if(this.tiempo_duracion<=0){
        this.flashMensaje.show("El tiempo de duración debe ser mayor a 0",
        {cssClass: 'alert-danger', timeout: 4000});
        estado = false;
      }
      else if(!this.fotoDisponible){
        this.flashMensaje.show("No se ha seleccionado una imagen",
        {cssClass: 'alert-danger', timeout: 4000});
        estado = false;
      }
      else if(this.selectedItems.length<=0){
        this.flashMensaje.show("Debe seleccionar al menos una ciudad",
        {cssClass: 'alert-danger', timeout: 4000});
        estado = false;
      }
      else if(this.selectedItems2.length<=0){
        this.flashMensaje.show("Debe seleccionar al menos un tipo de pago",
        {cssClass: 'alert-danger', timeout: 4000});
        estado = false;
      }
      else if(this.selectedItems3.length<=0){
        this.flashMensaje.show("Debe seleccionar al menos una modalidad",
        {cssClass: 'alert-danger', timeout: 4000});
        estado = false;
      }
      else if(!cuentaValidada){
        var email = this.authService.getEmail();
        this.flashMensaje.show("Usuario con correo: "+ email+" debe confirmar cuenta",
        {cssClass: 'alert-danger', timeout: 4000});
        estado = false;
      }

      if(estado){
        for (let entry of this.selectedItems) {
             ciudades.push(entry.nombre);
        }
        for (let entry of this.selectedItems2) {
             pagos.push(entry.nombre);
        }
        for (let entry of this.selectedItems3) {
             modalidades.push(entry.nombre);
        }

        path2=this.databaseServicio.insertServiceDatabase(this.authService.afAuth.auth.currentUser.uid,this.categoria,this.nombre,
        this.descripcion,this.tiempo_duracion,this.opcion_duracion,this.precio,ciudades,
        modalidades,pagos,this.fecha);

        this.uploadFile(path2);

        this.flashMensaje.show('Servicio publicado satisfactoriamente',
        {cssClass: 'alert-success', timeout: 4000});

        this.router.navigate(['/privado']);
      }
    }else{
      this.flashMensaje.show("Formulario tiene campos incompletos o inválidos",
      {cssClass: 'alert-danger', timeout: 4000});
    }
  }
  uploadFile(idServicio:string){;
    const path = "servicios/"+idServicio;

    if(this.cargarFoto){
      const task = this.uploadService.uploadFile(this.file, path);
      this.uploadPercent = task.percentageChanges();
    }

  }
    getEvent(file:FileList){
      this.file = file.item(0);
      var reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (event:any) => {
        this.nombreArchivo = event.target.result;
        this.fotoDisponible = true;
      }
      this.cargarFoto = true;
    }


}
