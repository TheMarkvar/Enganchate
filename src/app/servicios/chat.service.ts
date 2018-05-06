import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { Mensaje } from '../modelos/mensaje';

@Injectable()
export class ChatService {
  private pathMensajes:string;
  public mensaje:Mensaje;
  private listaMensajes: AngularFireList<Mensaje>;

  constructor(
    public afDatabase: AngularFireDatabase) {
    this.pathMensajes = 'mensajes';
  }

  insertMessageDatabase(idOrigen:string, idDestino:string, contenido:string){

    var idMensaje;
    this.getMensajes();
    this.mensaje = new Mensaje();
    this.mensaje.idOrigen = idOrigen;
    this.mensaje.idDestino = idDestino;
    this.mensaje.contenido = contenido;
    this.mensaje.fecha = new Date();
    //console.log(this.mensaje);

    idMensaje = this.listaMensajes.push(this.mensaje);
    this.getMensajes();
    this.listaMensajes.update(idMensaje.path.pieces_[1],this.mensaje);


  }

  getMensajes(){
    return this.listaMensajes = this.afDatabase.list(this.pathMensajes);
  }

  getMensaje(id:string){
    return  this.afDatabase.database.ref(this.pathMensajes+'/'+id).once('value');
  }

}
