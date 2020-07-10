import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let newReq = req;
    if (token) {
      const headers = req.headers.set('Authorization', token);
      newReq = req.clone({ headers });
    }
    return next.handle(newReq);
  }

}