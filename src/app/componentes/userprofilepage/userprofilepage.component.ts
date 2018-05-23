import { Component, OnInit } from '@angular/core';

import { FlashMessagesService} from 'angular2-flash-messages';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';

import { AuthService } from '../../servicios/auth.service';
import { DatabaseService } from '../../servicios/database.service';
import { DatabaseServicioService } from '../../servicios/database-servicio.service';
import { ChatService } from '../../servicios/chat.service';
import { UploadService } from '../../servicios/upload.service';


import { Usuario } from  '../../modelos/usuario';
import { Servicio } from  '../../modelos/servicio';
import { Ciudad } from '../../modelos/ciudad';
import { TipoPago } from '../../modelos/tipo-pago';

@Component({
  selector: 'app-userprofilepage',
  templateUrl: './userprofilepage.component.html',
  styleUrls: ['./userprofilepage.component.scss']
})
export class UserprofilepageComponent implements OnInit {

  private iniciales = "";
  private usuarioActual:Usuario;
  private usuarioParam:Usuario;
  private urlPortadaActual:string;
  private urlPortadaParam:string;
  private urlIconoMensaje:string;
  private message:string;
  private serviciosContratados:boolean=true;
  private serviciosPublicados:boolean=false;
  private acercaDe:boolean=false;

  private resultadoCiudades:string;
  private resultadoTipoPago:string;

  private listaServiciosContratadosParam = [];
  private listaServiciosPublicadosParam = [];
  private listaServiciosContratadosActual = [];
  private listaServiciosPublicadosActual = [];

  constructor(private activatedRoute: ActivatedRoute,
  public authService: AuthService,
  public databaseService: DatabaseService,
  private databaseServicioService:DatabaseServicioService,
  private uploadService:UploadService,
  public flashMensaje: FlashMessagesService,
  public chatService: ChatService,
  public router:Router,
  private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.usuarioActual = new Usuario();
    this.usuarioParam = new Usuario();

    this.authService.getAuth().subscribe(auth=>{
        if(auth){
          this.cargarUsuario(auth.uid, this.usuarioActual, this.iniciales);
          this.serviciosPublicadosActual();
        }
      }
    );

    this.activatedRoute.queryParams
      .filter(params => params.search)
      .subscribe(params => {
        let idUsuarioParam:string = params.search;
        this.cargarUsuario(idUsuarioParam, this.usuarioParam, this.iniciales);
        this.serviciosPublicadosParam();
      });

      this.uploadService.downloadFile('opciones/otros/mensaje').subscribe(URL=>{
        this.urlIconoMensaje = URL;
      });

      //this.listaServiciosContratadosActual.push(2);
      //this.listaServiciosContratadosParam.push(3);







  }

