import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) { }


  login(payload: User): Observable<any> {
    delete payload.password;
    return this.http.post(`${environment.apiUrl}/users`, payload)
    .pipe(tap(resp => {
      console.log(resp);
    }));
  }

  logout(username: string): Observable<any> {
    return of([]);
  }

}
