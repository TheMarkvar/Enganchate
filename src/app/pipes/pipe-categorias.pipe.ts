import { Pipe, PipeTransform } from '@angular/core';
import { Categoria } from  '../modelos/categoria';

@Pipe({
  name: 'pipeCategorias'
})
export class PipeCategoriasPipe implements PipeTransform {


  transform(array:Categoria[], order: number): Categoria[] {
    if (!array || array.length===0 || !order){
      return array;
    }



    let res:Categoria[]=[];
    let aux, ot;
    let ott:Categoria = new Categoria();
    aux = array.filter(function(el) {
    return el.nombre !== "Otra";
    });

    res= aux.sort(function(a,b)
    {return (a.nombre > b.nombre) ? order : ((b.nombre > a.nombre) ? order*(-1) : 0);
    });


    ot =  array.find(function(v){ return v["nombre"]==="Otra"});

    ott.nombre = ot.nombre;
    ott.id=ot.id;
    if(ot.pathImagen!=null)ott.pathImagen=ot.pathImagen;
    res.push(ott);

    return res;
  }

}
