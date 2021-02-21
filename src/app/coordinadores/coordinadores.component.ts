import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../services/breadcrumb.service';

@Component({
  selector: 'app-coordinadores',
  templateUrl: './coordinadores.component.html',
  styleUrls: ['./coordinadores.component.css']
})
export class CoordinadoresComponent implements OnInit {
  url = 'http://localhost:3050/usuarios'
  listaCoordinadores = [];
  selectedCoordinador = [];
  constructor(private http: HttpClient, private confirmationService: ConfirmationService,
    private bService: BreadcrumbService) { }

  ngOnInit(): void {
    this.bService.vaciar();
    this.bService.push(
      {
        label: 'Inicio'
      } as MenuItem);
    this.bService.push(
      {
        label: 'Coordinadores',
        routerLink: ['/coordinadores']
      } as MenuItem);
    this.fetchAll();
  }

  fetchAll(){
    this.http.get<any>(`${this.url}/coordinadores`).subscribe(results => {

      results.forEach(element => {

        var coordinador = {
          id: element.id,
          nombre: element.nombre,
          email: element.email,
          telefono: element.telefono,
          roles_id: element.roles_id
        }
        this.listaCoordinadores.push(coordinador);
      })


    });
  }

  eliminarCoordinador(coordinador) {
    this.confirmationService.confirm({
      message: '¿Estas seguro/a de que quieres eliminar el Coordinador con id: ' + coordinador.id + '?',
      header: 'Confirmar Acción',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete<any>(`${this.url}/${coordinador.id}`).subscribe(responseData => {
          if (responseData.message == 'Usuario eliminado correctamente') {
            this.listaCoordinadores = this.listaCoordinadores.filter(val => val.id !== coordinador.id);
          }
  
        });
      }
    });
  }


}
