import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { ClienteModel } from '../../models/cliente.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { ValidadorService } from '../../services/validador.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente: ClienteModel = new ClienteModel();
  formulario!: FormGroup;

  constructor(private service: ClienteService, private validador: ValidadorService, private activateRoute: ActivatedRoute, private builder: FormBuilder) { }

  ngOnInit(): void {    
    this.activateRoute.params.subscribe( params => {
      if(Object.keys(params).length > 0)
        this.cliente = JSON.parse(JSON.stringify(params));       
    });
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = this.builder.group({
      id: [this.cliente.id, [ ]],
      nombre: [this.cliente.nombre, [ Validators.required, Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i) ]],
      apellidoPaterno: [this.cliente.apellidoPaterno, [ Validators.required, Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i) ]],
      apellidoMaterno: [this.cliente.apellidoMaterno, [ Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i) ]],     
      fechaNacimiento: [this.cliente.fechaNacimiento, [ Validators.required, this.validador.fechaMenor ]],
      ingresos: [this.cliente.ingresos, [ Validators.min(0), this.validador.ingresosNegativos ]],
      codigoPostal: [this.cliente.codigoPostal, [ Validators.required, Validators.minLength(5), Validators.maxLength(5), this.validador.codigoPostal ]]
    });
  }

  guardar() {  
    if(this.formulario.valid) {
      
      let date = new Date(this.formulario.controls.fechaNacimiento.value);
      date.setDate(date.getDate() + 1);
      console.log(date);

      this.cliente = this.formulario.value;      
      this.cliente.fechaNacimiento = date;
      
      this.service.guardar(this.cliente).subscribe( data => {
        if(data.codigo == 'OK') {
          this.formulario.reset();         
          Swal.fire({
            text: 'Cliente guardado exitosamente',
            icon: 'success'
          });
        } else {
          Swal.fire({
            text: data.mensaje,
            icon: 'error'
          });
        }
      });
    } else {
      this.notificarFormulario();
    }
  }

  notificarFormulario() {
    if(this.formulario.invalid) {
      return Object.values(this.formulario.controls).forEach(control => {
        if(control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
  }

  limpiar() {
    this.formulario.reset();
  }

  get nombreNoValido() {
    return this.formulario.get('nombre')?.invalid && this.formulario.get('nombre')?.touched;    
  }

  get apellidoPaternoNoValido() {
    return this.formulario.get('apellidoPaterno')?.invalid && this.formulario.get('apellidoPaterno')?.touched;
  }

  get apellidoMaternoNoValido() {
    return this.formulario.get('apellidoMaterno')?.invalid && this.formulario.get('apellidoMaterno')?.touched;
  }

  get fechaNacimientoNoValida() {
    return this.formulario.get('fechaNacimiento')?.invalid && this.formulario.get('fechaNacimiento')?.touched;
  }

  get ingresosNoValidos() {
    return this.formulario.get('ingresos')?.invalid && this.formulario.get('ingresos')?.touched;
  }

  get codigoPostalNoValido() {
    return this.formulario.get('codigoPostal')?.invalid && this.formulario.get('codigoPostal')?.touched;
  }
}
