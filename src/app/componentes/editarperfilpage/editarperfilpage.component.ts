import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { DatabaseService } from '../../servicios/database.service';
import { AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-editarperfilpage',
  templateUrl: './editarperfilpage.component.html',
  styleUrls: ['./editarperfilpage.component.scss']
})
export class EditarperfilpageComponent implements OnInit {

  public direccion:string;
  public documento:string;
  public telefono:string;
  public edad:Date;


  constructor(
    public authService: AuthService,
    public databaseService: DatabaseService,
    public router:Router,
    public flashMensaje: FlashMessagesService
  ) { }

  ngOnInit() {
    /*this.listaUsuarios = this.databaseService.getUsuarios();
    this.usuario = new Usuario();
    this.usuario.displayName = "Pepe Torres";
    this.listaUsuarios.update(this.authService.afAuth.auth.currentUser.uid, this.usuario);*/

  }

  onSubmitEditarPerfilUser(){
    if(this.verificarFormulario()){

      //this.databaseService.usuario = new Usuario();
      this.databaseService.updateUser(this.authService.afAuth.auth.currentUser.uid,
      this.documento, this.direccion, this.telefono, this.edad);
      this.flashMensaje.show('Información editada correctamente',
      {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['']);
    }else{
      this.flashMensaje.show("No fue posible modificar datos",
      {cssClass: 'alert-danger', timeout: 4000});
    }
  }

  //Se debe implementar el método para que datos sean coherentes
  verificarFormulario(){
    return true;
  }

  cambiarContrasena(){

    var email = this.authService.afAuth.auth.currentUser.email;
    this.authService.resetPassword(email)
    .then((res)=>{
      this.flashMensaje.show('Se ha enviado un link al correo: '+email,
      {cssClass: 'alert-success', timeout: 4000});
    }).catch((err)=>{
      this.flashMensaje.show(err.message,
      {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['']);
    });

  }

}
