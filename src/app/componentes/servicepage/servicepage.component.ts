import { Component, OnInit } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';

import { AuthService } from '../../servicios/auth.service';
import { DatabaseService } from '../../servicios/database.service';
import { ChatService } from '../../servicios/chat.service';
import { PurchaseService } from '../../servicios/purchase.service';
import { DatabaseServicioService } from '../../servicios/database-servicio.service';
import { OptionsService } from '../../servicios/options.service';
import { UploadService } from '../../servicios/upload.service';

import { Servicio } from  '../../modelos/servicio';
import { Usuario } from  '../../modelos/usuario';
import { Ciudad } from  '../../modelos/ciudad';
import { Categoria } from  '../../modelos/categoria';
import { OpcionDuracion } from  '../../modelos/opcion-duracion';
import { TipoPago } from  '../../modelos/tipo-pago';
import { Observable } from 'rxjs/Observable';
import { Modalidad } from '../../modelos/modalidad';

@Component({
  selector: 'app-servicepage',
  templateUrl: './servicepage.component.html',
  styleUrls: ['./servicepage.component.scss']
})
export class ServicepageComponent implements OnInit {


  constructor(
    private activatedRoute: ActivatedRoute,
    private optionsService:OptionsService,
    public authService: AuthService,
    private databaseServicioService:DatabaseServicioService,
    public databaseService: DatabaseService,
    public purchaseService: PurchaseService,
    public chatService: ChatService,
    private uploadService:UploadService,
    public flashMensaje: FlashMessagesService,
    public router:Router,
    private _sanitizer: DomSanitizer
  ) { }

  servicio:Servicio;
  usuario:Usuario;


  iniciales = "";
  file:File=null;
  nombreArchivo:string;
  fotoInicial:boolean = false;
  cargarFoto:boolean = false;
  calificacion = '0';
  idUsuarioActual:string;
  cant = 0;
  message:string="";
  precio:number;
  selectedItems = [];
  selectedItems2 = [];
  selectedItems3 = [];
  dropdownSettings = {};
  ciudades = [];
  dropdownSettings2 = {};
  dropdownSettings3 = {};
  categorias = [];
  modalidades = [];
  selectedItems4 = [];
  dropdownSettings4 = {};
  tipo_pago = [];
  selectedItems5 = [];
  dropdownSettings5 = {};
  opcion_duracion = [];
  tipoP:TipoPago;
  category:string;

  ngOnInit() {
    this.servicio = new Servicio();
    this.usuario = new Usuario();

    this.activatedRoute.queryParams
      .filter(params => params.search)
      .subscribe(params => {
        this.servicio.idServicio = params.search;
      });

      this.cargarDatos();

  }

