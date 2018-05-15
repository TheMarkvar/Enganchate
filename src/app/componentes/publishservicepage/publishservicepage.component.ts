import { Component, OnInit,ViewChild,ElementRef,NgZone,AfterViewInit,ChangeDetectorRef } from '@angular/core';
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
import { PipeCategoriasPipe } from '../../pipes/pipe-categorias.pipe';

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';


@Component({
  selector: 'app-publishservicepage',
  templateUrl: './publishservicepage.component.html',
  styleUrls: ['./publishservicepage.component.scss']
})

export class PublishservicepageComponent implements OnInit, AfterViewInit {
  uploadPercent: Observable<number>;
  private categoria:string;
  private nombre:string;
  private descripcion:string;
  private tiempo_duracion:number;
  private opcion_duracion:string;
  private total_duracion:string;
  private precio:number;
  private ciudades = [];
  private zona_cobertura = [];
  private fecha:Date;
  private dropdownSettings = {};
  private dropdownSettings3 = {};
  private selectedItems = [];
  private categorias;
  private pagos;
  private direccion:string;
  private direccionValida:boolean;
  private opcDuracion = [];
  private tipoPago = [];
  private modalidades = [];
  private selectedItems3 = [];
  private event;
  private file:File=null;
  private nombreArchivo:string;
  private fotoDisponible:boolean = false;
  private cargarFoto:boolean = false;

  private opcionCategoria;
  private opcionesPago;


  private firstStepCompleted = false;
  private secondStepCompleted = false;
  private thirdStepCompleted = false;
  private fourthStepCompleted = false;
  private firstStepVisible = true;
  private secondStepVisible = false;
  private thirdStepVisible = false;
  private fourthStepVisible = false;

  private lat: number = 4.624335;
  private lng: number = -74.063644;
  private zoom: number = 5;
  private locationChosen = false;
  private search:string = "ccc";


  @ViewChild('search') public searchElement: ElementRef;



  constructor(
    public databaseServicio:DatabaseServicioService,
    public OptionsService:OptionsService,
    public uploadService:UploadService,
    public router:Router,
    public flashMensaje: FlashMessagesService,
    public authService: AuthService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone:NgZone,
    private _sanitizer: DomSanitizer,
    private changeDetector : ChangeDetectorRef
  ) {
    this.fecha=new Date();
    this.categorias = new Map();
    this.pagos = new Map();
    this.opcionesPago = new Map();



  }


