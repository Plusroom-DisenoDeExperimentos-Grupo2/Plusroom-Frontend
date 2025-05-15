import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'; // Importamos AppComponent

const routes: Routes = [
  { path: '', component: AppComponent } // La ruta por defecto carga AppComponent
  // Aquí puedes agregar más rutas para otros componentes de tu aplicación
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
