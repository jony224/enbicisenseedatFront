import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';

import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:3050/auth"

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  isUserLoggedAdmin$ = new BehaviorSubject<boolean>(false);
  userId: Pick<User, "id">;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router) { }

  registro(user: Omit<User, "id">): Observable<User> {
    return this.http.post<User>(`${this.url}/signup`, user, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>("signup"))
    )

  }

  login(email: Pick<User, "email">, password: Pick<User, "password">): Observable<{
    token: string; 
    userId: Pick<User, "id">;
  }> {
    return this.http
      .post(`${this.url}/login`, { email, password }, this.httpOptions).pipe(
        first(),
        tap((tokenObject: { token: string; userId: Pick<User, "id">; roleUser: string}) => {
          this.userId = tokenObject.userId;
          localStorage.setItem("token", tokenObject.token);
          localStorage.setItem("userId", tokenObject.userId.toString());
          this.isUserLoggedIn$.next(true);
          if(tokenObject.roleUser === 'admin'){
            this.router.navigate(["paseos"]);
            this.isUserLoggedAdmin$.next(true);
          }else{
            this.router.navigate(["paseos"]);
          }
          
        }),
        catchError(this.errorHandlerService.handleError<{
          token: string; userId: Pick<User, "id">
        }>("login"))
      )

  }

  changePass(email, password1, newPassword, ): Observable<any>{
    console.log('llego auth');
    return this.http
    .post(`${this.url}/changePass`, { password1,  newPassword, email }, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<any>("changePass"))
    )
  }
}