  cargarDatos(){

    var fec = this.databaseServicioService.getServicio(this.servicio.idServicio).then(
      function(snapshot) {
       var fecha = (snapshot.val() && snapshot.val().fecha);
       return fecha;
    });
    fec.then((res) => {
      this.servicio.fecha = res;
    });

    var cat = this.databaseServicioService.getServicio(this.servicio.idServicio).then(
      function(snapshot) {
       var categoria = (snapshot.val() && snapshot.val().categoria);
       return categoria;
    });
    cat.then((res) => {
      this.servicio.categoria = res;
      this.category=res.nombre;
    });

    var dir = this.databaseServicioService.getServicio(this.servicio.idServicio).then(
      function(snapshot) {
       var direccion = (snapshot.val() && snapshot.val().direccion);
       return direccion;
    });
    dir.then((res) => {
      this.servicio.direccion = res;
    });

    var des = this.databaseServicioService.getServicio(this.servicio.idServicio).then(
      function(snapshot) {
       var descripcion = (snapshot.val() && snapshot.val().descripcion);
       return descripcion;
    });
    des.then((res) => {
      this.servicio.descripcion = res;
    });

    var mod = this.databaseServicioService.getServicio(this.servicio.idServicio).then(
      function(snapshot) {
       var modalidad = (snapshot.val() && snapshot.val().modalidad);
       return modalidad;
    });
    mod.then((res) => {
      this.servicio.modalidad = res;
    });

    var nom = this.databaseServicioService.getServicio(this.servicio.idServicio).then(
      function(snapshot) {
       var nom = (snapshot.val() && snapshot.val().nombre);
       return nom;
    });
    nom.then((res) => {
      this.servicio.nombre = res;
    });

    var opd = this.databaseServicioService.getServicio(this.servicio.idServicio).then(
      function(snapshot) {
       var opd = (snapshot.val() && snapshot.val().opcion_duracion);
       return opd;
    });
    opd.then((res) => {
      this.servicio.opcion_duracion = res;
    });

    var pat = this.databaseServicioService.getServicio(this.servicio.idServicio).then(
      function(snapshot) {
       var pat = (snapshot.val() && snapshot.val().pathImagen);
       return pat;
    });
    pat.then((res) => {
      this.uploadService.downloadFile('servicios/'+res).subscribe(URL=>{
        this.servicio.idServicio = res;
        this.servicio.pathImagen = URL;
      });
    });

    var pre = this.databaseServicioService.getServicio(this.servicio.idServicio).then(
      function(snapshot) {
       var pre = (snapshot.val() && snapshot.val().precio);
       return pre;
    });
    pre.then((res) => {
      this.servicio.precio = res;
    });

    var pub = this.databaseServicioService.getServicio(this.servicio.idServicio).then(
      function(snapshot) {
       var pub = (snapshot.val() && snapshot.val().publicador);
       return pub;
    });
    pub.then((res) => {
      this.servicio.publicador = res;

      this.cargarUsuario();
    });

    var tdu = this.databaseServicioService.getServicio(this.servicio.idServicio).then(
      function(snapshot) {
       var tdu = (snapshot.val() && snapshot.val().tiempo_duracion);
       return tdu;
    });
    tdu.then((res) => {
      this.servicio.tiempo_duracion = res;
    });

    var tpa = this.databaseServicioService.getServicio(this.servicio.idServicio).then(
      function(snapshot) {
       var tpa = (snapshot.val() && snapshot.val().tipo_pago);
       return tpa;
    });
    tpa.then((res) => {
      var vec = [];
      for(let key in res){
        let value = res[key];
        this.uploadService.downloadFile('opciones/'+value.nombre).subscribe(URL=>{
          let pathImagen = URL;
          var obj:
          {id:string; nombre: string; pathImagen: string;} = {id:value.id, nombre: value.nombre, pathImagen: pathImagen};
          vec.push(obj);
        });
      }
      this.servicio.tipo_pago = vec;
    });

    var opi = this.databaseServicioService.getServicio(this.servicio.idServicio).then(
      function(snapshot) {
       var opi = (snapshot.val() && snapshot.val().opiniones);
       return opi;
    });
    opi.then((res) => {
      var vec = [];
      var prom = 0;
      for(let key in res){
        let value = res[key];

        var obj:
        { comentario: string; calificacion: number; nombreUsuario: string;}
        = { nombreUsuario: value.nombreUsuario, calificacion: value.calificacion,
           comentario: value.comentario};
        vec.push(obj);
        prom += value.calificacion;
        ++this.cant;

      }
      if(this.cant>0){
          prom = prom/this.cant;
          vec.push(prom);
      }

      this.calificacion = ( (vec[vec.length-1] * 100) / 5) + '%';
      this.servicio.opiniones = vec;
    });

    var zco = this.databaseServicioService.getServicio(this.servicio.idServicio).then(
      function(snapshot) {
       var zco = (snapshot.val() && snapshot.val().zona_cobertura);
       return zco;
    });
    zco.then((res) => {
      this.servicio.zona_cobertura = res;
    });
  }


