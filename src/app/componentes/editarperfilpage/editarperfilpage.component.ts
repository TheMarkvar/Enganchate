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

  public displayName:string;
  public direccion:string;
  public documento:string;
  public telefono:string;
  public edad:Date;
  private file:File=null;
  private nombreArchivo:string;
  private estado:boolean = true;
  private iniciales:string;


  constructor(
    public authService: AuthService,
    public databaseService: DatabaseService,
    public uploadService: UploadService,
    public router:Router,
    public flashMensaje: FlashMessagesService
  ) { }

  ngOnInit() {


    this.authService.getAuth().subscribe(auth=>{
      if(auth){
        var userDN = this.databaseService.getUsuario(auth.uid).then(
          function(snapshot) {
           var res = (snapshot.val() && snapshot.val().displayName);
           //console.log(x);
           return res;
        });
        userDN.then((value: string) => {
          this.displayName = value;

          if(this.displayName!=null){
            let aux = this.displayName.split(" ");
            this.iniciales = aux[0].toUpperCase().charAt(0) + aux[1].toUpperCase().charAt(0);
          }
        });

        var userDoc = this.databaseService.getUsuario(auth.uid).then(
          function(snapshot) {
           var res = (snapshot.val() && snapshot.val().documento);
           return res;
        });
        userDoc.then((value: string) => {
          this.documento = value;
        });

        var userDir = this.databaseService.getUsuario(auth.uid).then(
          function(snapshot) {
           var res = (snapshot.val() && snapshot.val().direccion);
           return res;
        });
        userDir.then((value: string) => {
          this.direccion = value;
        });

        var userTel = this.databaseService.getUsuario(auth.uid).then(
          function(snapshot) {
           var res = (snapshot.val() && snapshot.val().telefono);
           return res;
        });
        userTel.then((value: string) => {
          this.telefono = value;
        });

        if(auth.photoURL != null){
            this.nombreArchivo = auth.photoURL;
            //this.nombreArchivo = 'assets/images/light-sky-blue-solid-color-background.jpg';
            this.estado = false;
        }else{
            this.nombreArchivo = 'assets/images/light-sky-blue-solid-color-background.jpg';
        }
        this.file = new File([""], this.nombreArchivo);
        console.log(this.file);

      }
    });



  }

  uploadFile(){;
    //const task = this.storage.upload(filePath, file);
    const path = "usuarios/"+this.authService.afAuth.auth.currentUser.uid;
    const task = this.uploadService.uploadFile(this.file, path);


    //this.authService.updateProfilePicture('images/'+path);
    this.uploadPercent = task.percentageChanges();

  }

  getEvent(file:FileList){
    this.file = file.item(0);

    console.log(this.file);
    var reader = new FileReader();
    reader.readAsDataURL(this.file);

    reader.onload = (event:any) => {
      this.nombreArchivo = event.target.result;
    }
    this.estado = false;

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
