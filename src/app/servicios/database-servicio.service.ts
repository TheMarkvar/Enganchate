import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { Usuario } from '../modelos/usuario';
import { Servicio } from '../modelos/servicio';

@Injectable()
export class DatabaseServicioService {

  private pathServicios:string;
  public servicio:Servicio;
  private listaServicios: AngularFireList<Servicio>;

  constructor(public afDatabase: AngularFireDatabase) {
    this.pathServicios = 'servicios';
  }
  insertServiceDatabase(publicador:string,categoria:string,nombre:string,descripcion:string,tiempo_duracion:number,
                        opcion_duracion:string,precio:number,zona_cobertura:Array<string>,modalidad:string,
                        tipo_pago:Array<string>,fecha:Date){

    this.getServicios();
    this.servicio=new Servicio();

    this.servicio.publicador=publicador;
    this.servicio.categoria=categoria;
    this.servicio.nombre=nombre;
    this.servicio.descripcion=descripcion;
    this.servicio.tiempo_duracion=tiempo_duracion;
    this.servicio.opcion_duracion=opcion_duracion;
    this.servicio.precio=precio;
    this.servicio.zona_cobertura=zona_cobertura;
    this.servicio.modalidad=modalidad;
    this.servicio.tipo_pago=tipo_pago;
    this.servicio.fecha=fecha.toString();
    this.listaServicios.push(this.servicio);


  }
  getServicios(){
    return this.listaServicios = this.afDatabase.list(this.pathServicios);
  }
}