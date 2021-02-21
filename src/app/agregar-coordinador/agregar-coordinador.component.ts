import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../services/breadcrumb.service';

@Component({
  selector: 'app-agregar-coordinador',
  templateUrl: './agregar-coordinador.component.html',
  styleUrls: ['./agregar-coordinador.component.css']
})
export class AgregarCoordinadorComponent implements OnInit {


  signupForm: FormGroup;
  url = 'http://localhost:3050/usuarios';
  constructor(private http: HttpClient, private router: Router,
    private bService: BreadcrumbService) { }

  ngOnInit(): void {
    this.bService.push(
      {
        label: 'Agregar Coordinador',
        routerLink: ['/agregarCoordinador']
      } as MenuItem);
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      telefono: new FormControl("", [Validators.required])
    })
  }
  onSubmit() {

    console.log(this.signupForm.value);
    var postData = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      telefono: this.signupForm.value.telefono
    }
    this.http.post<any>(`${this.url}/coordinador`, postData).subscribe(responseData => {
      console.log(responseData);
      if (responseData.message != 'Ya existe un usuario con ese email') {
        this.router.navigate(['/coordinadores']);
      }
    });
    

  }
}
