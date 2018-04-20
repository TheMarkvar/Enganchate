import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../../servicios/database.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { AuthService } from '../../servicios/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-publishservicepage',
  templateUrl: './publishservicepage.component.html',
  styleUrls: ['./publishservicepage.component.scss']
})
export class PublishservicepageComponent implements OnInit {
  private categoria:string;
  private nombre:string;
  private descripcion:string;
  private tiempo_duracion:number;
  private opcion_duracion:string;
  private total_duracion:string;
  private precio:number;
  private zona_cobertura = [];
  private modalidad:string;
  private efectivo:string;
  private credito:string;
  private debito:string;
  private tipo_pago:Array<string>;
  private fecha:Date;
  private ciudades = [];
  private dropdownSettings = {};
  private selectedItems = [];

  constructor(
    public databaseService: DatabaseService,
    public router:Router,
    public flashMensaje: FlashMessagesService,
    public authService: AuthService
  ) {
    this.efectivo="";
    this.debito="";
    this.credito="";
    this.tipo_pago = new Array<string>();
    this.fecha=new Date();

  }

  ngOnInit() {
    this.ciudades = [
            { item_id: "Bogotá D.C", item_text: 'Bogotá D.C' },
            { item_id: "Medellín", item_text: 'Medellín' },
            { item_id: "Cali", item_text: 'Cali' },
            { item_id: "Barranquilla", item_text: 'Barranquilla' },
            { item_id: "Cartagena", item_text: 'Cartagena' },
            { item_id: "Soledad", item_text: 'Soledad' },
            { item_id: "Cúcuta", item_text: 'Cúcuta'},
            { item_id: "Soacha", item_text: 'Soacha' },
            { item_id: "Ibagué", item_text: 'Ibagué' },
            { item_id: "Bucaramanga", item_text: 'Bucaramanga'},
            { item_id: "Villavicencio", item_text: 'Villavicencio'},
            { item_id: "Santa Marta", item_text: 'Santa Marta' },
            { item_id: "Bello", item_text: 'Bello' },
            { item_id: "Valledupar", item_text: 'Valledupar' },
            { item_id: "Pereira", item_text: 'Pereira' },
            { item_id: "Armenia", item_text: 'Armenia' },
            { item_id: "Buenaventura", item_text: 'Buenaventura' },
            { item_id: "Pasto", item_text: 'Pasto' },
            { item_id: "Manizales", item_text: 'Manizales' },
            { item_id: "Montería", item_text: 'Montería' },
            { item_id: "Neiva", item_text: 'Neiva' },
            { item_id: "Popayán", item_text: 'Popayán' },
            { item_id: "Quibdo", item_text: 'Quibdo' },
            { item_id: "Riohacha", item_text: 'Riohacha' }

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

    //console.log(this.selectedItems);
  }
  onSelectAll(items: any){
      //console.log(items);
  }
  onDeSelectAll(items: any){
      //console.log(items);
  }
  onSubmitPublicarServicio(){

      if(this.efectivo!=""){
        this.tipo_pago.push("EFECTIVO");
      }
      if(this.credito!=""){
        this.tipo_pago.push("CREDITO");
      }
      if(this.debito!=""){
        this.tipo_pago.push("DEBITO");
      }

      this.fecha = new Date();

      this.databaseService.insertServiceDatabase(this.authService.afAuth.auth.currentUser.uid,this.categoria,this.nombre,
      this.descripcion,this.tiempo_duracion,this.opcion_duracion,this.precio,this.selectedItems,
      this.modalidad,this.tipo_pago,this.fecha);
      this.router.navigate(['/privado']);



  }

  verificarFormulario(){
    this.fecha = new Date();

    if(this.efectivo!="")
      this.tipo_pago.push('Efectivo');
    if(this.debito!="")
      this.tipo_pago.push('Debito');
    if(this.credito!="")
      this.tipo_pago.push('Credito');

    return true;
  }

}