  cargarUsuario(){

    this.authService.getAuth().subscribe(auth=>{
        if(auth){
          this.idUsuarioActual = auth.uid;
        }
      }
    );

    //this.usuario.idUsuario = this.servicio.publicador;

    var userId = this.databaseService.getUsuario(this.servicio.publicador).then(
      function(snapshot) {
       var res = (snapshot.val() && snapshot.val().idUsuario);
       return res;
    });
    userId.then((value: string) => {
      this.usuario.idUsuario = value;
    });


    var userDN = this.databaseService.getUsuario(this.servicio.publicador).then(
      function(snapshot) {
       var res = (snapshot.val() && snapshot.val().displayName);
       return res;
    });
    userDN.then((value: string) => {
      this.usuario.displayName = value;

      if(this.usuario.displayName!=null){
        let aux = this.usuario.displayName.split(" ");
        this.iniciales = aux[0].toUpperCase().charAt(0) + aux[1].toUpperCase().charAt(0);
      }
    });

    var userDoc = this.databaseService.getUsuario(this.servicio.publicador).then(
      function(snapshot) {
       var res = (snapshot.val() && snapshot.val().documento);
       return res;
    });
    userDoc.then((value: string) => {
      if(value!=null)
        this.usuario.documento = value;
    });

    var userDir = this.databaseService.getUsuario(this.servicio.publicador).then(
      function(snapshot) {
       var res = (snapshot.val() && snapshot.val().direccion);
       return res;
    });
    userDir.then((value: string) => {
      if(value!=null)
        this.usuario.direccion = value;
    });

    var userTel = this.databaseService.getUsuario(this.servicio.publicador).then(
      function(snapshot) {
       var res = (snapshot.val() && snapshot.val().telefono);
       return res;
    });
    userTel.then((value: string) => {
      if(value!=null)
        this.usuario.telefono = value;
    });

  }

  getBackground(image) {
   return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
  }

  onClickDisplayName(){
    console.log("Listener displayName");
  }

  onClickPurchase(){
    console.log("entra en compra");
    this.purchaseService.insertPurchaseDatabase(this.servicio.publicador,this.authService.afAuth.auth.currentUser.uid
    ,this.servicio.idServicio,this.servicio.precio);
  }

