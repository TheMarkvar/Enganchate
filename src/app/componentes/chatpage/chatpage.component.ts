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
  private destinoParametro = false;
  private status = "";
  private inicialesOrigen="";
  private inicialesDestinoParametro="";


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
    this.usuarioDestino = new Usuario();


    this.authService.getAuth().subscribe(auth=>{
        if(auth){
          this.usuarioOrigen.idUsuario = auth.uid;
          this.cargarUsuario(this.usuarioOrigen.idUsuario, this.usuarioOrigen, this.inicialesOrigen);
        }
      }
    );




  }


  cargarUsuario(id:string, usuarioParam:Usuario, iniciales:string){


    let usuario:Usuario = new Usuario();

    this.databaseService.getUsuarios().snapshotChanges().subscribe(item => {
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        let usuarioEncontrado:boolean = false;

        if(x["idUsuario"]===usuarioParam.idUsuario){
          usuarioEncontrado = true;
        }

        for(var key in x) {

          let value = x[key];


          if(usuarioEncontrado){
            if(key === "status"){
              usuario.status = value;
              this.status = value;
            }
            else if(key === "displayName"){
              usuario.displayName = value;
              if(usuario.displayName!=null){
                let aux = usuario.displayName.split(" ");
                iniciales = aux[0].toUpperCase().charAt(0) + aux[1].toUpperCase().charAt(0);
              }
            }
            else if(key === "documento"){
              usuario.documento = value;
            }
            else if(key === "direccion"){
              usuario.direccion = value;
            }
            else if(key === "telefono"){
              usuario.telefono = value;
            }
          }


        }
        if(usuarioEncontrado){
          usuarioParam.displayName = usuario.displayName;
          usuarioParam.documento = usuario.documento;
          usuarioParam.telefono = usuario.telefono;
          usuarioParam.direccion = usuario.direccion;
          usuarioParam.status = usuario.status;


          //console.log(usuarioParam);
        }

      }
    )});




  }

}
