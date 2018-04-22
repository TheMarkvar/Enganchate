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
  private pathCiudades:string;
  constructor(
    public afDatabase: AngularFireDatabase,
  ) {
      this.pathCiudades='ciudades';
  }
  getCiudades(){
    console.log("Entra a getCiudades");
    return this.listaCiudades = this.afDatabase.list(this.pathCiudades);
  }
}
