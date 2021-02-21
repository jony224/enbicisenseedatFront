import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../services/breadcrumb.service';

@Component({
  selector: 'app-agregar-beneficiario',
  templateUrl: './agregar-beneficiario.component.html',
  styleUrls: ['./agregar-beneficiario.component.css']
})
export class AgregarBeneficiarioComponent implements OnInit {

  signupForm: FormGroup;
  listaEntidades = [];
  url = 'http://localhost:3050/usuarios';
  urlEntidades = 'http://localhost:3050/entidades';
  constructor(private http: HttpClient, private router: Router,
    private bService: BreadcrumbService) { }

  ngOnInit(): void {
    this.bService.push(
      {
        label: 'Agregar Beneficiario',
        routerLink: ['/agregarBeneficiario']
      } as MenuItem);
    this.signupForm = this.createFormGroup();
    this.http.get<any>(`${this.urlEntidades}`).subscribe(results => {

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

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      telefono: new FormControl("", [Validators.required]),
      entidad: new FormControl(null, [Validators.required])
    })
  }
  onSubmit() {

    console.log(this.signupForm.value);
    this.http.post<any>(`${this.url}/beneficiario`, this.signupForm.value).subscribe(responseData => {
      console.log(responseData);
      if (responseData.message != 'Ya existe un usuario con ese email') {
        this.router.navigate(['/beneficiarios']);
      }

    });

  }

}
