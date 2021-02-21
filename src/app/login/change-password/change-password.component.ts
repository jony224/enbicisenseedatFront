import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePassForm: FormGroup;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.changePassForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password1: new FormControl("", [Validators.required, Validators.minLength(7)]),
      newPassword: new FormControl("", [Validators.required, Validators.minLength(7)])
    })
  }
  cambiarContrasena(): void {
    this.authService
    .changePass(this.changePassForm.value.email, this.changePassForm.value.password1,
       this.changePassForm.value.newPassword)
    .subscribe((respuestaBackEnd) => console.log(respuestaBackEnd));

  }
}
