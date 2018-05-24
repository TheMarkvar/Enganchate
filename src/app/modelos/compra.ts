import { Categoria } from  '../modelos/categoria';

export class Compra {
  idCompra:string;
  estadoComprador:boolean;
  estadoVendedor:boolean;
  idComprador:string;
  idVendedor:string;
  idServicio:string;
  calificacion:string;
  comentario:string;
  valor:number;
  estadoPago:boolean;
  //modalidad:Modalidad;
  nombre:string;
  //opcion_duracion:OpcDuracion;
  //descripcion:string;
  categoria:Categoria;
  precio:number;
  zona_cobertura=[];
  tipo_pago = [];
  pathImagen:string;
}
