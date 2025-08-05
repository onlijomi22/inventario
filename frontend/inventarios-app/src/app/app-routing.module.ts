import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarProductosComponent as ListarProductosComponent } from './productos/listar/listar.component';
import { FormularioProductoComponent as FormularioProductosComponent } from './productos/formulario/formulario.component';

import { ListarComponent as ListarTransaccionesComponent } from './transacciones/listar/listar.component';
import { FormularioTransaccionComponent as FormularioTransaccionesComponent } from './transacciones/formulario/formulario.component';

const routes: Routes = [
  { path: '', redirectTo: 'transacciones', pathMatch: 'full' },

  // Rutas para productos
  { path: 'productos', component: ListarProductosComponent },
  { path: 'productos/nuevo', component: FormularioProductosComponent },
  { path: 'productos/editar/:id', component: FormularioProductosComponent },

  // Rutas para transacciones
  { path: 'transacciones', component: ListarTransaccionesComponent },
  { path: 'transacciones/nuevo', component: FormularioTransaccionesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
