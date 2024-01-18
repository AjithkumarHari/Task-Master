import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Injectable()
export class UserAuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const authService = this.injector.get(AuthService)

    const authReq = request.clone({
      setHeaders : {
        'Content-Type' : 'application/json',
        Authorization : `User-Bearer ${authService.getToken()}`
      },
    })
    return next.handle(authReq)
    .pipe(
      catchError((res: Response) => {
        console.warn(
          'the interceptor has caught an responce',
        );
        if(res.status==404){
          this.router.navigate(['/**']);
        }
        if(res.status==401){
          console.log('unautherized');
        }
        return throwError(() => res);
      })
    )
  }
  
}
