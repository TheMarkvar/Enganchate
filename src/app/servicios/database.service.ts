import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { Usuario } from '../modelos/usuario';
import { Servicio } from '../modelos/servicio';



@Injectable()
export class DatabaseService {

  public  usuario:Usuario;
  private listaUsuarios: AngularFireList<Usuario>;
  private pathUsuarios:string;
  //private pathServicios:string;
  public servicio:Servicio;
  private listaServicios: AngularFireList<Servicio>;

  constructor(
    public afDatabase: AngularFireDatabase,
  ) {
      this.pathUsuarios = 'usuarios';
  }


  insertUserDatabase(id:string, email:string, displayName:string, edad:Date){
   if(this.verificarUsuarioEnBaseDeDatos(id)){
     this.getUsuarios();

     this.usuario = new Usuario();
     this.usuario.idUsuario = id;
     this.usuario.email = email;
     this.usuario.displayName = displayName;
     this.usuario.edad = edad;
     this.usuario.tieneImagen = false;

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
  insertUserDatabaseLogin(id:string, email:string, displayName:string, tieneImagen:boolean,
  pathImagen:string){

    var user = this.getUsuario(id).then(
      function(snapshot) {
       var res = (snapshot.val() && snapshot.val().email)
       return res;
    });
    user.then((msg: string) => {
      if(msg==null){
        this.getUsuarios();

        this.usuario = new Usuario();
        this.usuario.idUsuario = id;
        this.usuario.email = email;
        this.usuario.displayName = displayName;
        //this.usuario.tieneImagenExterna = tieneImagen;
        this.usuario.URLImagenExterna = pathImagen;
        this.afDatabase.database.ref(this.pathUsuarios+'/'+id).set(this.usuario);
      }else{
        this.getUsuarios();
        this.usuario = new Usuario();
        //this.usuario.tieneImagenExterna = tieneImagen;
        this.usuario.URLImagenExterna = pathImagen;
        this.listaUsuarios.update(id, this.usuario);
      }
    });

  }

  updateUser(id:string, nombre:string, documento:string, direccion:string, telefono:string,
    descripcion:string, tieneImagen:boolean, tienePortada:boolean){
    this.getUsuarios();
    this.usuario = new Usuario();
    this.usuario.displayName = nombre;
    this.usuario.documento = documento;
    this.usuario.direccion = direccion;
    this.usuario.telefono = telefono;
    this.usuario.descripcion = descripcion;
    this.usuario.tieneImagen = tieneImagen;
    this.usuario.tieneImagenPortada = tienePortada;
    this.listaUsuarios.update(id, this.usuario);
  }

  getUsuarios(){
    return this.listaUsuarios = this.afDatabase.list(this.pathUsuarios);
  }

  getUsuario(id:string){
    return  this.afDatabase.database.ref(this.pathUsuarios+'/'+id).once('value');
  }

  getUsuario2(id:string){

    return  this.afDatabase.database.ref(this.pathUsuarios+'/'+id).once('value');
  }


}
