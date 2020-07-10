import { USER_STATUS } from './../../utils/constants';
import { Login, Logout } from './../actions/user.actions';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { State, Store, StateContext, Action } from '@ngxs/store';


export interface UserState {
  user: User;
  isLoggedIn: boolean;
  loginTime: Date;
}

const defaultState = {
  user: null,
  isLoggedIn: false,
  loginTime: null
};

@State<UserState>({
  name: 'user',
  defaults: defaultState
})

@Injectable()
export class UserStore {
  constructor(private store: Store) {}


  @Action(Login)
  login({ getState, setState }: StateContext<UserState>, {payload}) {
    setState({
      user: payload,
      isLoggedIn: true,
      loginTime: new Date(Date.now())
    });
    localStorage.setItem(USER_STATUS, JSON.stringify(getState()));
  }

  @Action(Logout)
  logout() {
    this.store.reset(defaultState);
    localStorage.removeItem(USER_STATUS);
  }

}
