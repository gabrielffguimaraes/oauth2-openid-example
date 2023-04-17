import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from './services/login/login.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private route : Router, private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers = request.headers.append('X-Requested-with','XMLHttpRequest');
  
    let token = localStorage.getItem('jwtToken')!;
    if(this.loginService.isLogged()) {
       headers = headers.append('Authorization' , token); 
    }
    const xhr = request.clone({
      headers
    });
    return next.handle(xhr).pipe(
      catchError((response: any) => {
        if(response.status == 401) {
          this.route.navigate(['/login']);
          localStorage.clear();
        }
        return throwError(response);
      })
    );
  }
}
