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
      //this.pathServicios = 'servicios';
  }

  /*insertServiceDatabase(publicador:string,categoria:string,nombre:string,descripcion:string,tiempo_duracion:number,
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


  }*/

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

  updateUser(id:string, documento:string, direccion:string, telefono:string){
    this.getUsuarios();
    this.usuario = new Usuario();
    this.usuario.documento = documento;
    this.usuario.direccion = direccion;
    this.usuario.telefono = telefono;
    this.listaUsuarios.update(id, this.usuario);
  }
  /*getServicios(){
    return this.listaServicios = this.afDatabase.list(this.pathServicios);
  }*/
  getUsuarios(){
    return this.listaUsuarios = this.afDatabase.list(this.pathUsuarios);
  }

  getUsuario(id:string){
    //return this.afDatabase.object(this.pathUsuarios+'/'+id);
    return  this.afDatabase.database.ref(this.pathUsuarios+'/'+id).once('value');
  }


}
