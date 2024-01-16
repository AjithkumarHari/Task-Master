import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHanlderService implements ErrorHandler {

  constructor(private router: Router) { }
  handleError(error: any): void {
  
    if (error instanceof HttpErrorResponse) {
      if(error.status==500)
        this.router.navigate(['/serverError'])
        console.log('server error',error) 
    } else {
      console.warn('client error',error);   
    }
    throw new Error('Method not implemented.');
  }
}
