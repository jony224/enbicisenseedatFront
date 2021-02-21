import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from './app.component';
import { PaseosComponent } from './paseos/paseos.component';
import { VoluntariosComponent } from './voluntarios/voluntarios.component';
import { AppRoutingModule } from './app-routing.module';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CoordinadoresComponent } from './coordinadores/coordinadores.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './header/header.module';
import { BeneficiariosComponent } from './beneficiarios/beneficiarios.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { AgregarVoluntarioComponent } from './agregar-voluntario/agregar-voluntario.component';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { SignupComponent } from './login/signup/signup.component';
import { LoginComponent } from './login/login/login.component';
import { AgregarCoordinadorComponent } from './agregar-coordinador/agregar-coordinador.component';
import { AgregarBeneficiarioComponent } from './agregar-beneficiario/agregar-beneficiario.component';
import { AgregarVehiculoComponent } from './agregar-vehiculo/agregar-vehiculo.component';
import { EntidadesComponent } from './entidades/entidades.component';
import { AgregarEntidadComponent } from './agregar-entidad/agregar-entidad.component';
import { CalendarModule } from 'primeng/calendar';
import { AgregarPaseoComponent } from './agregar-paseo/agregar-paseo.component';
import { ListboxModule } from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { OrderListModule } from 'primeng/orderlist';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { PasswordModule } from 'primeng/password';
import { InputSwitchModule } from 'primeng/inputswitch';


import { AuthInterceptorService } from "./services/auth-interceptor.service";
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';


@NgModule({
  declarations: [
    AppComponent,
    VoluntariosComponent,
    CoordinadoresComponent,
    BeneficiariosComponent,
    VehiculosComponent,
    PaseosComponent,
    AgregarVoluntarioComponent,
    SignupComponent,
    LoginComponent,
    AgregarCoordinadorComponent,
    AgregarBeneficiarioComponent,
    AgregarVehiculoComponent,
    EntidadesComponent,
    AgregarEntidadComponent,
    AgregarPaseoComponent,
    HomeComponent,
    ChangePasswordComponent,
    ConfiguracionComponent
  ],
  exports: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NgbModule,
    BrowserAnimationsModule,
    HeaderModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    CalendarModule,
    MessagesModule,
    MessageModule,
    TableModule,
    ListboxModule,
    DropdownModule,
    TabViewModule,
    ButtonModule,
    CardModule,
    MenuModule,
    TabMenuModule,
    ToastModule,
    TooltipModule,
    PasswordModule,
    InputSwitchModule,
    ConfirmDialogModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    OrderListModule


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
