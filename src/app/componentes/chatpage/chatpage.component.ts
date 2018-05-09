import { Component, OnInit } from '@angular/core';
import { PipeContactosPipe } from '../../pipes/pipe-contactos.pipe';

import { FlashMessagesService} from 'angular2-flash-messages';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';

import { AuthService } from '../../servicios/auth.service';
import { DatabaseService } from '../../servicios/database.service';
import { DatabaseServicioService } from '../../servicios/database-servicio.service';
import { OptionsService } from '../../servicios/options.service';
import { UploadService } from '../../servicios/upload.service';
import { ChatService } from '../../servicios/chat.service';
import { Servicio } from  '../../modelos/servicio';
import { Usuario } from  '../../modelos/usuario';
import { Ciudad } from  '../../modelos/ciudad';
import { Categoria } from  '../../modelos/categoria';
import { OpcionDuracion } from  '../../modelos/opcion-duracion';
import { TipoPago } from  '../../modelos/tipo-pago';
import { Observable } from 'rxjs/Observable';
import { Modalidad } from '../../modelos/modalidad';
import { Mensaje } from '../../modelos/mensaje';



@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.scss']
})
export class ChatpageComponent implements OnInit {
  private usuarioActual:Usuario;
  private usuarioDestino:Usuario;
  private destinoParametro = false;
  private status = "";
  private inicialesOrigen="";
  private inicialesDestinoParametro="";
  private nuevoMensaje = "";
  private buscarContacto="";

