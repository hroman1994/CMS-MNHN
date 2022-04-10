import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError} from 'rxjs';
import { StorageService } from './storage.service';
import { catchError } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private ss: StorageService, private router:Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(this.ss.getCurrentToken())
    if(this.ss.getCurrentToken()){
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.ss.getCurrentToken()}`
        },
      });
    }
    return next.handle(req).pipe(catchError(x=> this.handleAuthError(x))); 
  }


  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
        //navigate /delete cookies or whatever
        this.router.navigateByUrl(`/login`);

    }
    return throwError(err);
  }
}