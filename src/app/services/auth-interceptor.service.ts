import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { MessageService } from 'primeng/api';

import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private messageService: MessageService, private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    let req = request;
    if (token) {
      req = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + token)
      })

    }
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body.message) {
            this.messageService.add(
              {
                severity: 'success',
                summary: null,
                detail: event.body.message,
                closable: false
              }
            );
          }
        }
        return event;
      }),
      catchError((e: HttpErrorResponse) => {
        if (e.status === 403) {
          this.messageService.add(
            {
              severity: 'error',
              summary: e.statusText,
              detail: 'La sesión ha caducado',
              closable: false
            }

          );
          //logout
        } else {
          if (e.error.error.message == 'jwt expired') {
            localStorage.removeItem("token");
            this.authService.isUserLoggedIn$.next(false);
            this.authService.isUserLoggedAdmin$.next(false);
            this.router.navigate(["login"]);
          }
          if (e.error) {
            console.log(e.error);
            this.messageService.add(
              {
                severity: 'error',
                summary: 'Error',
                detail: e.error.error.message,
                closable: false
              }
            );
          }
        }
        return throwError(e);
      })
    );
  }
}
