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
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.scss']
})
export class ChatpageComponent implements OnInit {
  private usuarioOrigen:Usuario;
  private usuarioDestino:Usuario;
  private usuarioDestinoParametro:Usuario;
  private destinoParametro = false;


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

  ngOnInit() {

    this.usuarioOrigen = new Usuario();
    this.usuarioDestinoParametro = new Usuario();
    this.usuarioOrigen = new Usuario();

    this.activatedRoute.queryParams
      .filter(params => params.destination)
      .subscribe(params => {
        this.usuarioDestinoParametro.idUsuario = params.destination;
        this.destinoParametro = true;
      });

    this.authService.getAuth().subscribe(auth=>{
        if(auth){
          this.usuarioOrigen.idUsuario = auth.uid;
          this.cargarUsuario(this.usuarioOrigen.idUsuario, this.usuarioOrigen);
        }
      }
    );
    if(this.destinoParametro){
        this.cargarUsuario(this.usuarioDestinoParametro.idUsuario, this.usuarioDestinoParametro);
    }



  }


  cargarUsuario(id:string, usuario:Usuario){

    var userDN = this.databaseService.getUsuario(id).then(
      function(snapshot) {
       var res = (snapshot.val() && snapshot.val().displayName);
       return res;
    });
    userDN.then((value: string) => {
      usuario.displayName = value;

      /*if(usuario.displayName!=null){
        let aux = this.usuario.displayName.split(" ");
        this.iniciales = aux[0].toUpperCase().charAt(0) + aux[1].toUpperCase().charAt(0);
      }*/
    });

    var userDoc = this.databaseService.getUsuario(id).then(
      function(snapshot) {
       var res = (snapshot.val() && snapshot.val().documento);
       return res;
    });
    userDoc.then((value: string) => {
      if(value!=null)
        usuario.documento = value;
    });

    var userDir = this.databaseService.getUsuario(id).then(
      function(snapshot) {
       var res = (snapshot.val() && snapshot.val().direccion);
       return res;
    });
    userDir.then((value: string) => {
      if(value!=null)
        usuario.direccion = value;
    });

    var userTel = this.databaseService.getUsuario(id).then(
      function(snapshot) {
       var res = (snapshot.val() && snapshot.val().telefono);
       return res;
    });
    userTel.then((value: string) => {
      if(value!=null)
        usuario.telefono = value;
    });
    console.log(usuario);

  }

}
