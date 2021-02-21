import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../services/breadcrumb.service';

@Component({
  selector: 'app-agregar-entidad',
  templateUrl: './agregar-entidad.component.html',
  styleUrls: ['./agregar-entidad.component.css']
})
export class AgregarEntidadComponent implements OnInit {

  signupForm: FormGroup;
  listaTipos = [];
  url = 'http://localhost:3050/entidades';
  urlTiposEntidad = 'http://localhost:3050/tiposEntidad';
  constructor(private http: HttpClient, private router: Router,
    private bService: BreadcrumbService) { }

  ngOnInit(): void {
    this.bService.push(
      {
        label: 'Agregar Entidad',
        routerLink: ['/agregarEntidad']
      } as MenuItem);
    this.signupForm = this.createFormGroup();
    this.http.get<any>(`${this.urlTiposEntidad}`).subscribe(results => {

      results.forEach(element => {
        var entidad = {
          id: element.id,
          nombre: element.nombre

        }
        this.listaTipos.push(entidad);
      })
    });
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      nombre: new FormControl("", [Validators.required]),
      tipo: new FormControl(null, [Validators.required])
    })
  }
  onSubmit() {

    console.log(this.signupForm.value);
    var postData = {
      nombre: this.signupForm.value.nombre,
      tipo: this.signupForm.value.tipo.id
    }
    this.http.post(`${this.url}`, postData).subscribe(responseData => {
      console.log(responseData);

    });
    this.router.navigate(['/entidades']);

  }

}
