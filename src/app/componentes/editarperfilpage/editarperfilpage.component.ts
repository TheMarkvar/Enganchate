import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import { AuthService } from '../../servicios/auth.service';
import { DatabaseService } from '../../servicios/database.service';
import { UploadService } from '../../servicios/upload.service';
import { AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-editarperfilpage',
  templateUrl: './editarperfilpage.component.html',
  styleUrls: ['./editarperfilpage.component.scss']
})
export class EditarperfilpageComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  public direccion:string;
  public documento:string;
  public telefono:string;
  public edad:Date;
  private file:File=null;
  private nombre:string;
  private event;
  private inputFileModel;
  private name:string;


  constructor(
    public authService: AuthService,
    public databaseService: DatabaseService,
    public uploadService: UploadService,
    public router:Router,
    public flashMensaje: FlashMessagesService
  ) { }

  ngOnInit() {
    /*this.listaUsuarios = this.databaseService.getUsuarios();
    this.usuario = new Usuario();
    this.usuario.displayName = "Pepe Torres";
    this.listaUsuarios.update(this.authService.afAuth.auth.currentUser.uid, this.usuario);*/

  }

  uploadFile(){;
    //const task = this.storage.upload(filePath, file);
    const path = "usuarios/"+this.authService.afAuth.auth.currentUser.uid;
    const task = this.uploadService.uploadFile(this.file, path);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();

  }

  getEvent(file:FileList){
    this.file = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.name = event.target.result;
    }
    reader.readAsDataURL(this.file);
    console.log(this.file);

    /*if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url
        console.log('aaaaaaaaaaaaaaaaaaaaaaaa');

        console.log('aaaaaaaaaaaaaaaaaaaaaaaa');

        reader.onload = (event:any) => { // called once readAsDataURL is completed
          this.name = event.target.result;
        }
    }*/



  }


  onSubmitEditarPerfilUser(){
    if(this.verificarFormulario()){

      //this.databaseService.usuario = new Usuario();
      this.databaseService.updateUser(this.authService.afAuth.auth.currentUser.uid,
      this.documento, this.direccion, this.telefono, this.edad);
      this.uploadFile();


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
