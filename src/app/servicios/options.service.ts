import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { Usuario } from '../modelos/usuario';
import { Servicio } from '../modelos/servicio';
import { Ciudad } from '../modelos/ciudad';

@Injectable()
export class OptionsService {
  private listaCiudades:AngularFireList<any>;
  private listaCategorias:AngularFireList<any>;
  private listaOpcDuracion:AngularFireList<any>;
  private listaModalidad:AngularFireList<any>;
  private listaTipoPago:AngularFireList<any>;
  private pathCiudades:string;
  private pathCategorias:string;
  private pathOpcDuracion:string;
  private pathModalidad:string;
  private pathTipoPago:string;

  constructor(
    public afDatabase: AngularFireDatabase,
  ) {
      this.pathCiudades='ciudades';
      this.pathCategorias='categorias';
      this.pathOpcDuracion='opcionesDuracionServicio';
      this.pathTipoPago='tiposPago';
      this.pathModalidad='modalidadesServicio';
  }
  getCiudades(){
    //console.log("Entra a getCiudades");
    this.listaCiudades = this.afDatabase.list(this.pathCiudades);
    return this.listaCiudades;
  }
  getCategorias(){
    this.listaCategorias = this.afDatabase.list(this.pathCategorias);
    return this.listaCategorias;
  }
  getOpcDuracion(){
    this.listaOpcDuracion = this.afDatabase.list(this.pathOpcDuracion);
    return this.listaOpcDuracion;
  }
  getTipoPago(){
    this.listaTipoPago = this.afDatabase.list(this.pathTipoPago);
    return this.listaTipoPago;
  }
  getModalidad(){
    this.listaModalidad = this.afDatabase.list(this.pathModalidad);
    return this.listaModalidad;
  }
}
