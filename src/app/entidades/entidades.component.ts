import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../services/breadcrumb.service';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.css']
})
export class EntidadesComponent implements OnInit {
  url = 'http://localhost:3050/entidades';
  listaEntidades = [];
  selectedEntidad: any[];

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
        label: 'Entidades',
        routerLink: ['/entidades']
      } as MenuItem);
    this.fetchAll();
  }

  fetchAll(){
    this.http.get<any>(`${this.url}`).subscribe(results => {

      results.forEach(element => {
        var entidad = {
          id: element.id,
          nombre: element.nombre,
          tipo: element.tipoNombre

        }
        this.listaEntidades.push(entidad);
      })
    });
  }

  eliminarEntidad(entidad) {

    this.confirmationService.confirm({
      message: '¿Estas seguro/a de que quieres eliminar la Entidad con id: ' + entidad.id + '?',
      header: 'Confirmar Acción',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.http.delete<any>(`${this.url}/${entidad.id}`).subscribe(responseData => {
          if (responseData.message == 'Entidad eliminada correctamente') {
            this.listaEntidades = this.listaEntidades.filter(val => val.id !== entidad.id);
          }
        });
      }
    });
  }
}


