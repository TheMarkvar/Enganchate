import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { DatabaseService } from '../../servicios/database.service';
import { Router } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
import {  OptionsService } from '../../servicios/options.service';
import {  UploadService } from '../../servicios/upload.service';
import { Categoria } from '../../modelos/categoria';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  private categorias;
  private opcionCategoria;
  private categoryAux:Categoria;
  constructor(
    public authService: AuthService,
    public databaseService: DatabaseService,
    public router:Router,
    public flashMensaje: FlashMessagesService,
    public OptionsService: OptionsService,
    public uploadService: UploadService
  ) {
    this.categorias = new Map();
   }

  ngOnInit() {
    this.OptionsService.getCategorias().snapshotChanges().subscribe(item => {

    item.forEach(element => {
    let x = element.payload.toJSON();
    x["$key"] = element.key;


    if(x["id"]!=null && x["id"]!=undefined){
      let cat:{nombre:string, id:string};
      cat = {nombre:x["nombre"].toString(),id:x["id"]};

      this.uploadService.downloadFile('opciones/categorias/'+x["nombre"]).subscribe(URL=>{
        let cat:{nombre:string, id:string, pathImagen:string};
        cat = {nombre:x["nombre"].toString(),id:x["id"], pathImagen:URL};
        if(this.categorias.has(cat.id)){
        this.categorias.delete(cat.id);
        this.categorias.set(cat.id, cat);
      }

      });
      this.categorias.set(cat.id, cat);

    }

     });});
  }
  getValues(map){
     return Array.from(map.values());
  }
  getEventCategory(event){
    this.opcionCategoria = event.srcElement.value;
    //console.log(this.opcionCategoria);
  }
  onClickCategoryHome(id:string,nombre:string){
    console.log("Listener Category");
    this.categoryAux=new Categoria();
    this.categoryAux.id=id;
    this.categoryAux.nombre=nombre;
    this.router.navigate(['/advancedSearch'], { queryParams: {search:this.categoryAux.id }});
  }
}
