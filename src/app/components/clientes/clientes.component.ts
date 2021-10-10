import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteModel } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: ClienteModel[] = [];
  id!: string;

  constructor(private service: ClienteService, private router: Router) { }

  ngOnInit(): void {

    this.cargarClientes();

  }

  cargarClientes() {
    this.service.getClientes().subscribe( data => {
      this.clientes = data;
    });
  }

  editar(cliente: ClienteModel) {
    this.router.navigate(['/cliente', cliente]);
  }

  confirmar(id: number) {
    Swal.fire({
      title: 'Eliminar?',
      text: "¡No podra revertir este cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminar(id);        
      }
    });
  }

  eliminar(id: number) {
    this.service.eliminar(id).subscribe( res=> {
      if(res.codigo == 'OK') {
        this.cargarClientes();
        Swal.fire({
          text: 'Cliente eliminado',
          icon: 'success'
        })
      } else {
        Swal.fire({
          text: res.mensaje,
          icon: 'error'
        });
      }
    });
  }

  buscar(value: string) {
    
    let id = parseInt(value) | 0;
    this.clientes = [];

    console.log(id);

    if(id != undefined && id != 0) {
      this.service.buscarCliente(id).subscribe( data => {
        if(data.id != null) {
          this.clientes.push(data);
        }
      });
    } else {
      this.cargarClientes();
    }
  }
}
