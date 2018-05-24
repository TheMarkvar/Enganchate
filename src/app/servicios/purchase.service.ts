import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { Usuario } from '../modelos/usuario';
import { Servicio } from '../modelos/servicio';
import { Compra } from '../modelos/compra';
import { Categoria } from '../modelos/categoria';
import { Ciudad } from '../modelos/ciudad';
import { TipoPago } from '../modelos/tipo-pago';

@Injectable()
export class PurchaseService {
  public  usuario:Usuario;
  private listaUsuarios: AngularFireList<Usuario>;
  private listaCompras: AngularFireList<Compra>;
  private pathCompras:string;
  //private pathServicios:string;
  public servicio:Servicio;
  public compra:Compra;
  private listaServicios: AngularFireList<Servicio>;
  constructor(
    public afDatabase:AngularFireDatabase
  ) {
    this.pathCompras='compras';
  }
  insertPurchaseDatabase(idVendedor:string,idComprador:string,idServicio:string,valor:number,nombre:string,
  categoria:Categoria,zona_cobertura:Array<Ciudad>,tipo_pago:Array<TipoPago>,pathImagen:string){
    this.getCompras();
    this.compra=new Compra();
    this.compra.idVendedor=idVendedor;
    this.compra.idComprador=idComprador;
    this.compra.idServicio=idServicio;
    this.compra.estadoComprador=false;
    this.compra.estadoVendedor=false;
    this.compra.valor=valor;
    this.compra.nombre=nombre;
    this.compra.categoria=categoria;
    this.compra.zona_cobertura=zona_cobertura;
    this.compra.tipo_pago=tipo_pago;
    this.compra.estadoPago=false;
    this.compra.pathImagen=pathImagen;
    var idCompra;
    idCompra=this.listaCompras.push(this.compra);
    console.log(idCompra.path.pieces_[1]);
    this.compra.idCompra=idCompra.path.pieces_[1];
    this.listaCompras.update(idCompra.path.pieces_[1],this.compra);
    //console.log("inserta una nueva compra en la base de datos");
  }
  getCompras(){
    return this.listaCompras = this.afDatabase.list(this.pathCompras);
  }
}
