import { Categoria } from  '../modelos/categoria';
import { OpcionDuracion } from '../modelos/opcion-duracion';
export class Servicio {
  $id:string;
  publicador:string;
  categoria:Categoria;
  nombre:string;
  direccion:string;
  descripcion:string;
  tiempo_duracion:number;
  opcion_duracion:OpcionDuracion;
  precio:number;
  zona_cobertura=[];
  modalidad=[];
  tipo_pago = [];
  opiniones = [];
  fecha:any;
  pathImagen:string;
  idServicio:string;
}
