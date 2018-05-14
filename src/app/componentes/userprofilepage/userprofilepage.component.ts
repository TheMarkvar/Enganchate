import { Component, OnInit } from '@angular/core';

import { FlashMessagesService} from 'angular2-flash-messages';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';

import { AuthService } from '../../servicios/auth.service';
import { DatabaseService } from '../../servicios/database.service';
import { ChatService } from '../../servicios/chat.service';
import { UploadService } from '../../servicios/upload.service';
import { OptionsService } from '../../servicios/options.service';
import { Usuario } from  '../../modelos/usuario';

@Component({
  selector: 'app-userprofilepage',
  templateUrl: './userprofilepage.component.html',
  styleUrls: ['./userprofilepage.component.scss']
})
export class UserprofilepageComponent implements OnInit {

  private usuarioParam:Usuario;
  private idUsuarioParam:string;
  private iniciales = "";

  constructor(private activatedRoute: ActivatedRoute,
  private optionsService:OptionsService,
  public authService: AuthService,
  public databaseService: DatabaseService,
  private uploadService:UploadService,
  public chatService: ChatService) { }

  ngOnInit() {
    this.usuarioParam = new Usuario();
    this.activatedRoute.queryParams
      .filter(params => params.search)
      .subscribe(params => {
        this.idUsuarioParam = params.search;
        console.log(this.idUsuarioParam);
        this.cargarUsuario(this.idUsuarioParam, this.usuarioParam, this.iniciales);
      });

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
            }else if(key === "tieneImagen"){
              usuario.tieneImagen = value;
            }
            else if(key === "URLImagenExterna"){
              usuario.URLImagenExterna = value;
            }
          }


        }
        if(usuarioEncontrado){
          usuarioParam.displayName = usuario.displayName;
          usuarioParam.email = usuario.email;
          usuarioParam.edad = usuario.edad;
          usuarioParam.telefono = usuario.telefono;
          usuarioParam.status = usuario.status;

          if(usuario.tieneImagen){
            this.uploadService.downloadFile('usuarios/'+id).subscribe(URL=>{
              usuario.direccion = URL;
              //console.log(URL);
            });
          }else if(usuario.URLImagenExterna){
            usuario.direccion = usuario.URLImagenExterna;
            //console.log(usuario.direccion);
          }
          console.log(usuarioParam);
        }

      }
    )});

  }

  sendMessage(){
    console.log("sendMessage");
  }

}
