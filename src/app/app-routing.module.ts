import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaseosComponent } from './paseos/paseos.component';
import { VoluntariosComponent } from './voluntarios/voluntarios.component';
import { BeneficiariosComponent } from './beneficiarios/beneficiarios.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { CoordinadoresComponent } from './coordinadores/coordinadores.component';
import { AgregarVoluntarioComponent } from './agregar-voluntario/agregar-voluntario.component';
import { AgregarBeneficiarioComponent } from './agregar-beneficiario/agregar-beneficiario.component';
import { AgregarCoordinadorComponent } from './agregar-coordinador/agregar-coordinador.component';
import { AgregarVehiculoComponent } from './agregar-vehiculo/agregar-vehiculo.component';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './login/signup/signup.component';
import { EntidadesComponent } from './entidades/entidades.component';
import { AgregarEntidadComponent } from './agregar-entidad/agregar-entidad.component';
import { AgregarPaseoComponent } from './agregar-paseo/agregar-paseo.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { AuthGuardService } from "./services/auth-guard.service";
import { ChangePasswordComponent } from './login/change-password/change-password.component';



const routes: Routes = [
{ path: '', component: LoginComponent },
{ path: 'voluntarios', component: VoluntariosComponent, canActivate: [AuthGuardService] },
{ path: 'paseos', component: PaseosComponent, canActivate: [AuthGuardService] },
{ path: 'beneficiarios', component: BeneficiariosComponent, canActivate: [AuthGuardService] },
{ path: 'vehiculos', component: VehiculosComponent, canActivate: [AuthGuardService] },
{ path: 'coordinadores', component: CoordinadoresComponent, canActivate: [AuthGuardService] },
{ path: 'entidades', component: EntidadesComponent, canActivate: [AuthGuardService] },
{ path: 'agregarVoluntario', component: AgregarVoluntarioComponent, canActivate: [AuthGuardService] },
{ path: 'agregarBeneficiario', component: AgregarBeneficiarioComponent, canActivate: [AuthGuardService] },
{ path: 'agregarCoordinador', component: AgregarCoordinadorComponent, canActivate: [AuthGuardService] },
{ path: 'agregarVehiculo', component: AgregarVehiculoComponent, canActivate: [AuthGuardService] },
{ path: 'agregarEntidad', component: AgregarEntidadComponent, canActivate: [AuthGuardService] },
{ path: 'agregarPaseo', component: AgregarPaseoComponent, canActivate: [AuthGuardService] },
{ path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuardService] },
{ path: 'login', component: LoginComponent },
{ path: 'registro', component: SignupComponent },
{ path: 'cambiarContrasena', component: ChangePasswordComponent },
{ path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
