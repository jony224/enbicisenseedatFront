import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { BreadcrumbService } from '../services/breadcrumb.service';

@Component({
  selector: 'app-paseos',
  templateUrl: './paseos.component.html',
  styleUrls: ['./paseos.component.css']
})
export class PaseosComponent implements OnInit {

  url = 'http://localhost:3050/paseos';
  listaPaseos = [];
  listaPaseosHistorial = [];
  selectedPaseos: any[];
  selectedPaseosHistorial: any[];
  isAdmin = false;
  

  //Indicador de los paseos que se van a mostrar
  //paseosMostrar = 1 -> Proximos Paseos
  //paseosMostrar = 2 -> Historial de Paseos
  paseosMostrar: number;

  constructor(private http: HttpClient, private confirmationService: ConfirmationService,
    private bService: BreadcrumbService, private authService: AuthService) {
    this.paseosMostrar = 1;
  }

  

  ngOnInit(): void {
    this.authService.isUserLoggedAdmin$.subscribe((isAdmin)=> {
      this.isAdmin = isAdmin;
    })
    if(this.isAdmin){
      this.fetchAll();
    }else{
      this.fetchOne();
    }
    
    this.bService.vaciar();
    this.bService.push(
      {
        label: 'Inicio'
      } as MenuItem);
    this.bService.push(
      {
        label: 'Paseos',
        routerLink: ['/paseos']
      } as MenuItem);
    
  }

  fetchAll() {
  
    this.http.get<any>('http://localhost:3050/paseos').subscribe(results => {
    
      results.forEach(element => {

        var fechaRespuesta = element.fecha;
        var ano = fechaRespuesta.slice(0, 4);
        var mes = fechaRespuesta.slice(5, 7);
        var dia = fechaRespuesta.slice(8, 10);
        var hora = fechaRespuesta.slice(11, 13);
        var minuto = fechaRespuesta.slice(14, 16);

        var paseos = {
          id: element.id,
          fecha: `${dia}-${mes}-${ano}`,
          hora: `${hora}:${minuto}`,
          recogida: element.recogida,
          recogidaVehiculo: element.recogidaVehiculo,
          vehiculos_id: element.vehiculos_id,
          usuarios_id: element.nombreVoluntario,
          beneficiario: element.nombreBeneficiario,
          asistencia: element.asistencia
        }
        var fechaPaseo = new Date(ano, mes - 1, dia, hora, minuto);
        if (fechaPaseo > new Date()) {
          this.listaPaseos.push(paseos);
        } else {
          this.listaPaseosHistorial.push(paseos);
        }
        console.log(paseos);
      })
    });
  }

  fetchOne(){
    let userId = localStorage.getItem('userId');
    console.log(userId);
    this.http.get<any>(`http://localhost:3050/paseos/${userId}`).subscribe(results => {
    
      results.forEach(element => {

        var fechaRespuesta = element.fecha;
        var ano = fechaRespuesta.slice(0, 4);
        var mes = fechaRespuesta.slice(5, 7);
        var dia = fechaRespuesta.slice(8, 10);
        var hora = fechaRespuesta.slice(11, 13);
        var minuto = fechaRespuesta.slice(14, 16);

        var paseos = {
          id: element.id,
          fecha: `${dia}-${mes}-${ano}`,
          hora: `${hora}:${minuto}`,
          recogida: element.recogida,
          recogidaVehiculo: element.recogidaVehiculo,
          vehiculos_id: element.vehiculos_id,
          usuarios_id: element.nombreVoluntario,
          beneficiario: element.nombreBeneficiario,
          asistencia: element.asistencia
        }
        var fechaPaseo = new Date(ano, mes - 1, dia, hora, minuto);
        if (fechaPaseo > new Date()) {
          this.listaPaseos.push(paseos);
        } else {
          this.listaPaseosHistorial.push(paseos);
        }
      })
    });
  }
  
  confirmarAsistenciaSi(paseo){
    var postData = {
      id: paseo.id
    }

    this.http.put<any>(`${this.url}/asistenciaSi`, postData).subscribe(responseData => {
      if (responseData.message == 'Asistencia confirmada correctamente') {
        let index = this.listaPaseos.indexOf(paseo);
        this.listaPaseos[index].asistencia = 1;
      }
    })
  }
  confirmarAsistenciaNo(paseo){
    var postData = {
      id: paseo.id
    }

    this.http.put<any>(`${this.url}/asistenciaNo`, postData).subscribe(responseData => {
      if (responseData.message == 'Asistencia denegada correctamente') {
        let index = this.listaPaseos.indexOf(paseo);
        this.listaPaseos[index].asistencia = 2;
      }
    })
  }

  eliminarPaseo(paseo) {

    this.confirmationService.confirm({
      message: '¿Estas seguro/a de que quieres eliminar el Paseo con id: ' + paseo.id + '?',
      header: 'Confirmar Acción',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.http.delete<any>(`${this.url}/${paseo.id}`).subscribe(responseData => {
          if (responseData.message == 'Paseo eliminado correctamente') {
            this.listaPaseos = this.listaPaseos.filter(val => val.id !== paseo.id);
          }
        });
      }
    });
    
  }
  eliminarPaseoHistorial(paseo) {

    this.confirmationService.confirm({
      message: '¿Estas seguro/a de que quieres eliminar el Paseo con id: ' + paseo.id + '?',
      header: 'Confirmar Acción',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.http.delete<any>(`${this.url}/${paseo.id}`).subscribe(responseData => {
          if (responseData.message == 'Paseo eliminado correctamente') {
            this.listaPaseosHistorial = this.listaPaseosHistorial.filter(val => val.id !== paseo.id);
          }
        });
      }
    });
    
  }

}

