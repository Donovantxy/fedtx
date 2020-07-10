import { Login } from './../store/actions/user.actions';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient, private store: Store ) { }

  login(payload: User): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users`, payload)
    .pipe(tap(() => {
      this.store.dispatch(new Login(payload));
    }));
  }

}
