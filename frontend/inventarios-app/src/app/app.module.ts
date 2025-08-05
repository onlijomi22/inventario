import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarProductosComponent } from './productos/listar/listar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormularioProductoComponent } from './productos/formulario/formulario.component';
import { FormularioTransaccionComponent} from './transacciones/formulario/formulario.component';
import { ListarComponent} from './transacciones/listar/listar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListarComponent,
    FormularioProductoComponent,
    ListarProductosComponent,
    FormularioTransaccionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
