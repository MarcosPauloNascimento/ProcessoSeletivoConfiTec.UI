import { ListarUsuarioComponent } from './listar/listar-usuario.component';
import { NovoUsuarioComponent } from './novo/usuario.component';
import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    NovoUsuarioComponent,
    ListarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt' },
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
