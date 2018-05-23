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

  displayName:string;
  direccion:string="";
  documento:string="";
  descripcion:string="";
  telefono:string="";
  file:File=null;
  nombreArchivo:string;
  fotoInicial:boolean = false;
  fotoBD:boolean = false;

  file2:File=null;
  nombreArchivo2:string;
  fotoInicial2:boolean = false;
  fotoBD2:boolean = false;

  cargarFoto:boolean = false;
  cargarFoto2:boolean = false;
  iniciales:string;


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
           return res;
        });
        userDN.then((value: string) => {
          this.displayName = value;

          if(this.displayName!=null){
            let aux = this.displayName.split(" ");
            this.iniciales = aux[0].toUpperCase().charAt(0) + aux[1].toUpperCase().charAt(0);
          }
        });

        var userDesc = this.databaseService.getUsuario(auth.uid).then(
          function(snapshot) {
           var res = (snapshot.val() && snapshot.val().descripcion);
           return res;
        });
        userDesc.then((value: string) => {
          if(value!=null)
            this.descripcion = value;
        });

        var userDoc = this.databaseService.getUsuario(auth.uid).then(
          function(snapshot) {
           var res = (snapshot.val() && snapshot.val().documento);
           return res;
        });
        userDoc.then((value: string) => {
          if(value!=null)
            this.documento = value;
        });

        var userDir = this.databaseService.getUsuario(auth.uid).then(
          function(snapshot) {
           var res = (snapshot.val() && snapshot.val().direccion);
           return res;
        });
        userDir.then((value: string) => {
          if(value!=null)
            this.direccion = value;
        });

        var userTel = this.databaseService.getUsuario(auth.uid).then(
          function(snapshot) {
           var res = (snapshot.val() && snapshot.val().telefono);
           return res;
        });
        userTel.then((value: string) => {
          if(value!=null)
            this.telefono = value;
        });

        var userTI = this.databaseService.getUsuario(auth.uid).then(
          function(snapshot) {
           var res = (snapshot.val() && snapshot.val().tieneImagen);
           return res;
        });
        userTI.then((msg: boolean) => {
          this.fotoBD = msg;

          if(this.fotoBD){
            this.uploadService.downloadFile('usuarios/'+auth.uid).subscribe(URL=>{
              this.nombreArchivo = URL;
            });
          }
          else if(auth.photoURL != null){
              this.nombreArchivo = auth.photoURL;
          }else{
              this.nombreArchivo = 'assets/images/light-sky-blue-solid-color-background.jpg';
              this.fotoInicial = true;
          }

        });




        var userTF = this.databaseService.getUsuario(auth.uid).then(
          function(snapshot) {
           var res = (snapshot.val() && snapshot.val().tieneImagenPortada);
           return res;
        });
        userTF.then((msg: boolean) => {
          this.fotoBD2 = msg;

          if(this.fotoBD2){
            this.uploadService.downloadFile('usuarios/BACKGROUND_'+auth.uid).subscribe(URL=>{
              this.nombreArchivo2 = URL;
            });
          }else{
              this.nombreArchivo2 = 'assets/images/light-sky-blue-solid-color-background.jpg';
              this.fotoInicial2 = true;
          }

        });




        this.file = new File([""], this.nombreArchivo);
        this.file2 = new File([""], this.nombreArchivo2);

      }
    });



  }

  onSubmitEditarPerfilUser(EditarPerfilForm){

    if(this.cargarFoto && this.cargarFoto2){
        this.uploadFile();
        this.uploadFile2();
        this.databaseService.updateUser(this.authService.afAuth.auth.currentUser.uid,
        this.displayName, this.documento, this.direccion, this.telefono, this.descripcion,
        this.cargarFoto, this.cargarFoto2);

    }
    else if(this.cargarFoto){
        this.uploadFile();
        this.databaseService.updateUser(this.authService.afAuth.auth.currentUser.uid,
        this.displayName, this.documento, this.direccion, this.telefono, this.descripcion,
        this.cargarFoto, !this.cargarFoto2);

    }else if(this.cargarFoto2){
      this.uploadFile2();
      this.databaseService.updateUser(this.authService.afAuth.auth.currentUser.uid,
      this.displayName, this.documento, this.direccion, this.telefono, this.descripcion,
      !this.cargarFoto, this.cargarFoto2);
    }else{
      this.databaseService.updateUser(this.authService.afAuth.auth.currentUser.uid,
      this.displayName, this.documento, this.direccion, this.telefono, this.descripcion,
      !this.cargarFoto,!this.cargarFoto2);
    }


    this.flashMensaje.show('Información editada correctamente',
    {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['home']);

  }

  uploadFile(){;
    //const task = this.storage.upload(filePath, file);
    const path = "usuarios/"+this.authService.afAuth.auth.currentUser.uid;
    //const task = this.uploadService.uploadFile(this.file, path);

    if(this.cargarFoto){
      const task = this.uploadService.uploadFile(this.file, path);
      this.uploadPercent = task.percentageChanges();

      this.uploadService.downloadFile(path).subscribe(URL=>{
        //console.log(URL.toString());
        this.authService.updateProfile(URL.toString(), this.displayName);
      });
    }

  }

  uploadFile2(){;
    //const task = this.storage.upload(filePath, file);
    const path = "usuarios/BACKGROUND_"+this.authService.afAuth.auth.currentUser.uid;
    //const task = this.uploadService.uploadFile(this.file, path);

    if(this.cargarFoto2){
      const task = this.uploadService.uploadFile(this.file2, path);
      this.uploadPercent = task.percentageChanges();

      this.uploadService.downloadFile(path).subscribe(URL=>{
        //console.log(URL.toString());
        //this.authService.updateProfile(URL.toString(), this.displayName);
      });
    }

  }

  getEvent(file:FileList){
    this.file = file.item(0);

    var reader = new FileReader();
    reader.readAsDataURL(this.file);

    reader.onload = (event:any) => {
      this.nombreArchivo = event.target.result;
    }
    this.fotoInicial = false;
    this.cargarFoto = true;

  }

  getEventBackground(file:FileList){
    this.file2 = file.item(0);

    var reader = new FileReader();
    reader.readAsDataURL(this.file2);

    reader.onload = (event:any) => {
      this.nombreArchivo2 = event.target.result;
    }
    this.fotoInicial2 = false;
    this.cargarFoto2 = true;

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
