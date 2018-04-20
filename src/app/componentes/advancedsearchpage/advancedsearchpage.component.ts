import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Servicio } from '../../modelos/servicio';

@Component({
  selector: 'app-advancedsearchpage',
  templateUrl: './advancedsearchpage.component.html',
  styleUrls: ['./advancedsearchpage.component.scss']
})
export class AdvancedsearchpageComponent implements OnInit {
  private listaServicios = [];
  private categorias = [];
  private selectedItems = [];
  private dropdownSettings = {};


  private precioMinimo: number;
  private precioMaximo: number;
  private efectivo:string;
  private credito:string;
  private debito:string;
  private modalidad:string;
  private zona_cobertura:string;
  private buscar:string;



  constructor(private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.activatedRoute.queryParams
      .filter(params => params.search)
      .subscribe(params => {
        this.buscar = params.search;
      });
    this.categorias = [
            { item_id: "hogar", item_text: 'Hogar' },
            { item_id: "educacion", item_text: 'Educación' },
            { item_id: "musica", item_text: 'Música' },
            { item_id: "legal", item_text: 'Legal' },
            { item_id: "salud", item_text: 'Salud' },
            { item_id: "deportes", item_text: 'Deportes' },
            { item_id: "financierto", item_text: 'Financiero' },
            { item_id: "veterinaria", item_text: 'Veterinaria' },
            { item_id: "transporte", item_text: 'Transporte' },
            { item_id: "turismo", item_text: 'Turismo' },
            { item_id: "gastronomia", item_text: 'Gastronomía' },
            { item_id: "eventos_sociales", item_text: 'Eventos Sociales' },
            { item_id: "cuidado_infantil", item_text: 'Cuidado Infantil' },
            { item_id: "diseno", item_text: 'Diseño' },
            { item_id: "arte_fotografia", item_text: 'Arte y Fotografía' },
            { item_id: "confeccion", item_text: 'Confección' },
            { item_id: "estetico", item_text: 'Estética' },
            { item_id: "otra", item_text: 'Otra' },
            { item_id: "tecnologia", item_text: 'Tecnología' }
        ];

        this.dropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Seleccionar todas',
            unSelectAllText: 'Deseleccionar todas',
            searchPlaceholderText: 'Buscar',
            itemsShowLimit: 10,
            allowSearchFilter: true
        };

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



  onItemSelect(item:any){
      //console.log(item);
      this.selectedItems.push(item);
      console.log(this.selectedItems);
  }
  OnItemDeSelect(item:any){
    //console.log(item);
    var newSelectedItems = this.selectedItems.filter(function(element) {
    return element.item_id !== item.item_id;
    });
    //console.log("removed");
    //console.log(removed);
    this.selectedItems = newSelectedItems;

    console.log(this.selectedItems);
  }
  onSelectAll(items: any){
      console.log(items);
  }
  onDeSelectAll(items: any){
      console.log(items);
  }




}
