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
                        opcion_duracion:string,precio:number,zona_cobertura:Array<string>,modalidad:Array<string>,
                        tipo_pago:Array<string>,fecha:Date){

    var variable;
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
    variable=this.listaServicios.push(this.servicio);
    //this.servicio.$id = variable;
    //this.listaServicios.update(variable,this.servicio);
    return variable.path.pieces_[1];
    //console.log(a);

  }
  getServicios(){
    return this.listaServicios = this.afDatabase.list(this.pathServicios);
  }
}
