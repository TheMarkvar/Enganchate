import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { Usuario } from '../modelos/usuario';


@Injectable()
export class DatabaseService {

  private usuarioNuevo:Usuario;
  private listaUsuarios: AngularFireList<Usuario>;
  private database;
  private path:string;

  constructor(
    public afDatabase: AngularFireDatabase,
  ) {
      this.path = 'usuarios';
  }

  insertUserDatabase(id:string, email:string, displayName:string, edad:number){
    if(this.verificarUsuarioEnBaseDeDatos(id)){
      this.getUsuarios();

      this.usuarioNuevo = new Usuario();
      this.usuarioNuevo.email = email;
      this.usuarioNuevo.displayName = displayName;
      this.usuarioNuevo.edad = edad;

      this.afDatabase.database.ref(this.path+'/'+id).set(this.usuarioNuevo);
    }
  }

  insertUserDatabaseLogin(id:string, email:string, displayName:string){
    if(this.verificarUsuarioEnBaseDeDatos(id)){
      this.getUsuarios();

      this.usuarioNuevo = new Usuario();
      this.usuarioNuevo.email = email;
      this.usuarioNuevo.displayName = displayName;

      this.afDatabase.database.ref(this.path+'/'+id).set(this.usuarioNuevo);
    }
  }

  verificarUsuarioEnBaseDeDatos(id:string){
    if(!this.afDatabase.database.ref(this.path+'/'+id)){
      return true;
    }else{
      return true;
    }
  }

  getUsuarios(){
    return this.listaUsuarios = this.afDatabase.list(this.path);
  }
  getUsuario(id:string){
    return this.listaUsuarios = this.afDatabase.list(this.path+'/'+id);
  }


}
