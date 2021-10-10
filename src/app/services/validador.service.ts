import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

interface ErrorValidacion {
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadorService {

  constructor() { }

  fechaMenor(control: FormControl): ErrorValidacion {
    
    let today = new Date();
    let date = new Date(control.value);
    date.setDate(date.getDate() + 1);
    
    if((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24) <= 0)
      return {
        fechaMenor: false
      }

    return {};
  }

  ingresosNegativos(control: FormControl): ErrorValidacion {
    return control.value == null || control.value < 0 ? { ingresosNegativos: false } : {};
  }

  codigoPostal(control: FormControl): ErrorValidacion {
    return control.value == null || control.value < 5 ? { ingresosNegativos: false } : {};
  }
}
