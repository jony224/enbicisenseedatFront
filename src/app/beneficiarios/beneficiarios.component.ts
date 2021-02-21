import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../services/breadcrumb.service';

@Component({
  selector: 'app-beneficiarios',
  templateUrl: './beneficiarios.component.html',
  styleUrls: ['./beneficiarios.component.css']
})
export class BeneficiariosComponent implements OnInit {

  url = 'http://localhost:3050/usuarios';
  listaBeneficiarios = [];
  selectedBeneficiario: any[];

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
        label: 'Beneficiarios',
        routerLink: ['/beneficiarios']
      } as MenuItem);
    this.fetchAll();
  }

  fetchAll() {
    this.http.get<any>(`${this.url}/beneficiarios`).subscribe(results => {

      results.forEach(element => {
        var beneficiarios = {
          id: element.id,
          nombre: element.nombre,
          email: element.email,
          entidadNombre: element.entidadNombre,
          telefono: element.telefono,
          roles_id: element.roles_id
        }
        this.listaBeneficiarios.push(beneficiarios);
      })
    });
  }
  eliminarBeneficiario(beneficiario) {

    this.confirmationService.confirm({
      message: '¿Estas seguro/a de que quieres eliminar el beneficiario con id: ' + beneficiario.id + '?',
      header: 'Confirmar Acción',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete<any>(`${this.url}/${beneficiario.id}`).subscribe(responseData => {
          if (responseData.message == 'Usuario eliminado correctamente') {
            this.listaBeneficiarios = this.listaBeneficiarios.filter(val => val.id !== beneficiario.id);
          }
  
        });
      }
    });
  }


}
