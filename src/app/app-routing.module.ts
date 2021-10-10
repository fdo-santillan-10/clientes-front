import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteComponent } from './components/cliente/cliente.component';

const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: '**', redirectTo: 'clientes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
