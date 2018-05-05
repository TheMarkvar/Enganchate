import { Component, OnInit } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';

import { AuthService } from '../../servicios/auth.service';
import { DatabaseService } from '../../servicios/database.service';
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
    private uploadService:UploadService,
    public flashMensaje: FlashMessagesService,
    public router:Router,
    private _sanitizer: DomSanitizer
  ) { }

  private servicio:Servicio;
  private usuario:Usuario;


  private iniciales = "";
  private file:File=null;
  private nombreArchivo:string;
  private fotoInicial:boolean = false;
  private cargarFoto:boolean = false;
  private calificacion = '0';
  private idUsuarioActual:string;
  private cant = 0;

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
    var cat = this.databaseServicioService.getServicio(this.servicio.idServicio).then(
      function(snapshot) {
       var categoria = (snapshot.val() && snapshot.val().categoria);
       return categoria;
    });
    cat.then((res) => {
      this.servicio.categoria = res;
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

        this.uploadService.downloadFile('opciones/'+value).subscribe(URL=>{
          let pathImagen = URL;
          var obj:
          { nombre: string; pathImagen: string;} = { nombre: value, pathImagen: pathImagen};
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

  onClickContact(){
    this.router.navigate(['/chat'], { queryParams: { destination: this.usuario.idUsuario } });
  }

  onClickPurchase(){
    console.log("Listener purchase");
  }

  onClickEditService(){
    console.log("Listener editService");
  }

  onClickDeleteService(){
    console.log("Listener deleteService");
  }

}
