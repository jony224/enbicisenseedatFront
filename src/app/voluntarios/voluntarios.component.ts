import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../services/breadcrumb.service';



@Component({
  selector: 'app-voluntarios',
  templateUrl: './voluntarios.component.html',
  styleUrls: ['./voluntarios.component.css']
})
export class VoluntariosComponent implements OnInit {

  url = 'http://localhost:3050/usuarios';
  listaVoluntarios = [];
  botonSubir: boolean;
  botonBajar: boolean;

  selectedVoluntario: any[];

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
        label: 'Voluntarios',
        routerLink: ['/voluntarios']
      } as MenuItem);
    this.fetchAll();
  }

  fetchAll() {

    this.http.get<any>(`${this.url}/voluntarios`).subscribe(results => {

      results.forEach(element => {
        var botonSubirActivadoVar = true;
        var botonBajarActivadoVar = true;
        if (element.nivel >= 4) {
          botonSubirActivadoVar = false;
        }
        if (element.nivel <= 0) {
          botonBajarActivadoVar = false;
        }

        var voluntario = {
          id: element.id,
          nombre: element.nombre,
          email: element.email,
          telefono: element.telefono,
          roles_id: element.roles_id,
          nivel: element.nivel,
          color: this.convertirNivel(element.nivel).color,
          botonSubirActivado: botonSubirActivadoVar,
          botonBajarActivado: botonBajarActivadoVar
        }
        this.listaVoluntarios.push(voluntario);
      })
    });
  }


  convertirNivel(nivel): any {
    var nivelString: any;

    switch (nivel) {
      case 0: {
        nivelString = {
          nivel: 'Baja / Inactivo',
          color: 'lightcoral'
        }
        break;
      }
      case 1: {
        nivelString = {
          nivel: 'Novato',
          color: 'cyan'
        }
        break;
      }
      case 2: {
        nivelString = {
          nivel: 'Principiante',
          color: 'blue'
        }
        break;
      }
      case 3: {
        nivelString = {
          nivel: 'Avanzado',
          color: 'orange'
        }
        break;
      }
      case 4: {
        nivelString = {
          nivel: 'Capitán',
          color: 'red'
        }
        break;
      }
      default: {
        nivelString = {
          nivel: 'Rol',
          color: 'green'
        }
        break;
      }
    }
    return nivelString;
  }

  eliminarVoluntario(voluntario) {

    this.confirmationService.confirm({
      message: '¿Estas seguro/a de que quieres eliminar la Voluntario con id: ' + voluntario.id + '?',
      header: 'Confirmar Acción',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.http.delete<any>(`${this.url}/${voluntario.id}`).subscribe(responseData => {
          if (responseData.message == 'Usuario eliminado correctamente') {
            this.listaVoluntarios = this.listaVoluntarios.filter(val => val.id !== voluntario.id);
          }
        });
      }
    });

  }

  subirNivel(elemento) {
    this.confirmationService.confirm({
      message: '¿Estas seguro/a de que quieres subir de nivel a este usuario?',
      accept: () => {
        this.listaVoluntarios.find(x => x.id === elemento).nivel = this.listaVoluntarios.find(x => x.id === elemento).nivel + 1;
        this.listaVoluntarios.find(x => x.id === elemento).color = this.convertirNivel(this.listaVoluntarios.find(x => x.id === elemento).nivel).color;
        if (this.listaVoluntarios.find(x => x.id === elemento).nivel == 4) {
          this.listaVoluntarios.find(x => x.id === elemento).botonSubirActivado = false;
        }
        if (this.listaVoluntarios.find(x => x.id === elemento).nivel == 1) {
          this.listaVoluntarios.find(x => x.id === elemento).botonBajarActivado = true;
        }
        var postData = {
          id: elemento,
          nivel: this.listaVoluntarios.find(x => x.id === elemento).nivel
        }

        this.http.put(`${this.url}/nivel`, postData).subscribe(responseData => {
          console.log(responseData);
        })
      }
    });

  }

  bajarNivel(elemento, indice) {
    this.confirmationService.confirm({
      message: '¿Estas seguro/a de que quieres bajar de nivel a este usuario?',
      accept: () => {
        this.listaVoluntarios.find(x => x.id === elemento).nivel = this.listaVoluntarios.find(x => x.id === elemento).nivel - 1;
        this.listaVoluntarios.find(x => x.id === elemento).color = this.convertirNivel(this.listaVoluntarios.find(x => x.id === elemento).nivel).color;
        if (this.listaVoluntarios.find(x => x.id === elemento).nivel == 3) {
          this.listaVoluntarios.find(x => x.id === elemento).botonSubirActivado = true;
        }
        if (this.listaVoluntarios.find(x => x.id === elemento).nivel == 0) {
          this.listaVoluntarios.find(x => x.id === elemento).botonBajarActivado = false;
        }
        var postData = {
          id: elemento,
          nivel: this.listaVoluntarios.find(x => x.id === elemento).nivel
        }
        this.http.put(`${this.url}/nivel`, postData).subscribe(responseData => {
          console.log(responseData);
        })
      }
    });
  }
  
}
