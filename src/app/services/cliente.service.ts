import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'src/environments/environment';
import { ClienteModel } from '../models/cliente.model';
import { ResultadoModel } from '../models/resultado.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  getClientes() {
    return this.http.get<ClienteModel[]>(url.clientes);
  }

  guardar(cliente: ClienteModel) {
    return this.http.post<ResultadoModel>(url.guardar, cliente);
  }

  buscarCliente(id: number) {
    return this.http.get<ClienteModel>(`${ url.cliente }?id=${ id }`)
  }

  eliminar(id: number) {
    return this.http.delete<ResultadoModel>(`${ url.eliminar }?id=${ id }`)
  }
}