  ngAfterViewInit() {
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

        item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;


        if(x["id"]!=null && x["id"]!=undefined){
          let cat:{nombre:string, id:string};
          cat = {nombre:x["nombre"].toString(),id:x["id"]};

          this.uploadService.downloadFile('opciones/categorias/'+x["nombre"]).subscribe(URL=>{
            let cat:{nombre:string, id:string, pathImagen:string};
            cat = {nombre:x["nombre"].toString(),id:x["id"], pathImagen:URL};
            if(this.categorias.has(cat.id)){
            this.categorias.delete(cat.id);
            this.categorias.set(cat.id, cat);
          }

          });
          this.categorias.set(cat.id, cat);

        }

         });});

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

          if(x["id"]!=null && x["id"]!=undefined){
            let pago:{nombre:string, id:string};
            pago = {nombre:x["nombre"].toString(),id:x["id"]};

            this.uploadService.downloadFile('opciones/'+x["nombre"]).subscribe(URL=>{
              let pago:{nombre:string, id:string, pathImagen:string};
              pago = {nombre:x["nombre"].toString(),id:x["id"], pathImagen:URL};
              if(this.pagos.has(pago.id)){
              this.pagos.delete(pago.id);
              this.pagos.set(pago.id, pago);
            }

            });
            this.pagos.set(pago.id, pago);

          }


           this.tipoPago.push(x as TipoPago);});});

           this.OptionsService.getModalidad().snapshotChanges().subscribe(item => {
           this.modalidades = [];

           item.forEach(element => {
           let x = element.payload.toJSON();
           x["$key"] = element.key;
            this.modalidades.push(x as Modalidad);});});
  }

  initAddressOnMap(){

    this.changeDetector.detectChanges();
    this.mapsAPILoader.load().then(
       () => {

         if(this.searchElement!=null || this.searchElement!=undefined){
           let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["address"] });

            autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
             let place: google.maps.places.PlaceResult = autocomplete.getPlace();
             if(place.geometry === undefined || place.geometry === null ){
              return;
            }else{
              this.direccion = place.formatted_address;
              let valido = false;
              //console.log(place);
              //console.log(this.direccion);

              for(let val of place.address_components){
                if(val.short_name.toLowerCase()==="co"){
                  valido = true;
                }
              }

              this.direccionValida = valido;

              //console.log(this.direccion);
              this.lat = place.geometry.location.lat();
              this.lng = place.geometry.location.lng();
              this.zoom = 15;
              this.locationChosen = true;


            }

             });
            });
         }


       }
     )

  }

  uploadFile(idServicio:string){
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

  getValues(map){
     return Array.from(map.values());
  }

  getEventCategory(event){
    this.opcionCategoria = event.srcElement.value;
    //console.log(this.opcionCategoria);
  }

  getEventPayment(event){
    let value = event.target.value;
    if(event.target.checked){
      this.opcionesPago.set(value, value);
    }else if(!event.target.checked){
      this.opcionesPago.delete(value);
    }

    //console.log(this.opcionesPago);
  }

  onSubmitDescription(descriptionform){

    let estado = true;


    this.nombre = descriptionform.controls.nombre.value;
    this.descripcion = descriptionform.controls.descripcion.value;
    this.tiempo_duracion = descriptionform.controls.tiempo_duracion.value;
    this.opcion_duracion = descriptionform.controls.opcion_duracion.value;

    if(!this.fotoDisponible){
      this.flashMensaje.show("No se ha seleccionado una imagen",
      {cssClass: 'alert-danger', timeout: 4000});
      estado = false;
    }
    else if(!this.nombre){
      this.flashMensaje.show("El nombre del servicio es obligatorio",
      {cssClass: 'alert-danger', timeout: 4000});
      estado = false;
    }
    else if(!this.descripcion){
      this.flashMensaje.show("La descripción del servicio es obligatorio",
      {cssClass: 'alert-danger', timeout: 4000});
      estado = false;
    }
    else if(this.tiempo_duracion<=0){
      this.flashMensaje.show("El tiempo de duración debe ser mayor a 0",
      {cssClass: 'alert-danger', timeout: 4000});
      estado = false;
    }
    else if(!this.opcion_duracion){
      this.flashMensaje.show("Opción de duración inválida",
      {cssClass: 'alert-danger', timeout: 4000});
      estado = false;
    }

    if(estado){
      this.onNextSecondStep();
    }
  }

  onNextFirstStep(){

    if(this.opcionCategoria){
      this.firstStepCompleted = true;
      this.firstStepVisible = false;
      this.secondStepVisible = true;
    }else{
      this.flashMensaje.show("Debe seleccionar una categoría",
      {cssClass: 'alert-danger', timeout: 4000});
    }

  }

  onBackSecondStep(){
    this.firstStepVisible = true;
    this.firstStepCompleted = false;
    this.secondStepVisible = false;
    this.opcionCategoria = null;
  }

  onNextSecondStep(){
    let estado = true;
    if(!this.fotoDisponible){
      this.flashMensaje.show("No se ha seleccionado una imagen",
      {cssClass: 'alert-danger', timeout: 4000});
      estado = false;
    }
    else if(!this.nombre){
      this.flashMensaje.show("El nombre del servicio es obligatorio",
      {cssClass: 'alert-danger', timeout: 4000});
      estado = false;
    }
    else if(!this.descripcion){
      this.flashMensaje.show("La descripción del servicio es obligatorio",
      {cssClass: 'alert-danger', timeout: 4000});
      estado = false;
    }
    else if(this.tiempo_duracion<=0){
      this.flashMensaje.show("El tiempo de duración debe ser mayor a 0",
      {cssClass: 'alert-danger', timeout: 4000});
      estado = false;
    }
    else if(!this.opcion_duracion){
      this.flashMensaje.show("Opción de duración inválida",
      {cssClass: 'alert-danger', timeout: 4000});
      estado = false;
    }

    if(estado){
      this.secondStepCompleted = true;
      this.secondStepVisible = false;
      this.thirdStepVisible = true;
      this.initAddressOnMap();
    }
  }

  onBackThirdStep(){

    this.secondStepVisible = true;
    this.secondStepCompleted = false;
    this.thirdStepCompleted = false;
    this.thirdStepVisible = false;
  }

  onNextThirdStep(){

    let estado:boolean = true;


    /*if(!this.direccion){
      this.direccion = "Bogotá";
      this.direccionValida = true;
    }*/

    if(!this.direccion){
      estado = false;
      this.flashMensaje.show("Debe seleccionar una dirección válida",
      {cssClass: 'alert-danger', timeout: 4000});
    }else if(!this.direccionValida){
      estado = false;
      this.flashMensaje.show("Debe seleccionar una dirección dentro de Colombia",
      {cssClass: 'alert-danger', timeout: 4000});
    }else if(this.selectedItems.length===0){
      estado = false;
      this.flashMensaje.show("Debe seleccionar al menos una ciudad",
      {cssClass: 'alert-danger', timeout: 4000});
    }else if(this.selectedItems3.length<=0){
      this.flashMensaje.show("Debe seleccionar al menos una modalidad",
      {cssClass: 'alert-danger', timeout: 4000});
      estado = false;
    }
    else if(!this.opcionesPago || this.getValues(this.opcionesPago).length===0){
      this.flashMensaje.show("Debe seleccionar al menos un método de pago",
      {cssClass: 'alert-danger', timeout: 4000});
      estado = false;
    }
    else if(!this.precio || this.precio<=0){
      estado = false;
      this.flashMensaje.show("El precio debe ser mayor a 0",
      {cssClass: 'alert-danger', timeout: 4000});
    }

    if(estado){
      this.thirdStepCompleted = true;
      this.thirdStepVisible = false;
      this.fourthStepVisible = true;
    }
  }

  onBackFourthStep(){
    this.thirdStepVisible = true;
    this.thirdStepCompleted = false;
    this.fourthStepCompleted = false;
    this.fourthStepVisible = false;
    this.selectedItems = [];
    this.selectedItems3 = [];
    this.opcionesPago.clear();
    this.initAddressOnMap();
  }

  onNextFourthStep(){

    let cuentaValidada = this.authService.getVerficationAccount();

    if(!cuentaValidada){
      var email = this.authService.getEmail();
      this.authService.sendEmailVerification();
      this.flashMensaje.show("Usuario con correo: "+ email+" debe confirmar cuenta",
      {cssClass: 'alert-danger', timeout: 4000});
    }else{
      let path2, ciudades=[], modalidades=[], pagos=[];
      for (let entry of this.selectedItems) {
           ciudades.push(entry.nombre);
      }
      for (let entry of this.selectedItems3) {
           modalidades.push(entry.nombre);
      }

      for (let pago of this.getValues(this.opcionesPago)) {
           pagos.push(pago);
      }


      this.fourthStepCompleted = true;
      this.fourthStepVisible = false;


      path2=this.databaseServicio.insertServiceDatabase(this.authService.afAuth.auth.currentUser.uid,
      this.opcionCategoria,this.nombre, this.descripcion,this.tiempo_duracion, this.opcion_duracion,
      this.precio,ciudades, modalidades, this.direccion, pagos,this.fecha);

      this.uploadFile(path2);

      this.flashMensaje.show('Servicio publicado satisfactoriamente',
      {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/home']);
    }
  }

  onFirstStep(){
    this.firstStepVisible = true;
    this.secondStepVisible = false;
    this.thirdStepVisible = false;
    this.fourthStepVisible = false;
    this.secondStepCompleted = false;
    this.thirdStepCompleted = false;
    this.fourthStepCompleted = false;
    this.opcionCategoria = null;
    this.selectedItems = [];
    this.selectedItems3 = [];
    this.opcionesPago.clear();
  }

  onSecondStep(){
    this.firstStepVisible = false;
    this.secondStepVisible = true;
    this.thirdStepVisible = false;
    this.thirdStepCompleted = false;
    this.fourthStepVisible = false;
    this.fourthStepCompleted = false;
    this.selectedItems = [];
    this.selectedItems3 = [];
    this.opcionesPago.clear();
  }

  onThirdStep(){
    this.firstStepVisible = false;
    this.secondStepVisible = false;
    this.thirdStepVisible = true;
    this.fourthStepVisible = false;
    this.fourthStepCompleted = false;
    this.selectedItems = [];
    this.selectedItems3 = [];
    this.opcionesPago.clear();
    this.initAddressOnMap();

  }

  onItemSelect(item:any){
      this.selectedItems.push(item);
      //console.log(item);
  }
  OnItemDeSelect(item:any){
    let newSelectedItems = this.selectedItems.filter(function(element) {
    return element.nombre !== item.nombre;
    });
    this.selectedItems = newSelectedItems;
  }

  onItemSelect3(item:any){
      this.selectedItems3.push(item);
      //console.log(this.selectedItems3);
  }
  OnItemDeSelect3(item:any){
    var newSelectedItems = this.selectedItems3.filter(function(element) {
    return element.nombre !== item.nombre;
    });
    this.selectedItems3 = newSelectedItems;
  }
  onSelectAll(items: any[]){
    this.selectedItems = items;
      //console.log(items);
  }
  onDeSelectAll(items: any){
      //console.log(items);
      this.selectedItems = [];
  }

  onSelectAll3(items: any[]){
    this.selectedItems3 = items;
      //console.log(items);
  }
  onDeSelectAll3(items: any){
      //console.log(items);
      this.selectedItems3 = [];
  }




}
