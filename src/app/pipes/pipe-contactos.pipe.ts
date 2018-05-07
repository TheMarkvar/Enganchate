import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../modelos/usuario';

@Pipe({
  name: 'pipeContactos'
})
export class PipeContactosPipe implements PipeTransform {

  transform(values: Usuario[], filter: string): Usuario[] {
    if (!values || !values.length) return [];
    if (!filter) return values;
    // Filter items array, items which match will return true
    let res = values.filter(v => v.displayName.toLowerCase().indexOf(filter.toLowerCase())!=-1);
    //console.log(res);
    return res;

  }

}
