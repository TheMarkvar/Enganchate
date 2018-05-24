import { Component, OnInit } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { DatabaseServicioService } from '../../servicios/database-servicio.service';
import { OptionsService } from '../../servicios/options.service';
import { UploadService } from '../../servicios/upload.service';
import { Servicio } from  '../../modelos/servicio';
import { Ciudad } from  '../../modelos/ciudad';
import { Categoria } from  '../../modelos/categoria';
import { OpcionDuracion } from  '../../modelos/opcion-duracion';
import { TipoPago } from  '../../modelos/tipo-pago';
import { Observable } from 'rxjs/Observable';
import { Modalidad } from '../../modelos/modalidad';

@Component({
  selector: 'app-advancedsearchpage',
  templateUrl: './advancedsearchpage.component.html',
  styleUrls: ['./advancedsearchpage.component.scss']
})
export class AdvancedsearchpageComponent implements OnInit {
  private listaServicios = [];
  private categorias = [];
  private categoriasAux = [];
  private ciudades = [];
  private tipos_pago = [];
  private modalidades_pago = [];

  private selectedItems = [];
  private dropdownSettings = {};

  private selectedItems2 = [];
  private dropdownSettings2 = {};

  private selectedItems3 = [];
  private dropdownSettings3 = {};

  private selectedItems4 = [];
  private dropdownSettings4 = {};


  private precioMinimo: number;
  private precioMaximo: number;
  private buscar:string;
  private categoriaBusqueda:string;

  private navigationSubscription:any=null;

  private resultadoCiudades:string;
  private resultadoTipoPago:string;

  private entrada:boolean;


