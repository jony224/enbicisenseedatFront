import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../services/breadcrumb.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  url = 'http://localhost:3050/vehiculos';
  listaVehiculos = [];
  formAgregarVehiculo = false;
  selectedVehiculos: any[];

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
        label: 'Vehículos',
        routerLink: ['/vehiculos']
      } as MenuItem);
      this.fetchAll();
  }

  fetchAll() {
    this.http.get<any>('http://localhost:3050/vehiculos').subscribe(results => {

      results.forEach(element => {

        var vehiculos = {
          id: element.id,
          estado: element.estado,
          localizacion: element.localizacion,
        }
        this.listaVehiculos.push(vehiculos);
      })
    });
  }

  agregarVehiculo(){
    this.formAgregarVehiculo = !this.formAgregarVehiculo;
  }

  eliminarVehiculo(vehiculo) {

    this.confirmationService.confirm({
      message: '¿Estas seguro/a de que quieres eliminar el Vehículo con id: ' + vehiculo.id + '?',
      header: 'Confirmar Acción',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.http.delete<any>(`${this.url}/${vehiculo.id}`).subscribe(responseData => {
          if (responseData.message == 'Vehiculo eliminado correctamente') {
            this.listaVehiculos = this.listaVehiculos.filter(val => val.id !== vehiculo.id);
          }
        });
      }
    });
  }
}
