import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputsModule, WavesModule } from 'angular-bootstrap-md';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../services/breadcrumb.service';

@Component({
  selector: 'app-agregar-voluntario',
  templateUrl: './agregar-voluntario.component.html',
  styleUrls: ['./agregar-voluntario.component.css']
})
export class AgregarVoluntarioComponent implements OnInit {

  signupForm: FormGroup;
  url = 'http://localhost:3050/usuarios';
  listaNiveles = [
    { id: 0, nombre: 'Baja / Inactivo' },
    { id: 1, nombre: 'Novato' },
    { id: 2, nombre: 'Principiante' },
    { id: 3, nombre: 'Avanzado' },
    { id: 4, nombre: 'Capitán' },
  ]
  constructor(private http: HttpClient, private router: Router,
    private bService: BreadcrumbService) { }

  ngOnInit(): void {
    this.bService.push(
      {
        label: 'Agregar Voluntario',
        routerLink: ['/agregarVoluntario']
      } as MenuItem);
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      nombre: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      telefono: new FormControl("", [Validators.required]),
      nivel: new FormControl(null, [Validators.required])
    })
  }
  onSubmit() {
    console.log('hola');
    console.log(this.signupForm.value);
    var postData = {
      name: this.signupForm.value.nombre,
      email: this.signupForm.value.email,
      telefono: this.signupForm.value.telefono,
      nivel: this.signupForm.value.nivel.id
    }
    console.log(postData);
    this.http.post<any>(`${this.url}/voluntario`, postData).subscribe(responseData => {
      console.log(responseData);
      if (responseData.message != 'Ya existe un usuario con ese email') {
        this.router.navigate(['/voluntarios']);
      }
    });
    

  }

}
