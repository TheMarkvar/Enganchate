import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { Usuario } from '../modelos/usuario';


@Injectable()
export class DatabaseService {

  public usuario:Usuario;
  private listaUsuarios: AngularFireList<Usuario>;
  private pathUsuarios:string;

  constructor(
    public afDatabase: AngularFireDatabase,
  ) {
      this.pathUsuarios = 'usuarios';
  }

  insertUserDatabase(id:string, email:string, displayName:string, edad:Date){
   if(this.verificarUsuarioEnBaseDeDatos(id)){
     this.getUsuarios();

     this.usuario = new Usuario();
     this.usuario.email = email;
     this.usuario.displayName = displayName;
     this.usuario.edad = edad;

     this.afDatabase.database.ref(this.pathUsuarios+'/'+id).set(this.usuario);
   }
 }

 verificarUsuarioEnBaseDeDatos(id:string){
  if(!this.afDatabase.database.ref(this.pathUsuarios+'/'+id)){
    return true;
  }else{
    return true;
  }
}

  insertUserDatabaseLogin(id:string, email:string, displayName:string){

    var user = this.getUsuario(id).then(
      function(snapshot) {
       var res = (snapshot.val() && snapshot.val().email)
       return res;
    });
    user.then((msg: string) => {
      if(msg==null){
        this.getUsuarios();

        this.usuario = new Usuario();
        this.usuario.email = email;
        this.usuario.displayName = displayName;
        this.afDatabase.database.ref(this.pathUsuarios+'/'+id).set(this.usuario);
      }
    });

  }

  updateUser(id:string, documento:string, direccion:string, telefono:string, edad:Date){
    this.getUsuarios();
    this.usuario = new Usuario();
    this.usuario.documento = documento;
    this.usuario.direccion = direccion;
    this.usuario.telefono = telefono;
    this.usuario.edad = edad;
    this.listaUsuarios.update(id, this.usuario);
  }

  getUsuarios(){
    return this.listaUsuarios = this.afDatabase.list(this.pathUsuarios);
  }

  getUsuario(id:string){
    //return this.afDatabase.object(this.pathUsuarios+'/'+id);
    return  this.afDatabase.database.ref(this.pathUsuarios+'/'+id).once('value');
  }


}
