import { Component, OnInit } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseServicioService } from '../../servicios/database-servicio.service';
import { OptionsService } from '../../servicios/options.service';

import { Servicio } from  '../../modelos/servicio';
import { Ciudad } from  '../../modelos/ciudad';
import { Categoria } from  '../../modelos/categoria';
import { OpcionDuracion } from  '../../modelos/opcion-duracion';
import { TipoPago } from  '../../modelos/tipo-pago';
import { Observable } from 'rxjs/Observable';
import { Modalidad } from '../../modelos/modalidad';

@Component({
  selector: 'app-advancedsearchpage',
  templateUrl: './advancedsearchpage.component.html',
  styleUrls: ['./advancedsearchpage.component.scss']
})
export class AdvancedsearchpageComponent implements OnInit {
  private listaServicios = [];
  private categorias = [];
  private ciudades = [];
  private tipos_pago = [];
  private modalidades_pago = [];

  private selectedItems = [];
  private dropdownSettings = {};

  private selectedItems2 = [];
  private dropdownSettings2 = {};

  private selectedItems3 = [];
  private dropdownSettings3 = {};

  private selectedItems4 = [];
  private dropdownSettings4 = {};


  private precioMinimo: number;
  private precioMaximo: number;
  private buscar:string;



  constructor(
    private activatedRoute: ActivatedRoute,
    private optionsService:OptionsService,
    private databaseService:DatabaseServicioService,
    public flashMensaje: FlashMessagesService,
  ) { }


  ngOnInit() {
    this.activatedRoute.queryParams
      .filter(params => params.search)
      .subscribe(params => {
        this.buscar = params.search;
      });

    this.cargarCategorias();
    this.cargarCiudades();
    this.cargarTiposPago();
    this.cargarModalidades();


    let tipo_pago = new Array<string>();

    tipo_pago.push("debito");
    tipo_pago.push("credito");

    let  s1 = new Servicio();
    s1.nombre = "Nombre servicio1";
    s1.descripcion = "Descripcion servicio1";
    let ar = [];
    ar.push("Bogota");
    s1.modalidad = "Modalidad servicio1";
    s1.categoria = "Categoria servicio1";
    s1.precio = 2000;
    s1.tipo_pago = tipo_pago;

    tipo_pago.push("efectivo");

    let  s2 = new Servicio();
    s2.nombre = "Nombre servicio2";
    s2.descripcion = "Descripcion servicio2";
    s2.modalidad = "Modalidad servicio2";
    s2.categoria = "Categoria servicio12";
    s2.precio = 2500;
    s2.tipo_pago = tipo_pago;


    this.listaServicios.push(s1);
    this.listaServicios.push(s2);

  }

  filtrarServicios(){
    
  }


  cargarCategorias(){
    this.optionsService.getCategorias().snapshotChanges().subscribe(item => {
    this.categorias = [];

    item.forEach(element => {
    let x = element.payload.toJSON();
    x["$key"] = element.key;
     this.categorias.push(x as Categoria);}); console.log(this.categorias)});

    this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'nombre',
        selectAllText: 'Seleccionar todas',
        unSelectAllText: 'Deseleccionar todas',
        searchPlaceholderText: 'Buscar',
        itemsShowLimit: 10,
        allowSearchFilter: true
    };

  }

  cargarCiudades(){
    this.optionsService.getCiudades().snapshotChanges().subscribe(item => {
      this.ciudades = [];

      item.forEach(element => {
      let x = element.payload.toJSON();
      x["$key"] = element.key;
     this.ciudades.push(x as Ciudad);});});



   this.dropdownSettings2 = {
       singleSelection: false,
       idField: 'id',
       textField: 'nombre',
       selectAllText: 'Seleccionar todas',
       unSelectAllText: 'Deseleccionar todas',
       searchPlaceholderText: 'Buscar',
       itemsShowLimit: 10,
       allowSearchFilter: true
     };

  }

  cargarTiposPago(){
    this.optionsService.getTipoPago().snapshotChanges().subscribe(item => {
      this.tipos_pago = [];

      item.forEach(element => {
      let x = element.payload.toJSON();
      x["$key"] = element.key;
     this.tipos_pago.push(x as TipoPago);});});



   this.dropdownSettings3 = {
       singleSelection: false,
       idField: 'id',
       textField: 'nombre',
       selectAllText: 'Seleccionar todas',
       unSelectAllText: 'Deseleccionar todas',
       searchPlaceholderText: 'Buscar',
       itemsShowLimit: 10,
       allowSearchFilter: true
     };
  }

  cargarModalidades(){
    this.optionsService.getModalidad().snapshotChanges().subscribe(item => {
      this.modalidades_pago = [];

      item.forEach(element => {
      let x = element.payload.toJSON();
      x["$key"] = element.key;
     this.modalidades_pago.push(x as Modalidad);});});



   this.dropdownSettings4 = {
       singleSelection: false,
       idField: 'id',
       textField: 'nombre',
       selectAllText: 'Seleccionar todas',
       unSelectAllText: 'Deseleccionar todas',
       searchPlaceholderText: 'Buscar',
       itemsShowLimit: 10,
       allowSearchFilter: true
     };
  }



  onItemSelect(item:any){
      this.selectedItems.push(item);
      //console.log(this.selectedItems);
  }
  OnItemDeSelect(item:any){
    var newSelectedItems = this.selectedItems.filter(function(element) {
    return element.nombre !== item.nombre;
    });
    this.selectedItems = newSelectedItems;
  }

  onSelectAll(items: any){
      //console.log(items);
  }
  onDeSelectAll(items: any){
      //console.log(items);
  }


  onItemSelect2(item:any){
      this.selectedItems2.push(item);
      //console.log(this.selectedItems);
  }
  OnItemDeSelect2(item:any){
    var newSelectedItems2 = this.selectedItems2.filter(function(element) {
    return element.nombre !== item.nombre;
    });
    this.selectedItems2 = newSelectedItems2;
  }

  onSelectAll2(items: any){
      //console.log(items);
  }
  onDeSelectAll2(items: any){
      //console.log(items);
  }


  onItemSelect3(item:any){
      this.selectedItems3.push(item);
      //console.log(this.selectedItems);
  }
  OnItemDeSelect3(item:any){
    var newSelectedItems3 = this.selectedItems3.filter(function(element) {
    return element.nombre !== item.nombre;
    });
    this.selectedItems3 = newSelectedItems3;
  }

  onSelectAll3(items: any){
      //console.log(items);
  }
  onDeSelectAll3(items: any){
      //console.log(items);
  }

  onItemSelect4(item:any){
      this.selectedItems4.push(item);
      //console.log(this.selectedItems);
  }
  OnItemDeSelect4(item:any){
    var newSelectedItems4 = this.selectedItems4.filter(function(element) {
    return element.nombre !== item.nombre;
    });
    this.selectedItems4 = newSelectedItems4;
  }

  onSelectAll4(items: any){
      //console.log(items);
  }
  onDeSelectAll4(items: any){
      //console.log(items);
  }





}