  onClickEditService(){
    this.selectedItems4 = [];
    this.selectedItems  = [];
    this.selectedItems2 = [];
    this.selectedItems3 = [];
    this.selectedItems5 = [];
    for(let i of this.servicio.tipo_pago){
      this.selectedItems4.push({ id: i.id, nombre: i.nombre });
    }
    for(let i of this.servicio.modalidad){

      this.selectedItems3.push({ id: i.id, nombre: i.nombre });
    }
    for(let i of this.servicio.zona_cobertura){
      this.selectedItems.push({ id: i.id, nombre: i.nombre });
    }
    this.selectedItems2.push({id:this.servicio.categoria.id,nombre:this.servicio.categoria.nombre});
    this.selectedItems5.push({id:this.servicio.opcion_duracion.id,nombre:this.servicio.opcion_duracion.nombre});

    this.optionsService.getCiudades().snapshotChanges().subscribe(item => {
    this.ciudades = [];

    item.forEach(element => {
    let x = element.payload.toJSON();
    x["$key"] = element.key;
     this.ciudades.push(x as Ciudad);});});

     this.optionsService.getCategorias().snapshotChanges().subscribe(item => {
     this.categorias = [];

     item.forEach(element => {
     let x = element.payload.toJSON();
     x["$key"] = element.key;
      this.categorias.push(x as Categoria);});});

      this.optionsService.getModalidad().snapshotChanges().subscribe(item => {
      this.modalidades = [];

      item.forEach(element => {
      let x = element.payload.toJSON();
      x["$key"] = element.key;
       this.modalidades.push(x as Modalidad);});});

       this.optionsService.getTipoPago().snapshotChanges().subscribe(item => {
       this.tipo_pago = [];

       item.forEach(element => {
       let x = element.payload.toJSON();
       x["$key"] = element.key;
        this.tipo_pago.push(x as TipoPago);});});

        this.optionsService.getOpcDuracion().snapshotChanges().subscribe(item => {
        this.opcion_duracion = [];

        item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
         this.opcion_duracion.push(x as OpcionDuracion);});});


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
        singleSelection: true,
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

    this.dropdownSettings5 = {
        singleSelection: true,
        idField: 'id',
        textField: 'nombre',
        selectAllText: 'Seleccionar todas',
        unSelectAllText: 'Deseleccionar todas',
        searchPlaceholderText: 'Buscar',
        itemsShowLimit: 10,
        allowSearchFilter: true
    };



  }
  onClickAceptarEditService(){

    this.servicio.zona_cobertura=this.selectedItems;
    this.servicio.tipo_pago=this.selectedItems4;
    this.servicio.modalidad=this.selectedItems3;
    //this.servicio.opcion_duracion=this.selectedItems5;
    //this.servicio.categoria=this.selectedItems2;
    for(let i of this.selectedItems2){
      var cat=new Categoria();
      cat.id=i.id;
      cat.nombre=i.nombre;
      this.servicio.categoria=cat;
    }
    for(let i of this.selectedItems5){
      var opc=new OpcionDuracion();
      opc.id=i.id;
      opc.nombre=i.nombre;
      this.servicio.opcion_duracion=opc;
    }
    this.databaseServicioService.updateServiceDatabase(this.servicio.publicador,this.servicio.categoria,this.servicio.nombre,
                          this.servicio.descripcion,this.servicio.tiempo_duracion,
                          this.servicio.opcion_duracion,this.servicio.precio,this.servicio.zona_cobertura,
                          this.servicio.modalidad,
                          this.servicio.direccion, this.servicio.tipo_pago,this.servicio.fecha,this.servicio.idServicio);
    this.category=this.servicio.categoria.nombre;
    this.cargarDatos();

  }
  onClickCategory(){
    console.log("Listener Category");
  }
  onClickCity(){
    console.log("Listener City");
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
  onItemSelect4(item:any){
      this.selectedItems4.push(item);
      //console.log(this.selectedItems);
  }
  OnItemDeSelect4(item:any){
    var newSelectedItems = this.selectedItems4.filter(function(element) {
    return element.nombre !== item.nombre;
    });
    this.selectedItems4 = newSelectedItems;
  }
  onItemSelect5(item:any){
      this.selectedItems5.push(item);
      //console.log(this.selectedItems);
  }
  OnItemDeSelect5(item:any){
    var newSelectedItems = this.selectedItems5.filter(function(element) {
    return element.nombre !== item.nombre;
    });
    this.selectedItems5 = newSelectedItems;
  }
  onSelectAll(items: any){
      //console.log(items);
  }
  onDeSelectAll(items: any){
      //console.log(items);
  }
  onClickDeleteService(){

    console.log("Listener deleteService");
    console.log(this.servicio.idServicio);
    this.databaseServicioService.deleteServiceDatabase(this.servicio.idServicio);
  }

  onSubmitSendMessageUser(){

    if(this.idUsuarioActual==null){
      this.flashMensaje.show("Debe iniciar sesión primero para poder contactarse con el vendedor",
      {cssClass: 'alert-danger', timeout: 4000});
    }
    else if(this.message!=""){
      let idOrigen = this.idUsuarioActual;
      let idDestino = this.usuario.idUsuario;

      this.chatService.insertMessageDatabase(idOrigen, idDestino, this.message);


      this.flashMensaje.show('Se ha enviado el mensaje correctamente',
      {cssClass: 'alert-success', timeout: 4000});
    }else{
      this.flashMensaje.show("Mensaje inválido",
      {cssClass: 'alert-danger', timeout: 4000});
    }

    this.message="";
  }

}