  private mapaContactos;
  private listaMensajesTotalesUsuarioActual = [];
  private listaMensajesOrigenDestino = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private optionsService:OptionsService,
    public authService: AuthService,
    private databaseServicioService:DatabaseServicioService,
    public databaseService: DatabaseService,
    private uploadService:UploadService,
    public chatService: ChatService,
    public flashMensaje: FlashMessagesService,
    public router:Router,
    private _sanitizer: DomSanitizer
  ) { }


  ngOnInit() {

    //console.log(this.listaBasura);


    this.usuarioActual = new Usuario();
    this.usuarioDestino = new Usuario();
    this.mapaContactos = new Map();


    this.authService.getAuth().subscribe(auth=>{
        if(auth){
          this.usuarioActual.idUsuario = auth.uid;
          this.cargarUsuario(this.usuarioActual.idUsuario, this.usuarioActual, this.inicialesOrigen);
          this.cargarMensajes(this.usuarioActual.idUsuario);
        }
      }
    );




  }

  cargarMensajes(idUsuario:string){

      this.chatService.getMensajes().snapshotChanges().subscribe(item=>{
        this.listaMensajesTotalesUsuarioActual = [];
        item.forEach(element=>{
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          let mensajeAux:Mensaje = new Mensaje();
          let usuarioEncontrado:boolean = false;


          if(x["idOrigen"]===idUsuario || x["idDestino"]===idUsuario){
            usuarioEncontrado = true;
          }

          for(var key in x){
            var value = x[key];

            if(key === "idOrigen"){
              mensajeAux.idOrigen = value;
            }
            else if(key === "idDestino"){
              mensajeAux.idDestino = value;
            }
            else if(key === "contenido"){
              mensajeAux.contenido = value;
            }
            else if(key === "fecha"){
              mensajeAux.fecha = value;
            }
            else if(key === "idmensaje"){
              mensajeAux.idmensaje = value;
            }
          }
          if(usuarioEncontrado){

              this.listaMensajesTotalesUsuarioActual.push(mensajeAux);
          }


        });

        for(let x in this.listaMensajesTotalesUsuarioActual){
          if(idUsuario===this.listaMensajesTotalesUsuarioActual[x].idDestino){
            this.cargarContactos(this.listaMensajesTotalesUsuarioActual[x].idOrigen);
          }
          else if(idUsuario===this.listaMensajesTotalesUsuarioActual[x].idOrigen){
            this.cargarContactos(this.listaMensajesTotalesUsuarioActual[x].idDestino);
          }
        }

        if(this.usuarioDestino.idUsuario!=null){
          this.getMensajes(this.usuarioDestino);
        }

      });

  }

  getKeys(map){
     return Array.from(map.keys());
  }

  getValues(map){
     return Array.from(map.values());
  }

  cargarContactos(idUsuario:string){

    this.databaseService.getUsuarios().snapshotChanges().subscribe(item => {

      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;

        let usuarioAux:Usuario = new Usuario();
        let usuarioEncontrado:boolean = false;

        if(x["idUsuario"]===idUsuario){
          usuarioEncontrado = true;
        }

        for(var key in x) {
          let value = x[key];
          if(key === "idUsuario"){
            usuarioAux.idUsuario = value;
          }
          else if(key === "status"){
            usuarioAux.status = value;
          }
          else if(key === "displayName"){
            usuarioAux.displayName = value;
            let aux = value.split(" ");
            usuarioAux.iniciales = aux[0].toUpperCase().charAt(0) + aux[1].toUpperCase().charAt(0);
          }
          else if(key === "tieneImagen"){
            usuarioAux.tieneImagen = value;
          }
          else if(key === "URLImagenExterna"){
            usuarioAux.URLImagenExterna = value;
          }
        }
        if(usuarioEncontrado){
          let tieneDireccion:boolean=false;

          if(!this.mapaContactos.has(usuarioAux.idUsuario)&&usuarioAux.tieneImagen){
            //console.log(usuarioAux);
            //console.log("1111"+ usuarioAux.displayName);
            this.uploadService.downloadFile('usuarios/'+usuarioAux.idUsuario).subscribe(URL=>{
              usuarioAux.direccion = URL;

              if(this.mapaContactos.has(usuarioAux.idUsuario)){
                this.mapaContactos.delete(usuarioAux.idUsuario);

                //console.log("Usuario:  " + usuarioAux.displayName);
                this.mapaContactos.set(usuarioAux.idUsuario,usuarioAux);
                //console.log(this.mapaContactos);
              }

            });
          }else if(this.mapaContactos.has(usuarioAux.idUsuario)&&usuarioAux.tieneImagen){
            //console.log(this.mapaContactos.get(usuarioAux.idUsuario).displayName
            //+"---"+this.mapaContactos.get(usuarioAux.idUsuario).direccion);
            tieneDireccion = true;
            //console.log("2222" + usuarioAux.displayName);
            usuarioAux.direccion = this.mapaContactos.get(usuarioAux.idUsuario).direccion;
          }else if(!usuarioAux.tieneImagen && usuarioAux.URLImagenExterna){
            usuarioAux.direccion = usuarioAux.URLImagenExterna;
            //console.log("33333"+ usuarioAux.displayName);
          }
          //console.log(usuarioAux);
          this.mapaContactos.set(usuarioAux.idUsuario,usuarioAux);

        }
      });

    });

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
            else if(key === "tieneImagen"){
              usuario.tieneImagen = value;
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

  getMensajes(usuarioParaVerChat:Usuario){
    //console.log(usuarioParaVerChat);
    this.usuarioDestino = usuarioParaVerChat;
    //console.log(this.usuarioDestino);

    this.listaMensajesOrigenDestino = [];
    for(let x in this.listaMensajesTotalesUsuarioActual){
      let contenido, idOrigen, idDesitno, nombreOrigen, idDestino, nombreDestino,
      tieneImagen, URLImagenDestino, fechaMensaje, horaMensaje, status;
      let mensajeCompleto:{ contenido: string, idOrigen:string, nombreOrigen:string,
        idDestino:string, nombreDestino:string, tieneImagen:boolean,
        URLImagenDestino:string, fechaMensaje:string, horaMensaje:string, status:boolean};

      if(usuarioParaVerChat.idUsuario===this.listaMensajesTotalesUsuarioActual[x].idDestino
        && this.usuarioActual.idUsuario===this.listaMensajesTotalesUsuarioActual[x].idOrigen){
        //this.listaMensajesOrigenDestino.push(this.listaMensajesTotalesUsuarioActual[x]);
        contenido = this.listaMensajesTotalesUsuarioActual[x].contenido;
        idOrigen = this.usuarioActual.idUsuario;
        nombreOrigen = this.usuarioActual.displayName;
        idDestino = this.listaMensajesTotalesUsuarioActual[x].idDestino;
        nombreDestino = usuarioParaVerChat.displayName;
        tieneImagen = usuarioParaVerChat.tieneImagen;
        status = usuarioParaVerChat.status;
        if(tieneImagen){
          URLImagenDestino = usuarioParaVerChat.direccion;
        }
        fechaMensaje = this.formatoFecha(new Date(this.listaMensajesTotalesUsuarioActual[x].fecha));
        horaMensaje = this.formatoHora(new Date(this.listaMensajesTotalesUsuarioActual[x].fecha));
        mensajeCompleto = {contenido:contenido, idOrigen:idOrigen, nombreOrigen:nombreOrigen,
        idDestino:idDestino, nombreDestino:nombreDestino, tieneImagen:tieneImagen,
        URLImagenDestino:URLImagenDestino, fechaMensaje:fechaMensaje, horaMensaje:horaMensaje, status:status};
        this.listaMensajesOrigenDestino.push(mensajeCompleto);
      }
      else if(usuarioParaVerChat.idUsuario===this.listaMensajesTotalesUsuarioActual[x].idOrigen
       && this.usuarioActual.idUsuario===this.listaMensajesTotalesUsuarioActual[x].idDestino){
        contenido = this.listaMensajesTotalesUsuarioActual[x].contenido;
        idOrigen = usuarioParaVerChat.idUsuario;
        nombreOrigen = usuarioParaVerChat.displayName;
        idDestino = this.usuarioActual.idUsuario;
        nombreDestino = this.usuarioActual.displayName;
        tieneImagen = usuarioParaVerChat.tieneImagen;
        status = usuarioParaVerChat.status;
        if(tieneImagen){
          URLImagenDestino = usuarioParaVerChat.direccion;
        }
        fechaMensaje = this.formatoFecha(new Date(this.listaMensajesTotalesUsuarioActual[x].fecha));
        horaMensaje = this.formatoHora(new Date(this.listaMensajesTotalesUsuarioActual[x].fecha));
        mensajeCompleto = {contenido:contenido, idOrigen:idOrigen, nombreOrigen:nombreOrigen,
        idDestino:idDestino, nombreDestino:nombreDestino, tieneImagen:tieneImagen,
        URLImagenDestino:URLImagenDestino, fechaMensaje:fechaMensaje, horaMensaje:horaMensaje, status:status,};
        this.listaMensajesOrigenDestino.push(mensajeCompleto);
      }
    }
    //console.log(this.listaMensajesOrigenDestino);


  }

  compararPosicionEnChat(id:string){
    if(id==this.usuarioActual.idUsuario){
      return true;
    }
    return false;
  }

  formatoFecha(date:Date){

    let format="";
    let today:Date = new Date();
    let dif = Math.abs( (+today) - (+date) );


    let YY:string = date.getFullYear().toString();
    let MM:string = (date.getMonth()+1).toString();
    let DD:string = date.getDate().toString();
    let mm = date.getMinutes();


    let secs = dif / 1000;
    let mins = secs / 60;
    let hours = mins / 60;
    let days = hours/ 24;
    let weeks = days / 7;
    let months = days/30;

    if(Number(DD)<10){
      DD = "0"+DD;
    }

    if(Number(MM)<10){
      MM = "0"+MM;
    }

    if(Number(months.toFixed(0))==1){
      format = "Hace 1 mes";
    }
    else if(Number(months.toFixed(0))>0){
      format = "Hace " + months.toFixed(0) + " meses, "+DD+"/"+MM+"/"+YY;
    }
    else if(Number(weeks.toFixed(0))==1){
      format = "Hace 1 semana";
    }
    else if(Number(weeks.toFixed(0))>0){
      format = "Hace " + weeks.toFixed(0) + " semanas, "+DD+"/"+MM+"/"+YY;
    }
    else if(Number(days.toFixed(0))==1){
      format = "Hace 1 día";
    }
    else if(Number(days.toFixed(0))>0){
      format = "Hace " + days.toFixed(0) + " dias, "+DD+"/"+MM+"/"+YY;
    }
    else if(Number(hours.toFixed(0))==1){
      format = "Hace 1 hora";
    }
    else if(Number(hours.toFixed(0))>0){
      format = "Hace " + hours.toFixed(0) + " horas";
    }
    else if(Number(mins.toFixed(0))==1){
      format = "Hace 1 minuto";
    }
    else if(Number(mins.toFixed(0))>0){
      format = "Hace " + mins.toFixed(0) + " minutos";
    }
    else if(Number(secs.toFixed(0))==0){
      format = "Hace 1 segundo";
    }
    else if(Number(secs.toFixed(0))<60 && Number(secs.toFixed(0))>0){
      format = "Hace " + secs.toFixed(0) + " segundos";
    }



    return format;
  }

  formatoHora(date:Date){
    let horas, minutos, horario;
    horas = date.getHours();
    minutos =  date.getMinutes();
    if(horas >= 12 && horas <= 23){
      horas = horas-12;

      horario = " P.M.";
    }else{
      horario = "A.M."
    }

    if(horas < 10)
      horas = "0"+horas;

    if(minutos <10)
      minutos = "0"+minutos;


    return horas+":"+minutos+""+horario;
  }

  enviarMensaje(){
    if(this.usuarioActual.idUsuario && this.usuarioDestino.idUsuario){
      if(this.nuevoMensaje!=""){
        this.chatService.insertMessageDatabase(this.usuarioActual.idUsuario,
          this.usuarioDestino.idUsuario, this.nuevoMensaje);

      }
    }
    this.nuevoMensaje="";
  }

  userProfile(usuarioDestino:Usuario){
    console.log(usuarioDestino);
  }

  cancelarChat(){
      this.usuarioDestino = new Usuario();
      this.listaMensajesOrigenDestino = [];
  }



}
