import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../services/breadcrumb.service';


@Component({
  selector: 'app-agregar-paseo',
  templateUrl: './agregar-paseo.component.html',
  styleUrls: ['./agregar-paseo.component.css']
})



export class AgregarPaseoComponent implements OnInit {

  date2: Date;
  es: any;
  isLoadedVoluntario = false;
  isLoadedBeneficiario = false;
  isLoadedVehiculo = false;
  selectedVoluntario: any;
  selectedBeneficiario: any;
  selectedVehiculo: any;
  listaVoluntarios = [];
  listaBeneficiarios = [];
  listaVehiculos = [];

  signupForm: FormGroup;
  url = 'http://localhost:3050/paseos';
  urlVoluntarios = 'http://localhost:3050/usuarios/voluntarios';
  urlEntidades = 'http://localhost:3050/entidades';
  urlVehiculos = 'http://localhost:3050/vehiculos';
  constructor(private http: HttpClient, private router: Router,
    private bService: BreadcrumbService) {
  }


  ngOnInit(): void {
    this.bService.push(
      {
        label: 'Agregar Paseo',
        routerLink: ['/agregarPaseo']
      } as MenuItem);
    this.signupForm = this.createFormGroup();
    this.http.get<any>(`${this.urlVoluntarios}`).subscribe(results => {

      results.forEach(element => {
        var voluntario = {
          code: element.id,
          name: element.nombre,
          nivel: element.nivel

        }

        this.listaVoluntarios.push(voluntario);
      })
      console.log(this.listaVoluntarios);
      this.isLoadedVoluntario = true;
    });
    this.http.get<any>(`${this.urlEntidades}`).subscribe(results => {

      console.log(results);
      results.forEach(element => {
        var beneficiario = {
          code: element.id,
          name: element.nombre

        }

        this.listaBeneficiarios.push(beneficiario);
      })
      this.isLoadedBeneficiario = true;
    });
    this.http.get<any>(`${this.urlVehiculos}`).subscribe(results => {

      results.forEach(element => {
        var vehiculo = {
          code: element.id,
          estado: element.estado,
          localizacion: element.localizacion
        }

        this.listaVehiculos.push(vehiculo);
      })
      console.log(this.listaVehiculos);
      this.isLoadedVehiculo = true;
    });
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      fecha: new FormControl("", [Validators.required]),
      recogida: new FormControl("", [Validators.required]),
      recogidaVehiculo: new FormControl("", [Validators.required]),
      voluntario: new FormControl("", [Validators.required]),
      beneficiario: new FormControl("", [Validators.required]),
      vehiculo: new FormControl("", [Validators.required])
    })
  }
  onSubmit() {

    var fechaVar = new Date(this.signupForm.value.fecha.getTime()+ 2*60*60*1000)
    var resultado = {
      
      fecha: fechaVar,
      recogida: this.signupForm.value.recogida,
      recogidaVehiculo: this.signupForm.value.recogidaVehiculo,
      usuarios_id: this.selectedVoluntario.code,
      beneficiario: this.selectedBeneficiario.name,
      vehiculos_id: this.selectedVehiculo.code

    }
    console.log(resultado);

    this.http.post(`${this.url}`, resultado).subscribe(responseData => {
      console.log(responseData);

    });
    this.router.navigate(['/paseos']);
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

  onSelectionChangeVoluntario(elemento){
    this.selectedVoluntario = elemento.value[0];
  }

  onSelectionChangeEntidad(elemento){
    this.selectedBeneficiario = elemento.value[0];
  }
  onSelectionChangeVehiculo(elemento){
    this.selectedVehiculo = elemento.value[0];

  }
}
