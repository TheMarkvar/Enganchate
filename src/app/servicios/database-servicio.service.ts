import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { Usuario } from '../modelos/usuario';
import { Servicio } from '../modelos/servicio';
import { Ciudad } from '../modelos/ciudad';
import { Modalidad } from '../modelos/modalidad';
import { TipoPago } from '../modelos/tipo-pago';
import { Categoria } from '../modelos/categoria';
import { OpcionDuracion } from '../modelos/opcion-duracion';

@Injectable()
export class DatabaseServicioService {

  private pathServicios:string;
  public servicio:Servicio;
  public servicio2:Servicio;
  private listaServicios: AngularFireList<Servicio>;

  constructor(public afDatabase: AngularFireDatabase) {
    this.pathServicios = 'servicios';
  }
  insertServiceDatabase(publicador:string,categoria:string,nombre:string,descripcion:string,tiempo_duracion:number,
                        opcion_duracion:string,precio:number,zona_cobertura:Array<string>,modalidad:Array<string>,
                        direccion:string, tipo_pago:Array<string>,fecha:Date){

    var variable;
    this.getServicios();
    this.servicio=new Servicio();
    this.servicio.publicador=publicador;
    //this.servicio.categoria=categoria;
    this.servicio.nombre=nombre;
    this.servicio.descripcion=descripcion;
    this.servicio.tiempo_duracion=tiempo_duracion;
    //this.servicio.opcion_duracion=opcion_duracion;
    this.servicio.precio=precio;
    this.servicio.zona_cobertura=zona_cobertura;
    this.servicio.modalidad=modalidad;
    this.servicio.tipo_pago=tipo_pago;
    this.servicio.direccion=direccion;
    this.servicio.fecha=fecha.toString();
    variable=this.listaServicios.push(this.servicio);
    this.servicio.pathImagen=variable.path.pieces_[1];
    this.getServicios();
    this.listaServicios.update(variable.path.pieces_[1],this.servicio);
    return variable.path.pieces_[1];

  }
  updateServiceDatabase(publicador:string,categoria:Categoria,nombre:string,descripcion:string,tiempo_duracion:number,
                        opcion_duracion:OpcionDuracion,precio:number,zona_cobertura:Array<Ciudad>,modalidad:Array<Modalidad>,
                        direccion:string, tipo_pago:Array<TipoPago>,fecha:string, idServicio:string){

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
    this.servicio.direccion=direccion;
    this.servicio.fecha=fecha;
    this.servicio.idServicio=idServicio;
    this.servicio.pathImagen=idServicio;
    this.listaServicios.update(idServicio,this.servicio);
    console.log("lista la actualizacion");
    console.log("idServicio");
    console.log(this.servicio.idServicio);
  }
  deleteServiceDatabase(idServicio:string){
    this.getServicios();
    this.listaServicios.remove(idServicio);
  }
  getServicios(){
    return this.listaServicios = this.afDatabase.list(this.pathServicios);
  }
  getServicio(id:string){
    return  this.afDatabase.database.ref(this.pathServicios+'/'+id).once('value');
  }


}
