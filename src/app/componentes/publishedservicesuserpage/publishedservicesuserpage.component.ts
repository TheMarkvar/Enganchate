import { Component, OnInit } from '@angular/core';

import { FlashMessagesService} from 'angular2-flash-messages';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { DatabaseServicioService } from '../../servicios/database-servicio.service';
import { OptionsService } from '../../servicios/options.service';
import { UploadService } from '../../servicios/upload.service';
import { Servicio } from  '../../modelos/servicio';
import { Ciudad } from  '../../modelos/ciudad';
import { Categoria } from  '../../modelos/categoria';
import { OpcionDuracion } from  '../../modelos/opcion-duracion';
import { TipoPago } from  '../../modelos/tipo-pago';
import { Observable } from 'rxjs/Observable';
import { Modalidad } from '../../modelos/modalidad';

@Component({
  selector: 'app-publishedservicesuserpage',
  templateUrl: './publishedservicesuserpage.component.html',
  styleUrls: ['./publishedservicesuserpage.component.scss']
})
export class PublishedservicesuserpageComponent implements OnInit {

  private listaServicios = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private optionsService:OptionsService,
    public authService: AuthService,
    private databaseServicioService:DatabaseServicioService,
    private uploadService:UploadService,
    public flashMensaje: FlashMessagesService,
    public router:Router,
    private _sanitizer: DomSanitizer

  ) { }

  ngOnInit() {
    this.filtrarServiciosUsuario();
    console.log(this.authService.afAuth.auth.currentUser.uid);
  }

  filtrarServiciosUsuario(){
    this.databaseServicioService.getServicios().snapshotChanges().subscribe(item => {
      this.listaServicios = [];


      item.forEach(element => {
      let x = element.payload.toJSON();
      x["$key"] = element.key;

      let servicioFiltro:Servicio = new Servicio();
      var servicioValido:boolean = false;


      for(var key in x) {

          var value = x[key];

          if(key === "zona_cobertura"){
            let value2 = [];
            for (let key2 in value) {
                value2.push(value[key2]);
            }
            servicioFiltro.zona_cobertura = value2;
          }
          if(key === "modalidad"){
            let value2 = [];
            for (let key2 in value) {
                value2.push(value[key2]);
            }
            servicioFiltro.modalidad = value2;
          }
          else if(key === "tipo_pago"){
            let value2 = [];
            for (let key2 in value) {
                value2.push(value[key2]);
            }
            servicioFiltro.tipo_pago = value2;
          }
          else if(key === "nombre"){
            servicioFiltro.nombre = value;
          }
          else if(key === "categoria"){
            servicioFiltro.categoria = value;
          }
          else if(key === "descripcion"){
            servicioFiltro.descripcion = value;
          }
          else if(key === "precio"){
            servicioFiltro.precio = value;
          }
          else if(key === "publicador"){
            servicioFiltro.publicador = value;

            if(value === this.authService.afAuth.auth.currentUser.uid){
                servicioValido = true;
            }

          }
          else if(key=="pathImagen"){
            this.uploadService.downloadFile('servicios/'+value).subscribe(URL=>{
              //console.log(URL.toString());
              servicioFiltro.idServicio = value;
              servicioFiltro.pathImagen = URL;
            });
          }

      }
      if(servicioValido){
          this.listaServicios.push(servicioFiltro);
      }


     ;});});
  }

  onClickService(idService){
    this.router.navigate(['/service'], { queryParams: { search: idService } });    
  }

  getBackground(image) {
   return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
  }


}