  cargarUsuario(id:string, usuarioParam:Usuario, iniciales:string){
    let usuario:Usuario = new Usuario();

    this.databaseService.getUsuarios().snapshotChanges().subscribe(item => {
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        let usuarioEncontrado:boolean = false;

        if(x["idUsuario"]===id){
          usuarioEncontrado = true;
        }

        for(var key in x) {

          let value = x[key];
          if(usuarioEncontrado){
            if(key === "displayName"){
              usuario.displayName = value;
              if(usuario.displayName!=null){
                let aux = usuario.displayName.split(" ");
                iniciales = aux[0].toUpperCase().charAt(0) + aux[1].toUpperCase().charAt(0);
              }
            }
            else if(key === "idUsuario"){
              usuario.idUsuario = value;
            }
            else if(key === "descripcion"){
              usuario.descripcion = value;
            }
            else if(key === "email"){
              usuario.email = value;
            }
            else if(key === "edad"){
              usuario.edad = value;
            }
            else if(key === "telefono"){
              usuario.telefono = value;
            }
            else if(key === "tieneImagen"){
              usuario.tieneImagen = value;
            }
            else if(key === "status"){
              usuario.status = value;
            }
            else if(key === "URLImagenExterna"){
              usuario.URLImagenExterna = value;
            }
            else if(key === "tieneImagenPortada"){
              usuario.tieneImagenPortada = value;
            }
          }


        }
        if(usuarioEncontrado){
          usuarioParam.idUsuario = usuario.idUsuario;
          usuarioParam.displayName = usuario.displayName;
          usuarioParam.email = usuario.email;
          usuarioParam.edad = usuario.edad;
          usuarioParam.descripcion = usuario.descripcion;
          usuarioParam.telefono = usuario.telefono;
          usuarioParam.status = usuario.status;

          if(usuario.tieneImagen){
            this.uploadService.downloadFile('usuarios/'+id).subscribe(URL=>{
              usuarioParam.URLImagen = URL;
            });
          }else if(usuario.URLImagenExterna){
            usuarioParam.URLImagen = usuario.URLImagenExterna;
          }

          if(usuario.tieneImagenPortada){
            this.uploadService.downloadFile('usuarios/BACKGROUND_'+id).subscribe(URL=>{
              usuarioParam.URLImagenPortada = URL;
            });
          }


        }

      }
    )});

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
  serviciosPublicadosActual(){
    this.databaseServicioService.getServicios().snapshotChanges().subscribe(item => {
    this.listaServiciosPublicadosActual = [];

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
          }
          servicioFiltro.zona_cobertura = value2;
        }
        if(key === "modalidad"){
          let value2 = [];
          for (let key2 in value) {
              value2.push(value[key2]);
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
        }
        else if(key === "categoria"){
          servicioFiltro.categoria = value;
        }
        else if(key === "descripcion"){
          servicioFiltro.descripcion = value;
        }
        else if(key === "precio"){
          servicioFiltro.precio = value;
        }
        else if(key === "publicador"){
          servicioFiltro.publicador = value;

          if(value === this.usuarioActual.idUsuario){
              servicioValido = true;
          }

        }
        else if(key=="pathImagen"){
          this.uploadService.downloadFile('servicios/'+value).subscribe(URL=>{
            servicioFiltro.idServicio = value;
            servicioFiltro.pathImagen = URL;
          });
        }

    }
    if(servicioValido){
        this.listaServiciosPublicadosActual.push(servicioFiltro);
    }


   ;});

    });
  }

  serviciosPublicadosParam(){
    this.databaseServicioService.getServicios().snapshotChanges().subscribe(item => {
    this.listaServiciosPublicadosParam= [];

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
          }
          servicioFiltro.zona_cobertura = value2;
        }
        if(key === "modalidad"){
          let value2 = [];
          for (let key2 in value) {
              value2.push(value[key2]);
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
        }
        else if(key === "categoria"){
          servicioFiltro.categoria = value;
        }
        else if(key === "descripcion"){
          servicioFiltro.descripcion = value;
        }
        else if(key === "precio"){
          servicioFiltro.precio = value;
        }
        else if(key === "publicador"){
          servicioFiltro.publicador = value;

          if(value === this.usuarioParam.idUsuario){
              servicioValido = true;
          }

        }
        else if(key=="pathImagen"){
          this.uploadService.downloadFile('servicios/'+value).subscribe(URL=>{
            servicioFiltro.idServicio = value;
            servicioFiltro.pathImagen = URL;
          });
        }

    }
    if(servicioValido){
        this.listaServiciosPublicadosParam.push(servicioFiltro);
        //console.log(servicioFiltro);
    }


   ;});

    });
  }


  onSubmitSendMessageUser(){

    if(this.usuarioActual.idUsuario==null){
      this.flashMensaje.show("Debe iniciar sesión primero para poder contactarse con el vendedor",
      {cssClass: 'alert-danger', timeout: 4000});
    }
    else if(this.message!=""){
      let idOrigen = this.usuarioActual.idUsuario;
      let idDestino = this.usuarioParam.idUsuario;

      this.chatService.insertMessageDatabase(idOrigen, idDestino, this.message);


      this.flashMensaje.show('Se ha enviado el mensaje correctamente',
      {cssClass: 'alert-success', timeout: 4000});
    }else{
      this.flashMensaje.show("Mensaje inválido",
      {cssClass: 'alert-danger', timeout: 4000});
    }

    this.message="";
  }

  onClickService(idService){
    this.router.navigate(['/service'], { queryParams: { search: idService } });
  }

  getBackground(image) {
   return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
  }

  serviciosContratadosTab(){
    this.serviciosContratados = true;
    this.serviciosPublicados = false;
    this.acercaDe = false;
  }

  serviciosPublicadosTab(){
    this.serviciosContratados = false;
    this.serviciosPublicados = true;
    this.acercaDe = false;
  }

  acercaDeTab(){
    this.serviciosContratados = false;
    this.serviciosPublicados = false;
    this.acercaDe = true;
  }

}
