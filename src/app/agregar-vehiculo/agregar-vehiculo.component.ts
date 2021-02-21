import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../services/breadcrumb.service';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.css']
})
export class AgregarVehiculoComponent implements OnInit {

  signupForm: FormGroup;
  listaEstados = [
    { name: 'Nuevo' },
    { name: 'Desagastado' },
    { name: 'Estropeado' },
  ]
  url = 'http://localhost:3050/vehiculos';
  constructor(private http: HttpClient, private router: Router,
    private bService: BreadcrumbService) { }

  ngOnInit(): void {
    this.bService.push(
      {
        label: 'Agregar Vehículo',
        routerLink: ['/agregarVehiculo']
      } as MenuItem);
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      estado: new FormControl(null, [Validators.required]),
      localizacion: new FormControl("", [Validators.required])
    })
  }
  onSubmit() {

    console.log(this.signupForm.value);
    var postData = {
      estado: this.signupForm.value.estado.name,
      localizacion: this.signupForm.value.localizacion
    }
    this.http.post(`${this.url}`, postData).subscribe(responseData => {
      console.log(responseData);

    });
    this.router.navigate(['/vehiculos']);

  }

}