  constructor(
    private activatedRoute: ActivatedRoute,
    private optionsService:OptionsService,
    private databaseServicioService:DatabaseServicioService,
    private uploadService:UploadService,
    public flashMensaje: FlashMessagesService,
    public router:Router,
    private _sanitizer: DomSanitizer
  ) {
    this.precioMinimo=0;
    this.precioMaximo=1000000;
    this.entrada=false;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {


        //this.initialiseInvites();
        //this.cargarCategorias();
        //console.log("Entra en lo del constructor");

      }
    });
  }

  ngOnInit() {

    this.activatedRoute.queryParams
      .filter(params => params.search)
      .subscribe(params => {

        this.cargarCategorias();
        this.cargarCiudades();
        this.cargarTiposPago();
        this.cargarModalidades();

          if(Number(params.search)){
            this.categoriaBusqueda=params.search;
            this.buscar = "";
            console.log("Categoria:"+ this.categoriaBusqueda);
            this.filtrarServiciosParametros();

          }else{
              this.categoriaBusqueda="";
              this.buscar=params.search;
              console.log("Buscar:"+ this.buscar);
              this.filtrarServiciosBarraBusqueda();
          }



      });


      //console.log(this.buscar);


    //this.validarParametro();
    //this.filtrarServiciosBarraBusqueda();
    //this.cargarCategoriasAuxiliares();



  }
  /*filtrarServiciosBarraBusqueda(){
    this.activatedRoute.queryParams
      .filter(params => params.search)
      .subscribe(params => {

        this.buscar=params.search;

        console.log("filtrarServicioBarraBusqueda");
        console.log("buscar" + this.buscar);
        console.log("categoria:"+ this.categoriaBusqueda);
        this.databaseServicioService.getServicios().snapshotChanges().subscribe(item => {
          this.listaServicios = [];

          item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;

          let servicioFiltro:Servicio = new Servicio();
          var servicioValido:boolean = false;

          for(var key in x) {

              var value = x[key];

              if(key === "zona_cobertura"){
                let value2 = [];
                for (let key2 in value) {
                    value2.push(value[key2]);
                    if(value[key2].nombre.toUpperCase().includes(this.buscar.toUpperCase())
                    || this.buscar.toUpperCase().includes(value[key2].nombre.toUpperCase())){
                      servicioValido = true;
                    }
                }
                servicioFiltro.zona_cobertura = value2;
              }
              if(key === "modalidad"){
                let value2 = [];
                for (let key2 in value) {
                    value2.push(value[key2]);
                    if(value[key2].nombre.toUpperCase().includes(this.buscar.toUpperCase())
                    || this.buscar.toUpperCase().includes(value[key2].nombre.toUpperCase())){
                      servicioValido = true;
                    }
                }
                servicioFiltro.modalidad = value2;
              }
              else if(key === "tipo_pago"){
                let value2 = [];
                for (let key2 in value) {
                    value2.push(value[key2]);
                }
                servicioFiltro.tipo_pago = value2;
              }
              else if(key === "nombre"){
                servicioFiltro.nombre = value;
                if(value.toUpperCase().includes(this.buscar.toUpperCase())
                || this.buscar.toUpperCase().includes(value.toUpperCase())){
                  servicioValido = true;
                }
              }
              else if(key === "categoria"){
                servicioFiltro.categoria = value;
                if(value.nombre.toUpperCase().includes(this.buscar.toUpperCase())
                 || this.buscar.toUpperCase().includes(value.nombre.toUpperCase())){
                  servicioValido = true;
                }
              }
              else if(key === "descripcion"){
                servicioFiltro.descripcion = value;
                if(value.toUpperCase().includes(this.buscar.toUpperCase())
                || this.buscar.toUpperCase().includes(value.toUpperCase())){
                  servicioValido = true;
                }
              }
              else if(key === "precio"){
                servicioFiltro.precio = value;
              }
              else if(key=="pathImagen"){
                this.uploadService.downloadFile('servicios/'+value).subscribe(URL=>{
                  //console.log(URL.toString());
                  servicioFiltro.idServicio = value;
                  servicioFiltro.pathImagen = URL;
                });
              }

          }
          if(servicioValido){
              this.listaServicios.push(servicioFiltro);
          }
         ;});});
      });
  }*/

  filtrarServiciosBarraBusqueda(){
    //console.log("(FiltrarServiciosBarraBusqueda)buscar: " + this.buscar);
    //console.log("categoria:(FiltrarServiciosBarraBusqueda ) "+ this.categoriaBusqueda);
    this.databaseServicioService.getServicios().snapshotChanges().subscribe(item => {
      this.listaServicios = [];

      item.forEach(element => {
      let x = element.payload.toJSON();
      x["$key"] = element.key;
      //console.log("entra en forEach");

      let servicioFiltro:Servicio = new Servicio();
      var servicioValido:boolean = false;

      for(var key in x) {

          var value = x[key];

          if(key === "zona_cobertura"){
            let value2 = [];
            for (let key2 in value) {
                value2.push(value[key2]);
                if(value[key2].nombre.toUpperCase().includes(this.buscar.toUpperCase())
                || this.buscar.toUpperCase().includes(value[key2].nombre.toUpperCase())){
                  servicioValido = true;
                }
            }
            servicioFiltro.zona_cobertura = value2;
          }
          if(key === "modalidad"){
            let value2 = [];
            for (let key2 in value) {
                value2.push(value[key2]);
                if(value[key2].nombre.toUpperCase().includes(this.buscar.toUpperCase())
                || this.buscar.toUpperCase().includes(value[key2].nombre.toUpperCase())){
                  servicioValido = true;
                }
            }
            servicioFiltro.modalidad = value2;
          }
          else if(key === "tipo_pago"){
            let value2 = [];
            for (let key2 in value) {
                value2.push(value[key2]);
            }
            servicioFiltro.tipo_pago = value2;
          }
          else if(key === "nombre"){
            servicioFiltro.nombre = value;
            if(value.toUpperCase().includes(this.buscar.toUpperCase())
            || this.buscar.toUpperCase().includes(value.toUpperCase())){
              servicioValido = true;
            }
          }
          else if(key === "categoria"){
            servicioFiltro.categoria = value;
            if(value.nombre.toUpperCase().includes(this.buscar.toUpperCase())
             || this.buscar.toUpperCase().includes(value.nombre.toUpperCase())){
              servicioValido = true;
            }
          }
          else if(key === "descripcion"){
            servicioFiltro.descripcion = value;
            if(value.toUpperCase().includes(this.buscar.toUpperCase())
            || this.buscar.toUpperCase().includes(value.toUpperCase())){
              servicioValido = true;
            }
          }
          else if(key === "precio"){
            servicioFiltro.precio = value;
          }
          else if(key=="pathImagen"){
            this.uploadService.downloadFile('servicios/'+value).subscribe(URL=>{
              //console.log(URL.toString());
              servicioFiltro.idServicio = value;
              servicioFiltro.pathImagen = URL;
            });
          }

      }
      if(servicioValido){
          //console.log("servicioCumple con parametros");
          this.listaServicios.push(servicioFiltro);
      }
     ;});});
  }
  filtrarPrecio(){
    //console.log(this.precioMinimo);
    //console.log(this.precioMaximo);
  }
  imprimirCiudades(ciudades:Array<Ciudad>){
    this.resultadoCiudades = "";
    var aux=1;
    for(let item of ciudades){
      if(aux==1){
        this.resultadoCiudades=this.resultadoCiudades+item.nombre;
      }
      if(aux!=1){
        this.resultadoCiudades=this.resultadoCiudades+","+item.nombre;
      }
      aux=aux+1;
    }
    return this.resultadoCiudades;
  }
  imprimirTiposPago(tipoPago:Array<TipoPago>){
    this.resultadoTipoPago="";
    var aux=1;
    for(let item of tipoPago){
      if(aux==1){
        this.resultadoTipoPago=this.resultadoTipoPago+item.nombre;
      }
      if(aux!=1){
        this.resultadoTipoPago=this.resultadoTipoPago+","+item.nombre;
      }
      aux=aux+1;
    }
    return this.resultadoTipoPago;
  }
  filtrarServiciosParametros(){

    this.databaseServicioService.getServicios().snapshotChanges().subscribe(item => {
      this.listaServicios = [];

      item.forEach(element => {
      let x = element.payload.toJSON();
      x["$key"] = element.key;
      //console.log("entra en filtrarServiciosParametros");

      let servicioFiltro:Servicio = new Servicio();
      var servicioValido:boolean = false;
      var categoriaValido:boolean = false;
      var zonaCoberturaValido:boolean = false;
      var modalidadValido:boolean = false;
      var tipoPagoValido:boolean = false;
      var precioValido:boolean = false;


      for(var key in x) {
          var value = x[key];

          if(key === "zona_cobertura"){
            if(this.selectedItems2.length==0){
              zonaCoberturaValido=true;
            }
            let value2 = [];
            for(let j in value){
              value2.push(value[j]);
              for(let i of this.selectedItems2){
                if((value[j].nombre.toUpperCase().includes(i.nombre)
                || i.nombre.toUpperCase().includes(value[j].nombre.toUpperCase()))){
                  servicioValido = true;
                  zonaCoberturaValido = true;
                }
              }
            }
            servicioFiltro.zona_cobertura = value2;
          }
          else if(key === "modalidad"){
            if(this.selectedItems4.length==0){
              modalidadValido = true;
            }
            let value2 = [];
            for(let j in value){
              value2.push(value[j]);
              for(let i of this.selectedItems4){
                if(value[j].nombre.toUpperCase().includes(i.nombre)
                || i.nombre.toUpperCase().includes(value[j].nombre.toUpperCase())){
                  servicioValido = true;
                  modalidadValido = true;
                }
              }
            }
            servicioFiltro.modalidad = value2;
          }

          else if(key === "tipo_pago"){
            if(this.selectedItems3.length==0){
              tipoPagoValido = true;
            }
            let value2 = [];
            for(let j in value){
              value2.push(value[j]);
              for(let i of this.selectedItems3){
                if(value[j].nombre.toUpperCase().includes(i.nombre)
                || i.nombre.toUpperCase().includes(value[j].nombre.toUpperCase())){
                  servicioValido = true;
                  tipoPagoValido = true;
                }
              }
            }
            servicioFiltro.tipo_pago = value2;
          }
          else if(key === "nombre"){
            servicioFiltro.nombre = value;
          }
          if(key === "categoria"){
            servicioFiltro.categoria = value;
            if(this.selectedItems.length==0){
              categoriaValido = true;
            }
            for(let i of this.selectedItems){
              if(value.nombre.toUpperCase().includes(i.nombre)
              || i.nombre.toUpperCase().includes(value.nombre.toUpperCase())){
                servicioValido = true;
                categoriaValido = true;
              }
            }
          }
          else if(key === "descripcion"){
            servicioFiltro.descripcion = value;
          }
          else if(key === "precio"){
            servicioFiltro.precio = value;
            if(this.precioMinimo <= value && this.precioMaximo >= value){
              servicioValido = true;
              precioValido = true;
            }
          }
          else if(key=="pathImagen"){
            this.uploadService.downloadFile('servicios/'+value).subscribe(URL=>{
              //console.log(URL.toString());
              servicioFiltro.idServicio = value;
              servicioFiltro.pathImagen = URL;
            });
          }
      }
      /*if(servicioValido){
          this.listaServicios.push(servicioFiltro);
      }*/
      if(categoriaValido && zonaCoberturaValido && modalidadValido && tipoPagoValido && precioValido){
        this.listaServicios.push(servicioFiltro);
      }
     ;});});
  }

  cargarImagen(path){
    this.uploadService.downloadFile('servicios/'+path);
  }
  cargarCategorias(){
    this.optionsService.getCategorias().snapshotChanges().subscribe(item => {
    this.categorias = [];

    item.forEach(element => {
    let x = element.payload.toJSON();
    //x["$key"] = element.key;
    /*for(var key in x) {
        var value = x[key];
    }*/

     this.categorias.push(x as Categoria);});

     if(this.categoriaBusqueda!=""){
       this.selectedItems = [];
       for(let item of this.categorias){
         //console.log(item);
         if(item.id==this.categoriaBusqueda){
           //console.log("Entro mmmm");
           //this.onItemSelect({id:item.id,nombre:item.nombre});
           this.onItemSelect(item);
           //console.log(this.categorias);
           this.filtrarServiciosParametros();
           //this.selectedItems.push(cat);
           //this.filtrarServiciosParametros();
         }
       }
     }
   });

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
    //this.filtrarServiciosParametros();

  }

  cargarCiudades(){
    this.optionsService.getCiudades().snapshotChanges().subscribe(item => {
      this.ciudades = [];

      item.forEach(element => {
      let x = element.payload.toJSON();
      x["$key"] = element.key;
     this.ciudades.push(x as Ciudad);});});



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

  }

  cargarTiposPago(){
    this.optionsService.getTipoPago().snapshotChanges().subscribe(item => {
      this.tipos_pago = [];

      item.forEach(element => {
      let x = element.payload.toJSON();
      x["$key"] = element.key;
     this.tipos_pago.push(x as TipoPago);});});



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
  }

  cargarModalidades(){
    this.optionsService.getModalidad().snapshotChanges().subscribe(item => {
      this.modalidades_pago = [];

      item.forEach(element => {
      let x = element.payload.toJSON();
      x["$key"] = element.key;
     this.modalidades_pago.push(x as Modalidad);});});



   this.dropdownSettings4 = {
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
      this.selectedItems.push(item);

      console.log(this.selectedItems);
      this.filtrarServiciosParametros();
      //console.log(this.selectedItems);
  }
  OnItemDeSelect(item:any){
    var newSelectedItems = this.selectedItems.filter(function(element) {
    return element.nombre !== item.nombre;
    });
    this.selectedItems = newSelectedItems;
    this.filtrarServiciosParametros();
  }

  onSelectAll(items: any){
      //console.log(items);
  }
  onDeSelectAll(items: any){
      //console.log(items);
  }


  onItemSelect2(item:any){
      this.selectedItems2.push(item);
      this.filtrarServiciosParametros();
      //console.log(this.selectedItems);
  }
  OnItemDeSelect2(item:any){
    var newSelectedItems2 = this.selectedItems2.filter(function(element) {
    return element.nombre !== item.nombre;
    });
    this.selectedItems2 = newSelectedItems2;
    this.filtrarServiciosParametros();
  }

  onSelectAll2(items: any){
      //console.log(items);
  }
  onDeSelectAll2(items: any){
      //console.log(items);
  }


  onItemSelect3(item:any){
      this.selectedItems3.push(item);
      //console.log(this.selectedItems);
      this.filtrarServiciosParametros();
  }
  OnItemDeSelect3(item:any){
    var newSelectedItems3 = this.selectedItems3.filter(function(element) {
    return element.nombre !== item.nombre;
    });
    this.selectedItems3 = newSelectedItems3;
    this.filtrarServiciosParametros();
  }

  onSelectAll3(items: any){
      //console.log(items);
  }
  onDeSelectAll3(items: any){
      //console.log(items);
  }

  onItemSelect4(item:any){
      this.selectedItems4.push(item);
      //console.log(this.selectedItems);
      this.filtrarServiciosParametros();
  }
  OnItemDeSelect4(item:any){
    var newSelectedItems4 = this.selectedItems4.filter(function(element) {
    return element.nombre !== item.nombre;
    });
    this.selectedItems4 = newSelectedItems4;
    this.filtrarServiciosParametros();
  }

  onSelectAll4(items: any){
      //console.log(items);
  }
  onDeSelectAll4(items: any){
      //console.log(items);
  }

  initialiseInvites() {
    //this.filtrarServiciosBarraBusqueda();
    //this.filtrarServiciosParametros();
  }

  ngOnDestroy() {
     if (this.navigationSubscription) {
        this.navigationSubscription.unsubscribe();
     }
   }

   onClickService(idService:string){
     this.router.navigate(['/service'], { queryParams: { search: idService } });
   }

   getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
  }



}
