import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const headers = req.headers
      .set('Authorization', 'projeto2-7e62b');
    let url = req.url;
    if (!req.url.startsWith('http') && !req.url.includes('/assets/')) {
      const apiUrl = 'http://desafio4devs.forlogic.net/api';
      url = req.url.includes(apiUrl) ? req.url : apiUrl + req.url;
    }
    const authReq = req.clone({
      headers: headers,
      url: url
    });

    return next.handle(authReq)
      .pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse)
            if (err.status === 0) {
              console.log('Check your internet connection and try again later');
            } else if (err.status === 401) {
              this.snackBar.open('não autorizado', 'OK', { duration: 3000 });
            } else if (err.status === 403) {
              this.snackBar.open('Permissão negada', 'OK', { duration: 3000 });
            } else if (err.status === 409) {
              this.snackBar.open('Registro duplicado', 'OK', { duration: 3000 });
            }

          return throwError(err);
        })
      );
  }

}
