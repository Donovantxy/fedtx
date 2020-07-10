import { UserState } from './../../store/state/user.state';
import { Logout } from './../../store/actions/user.actions';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { USER_STATUS } from 'src/app/utils/constants';
import { Store } from '@ngxs/store';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  firstName: string;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    const userState: UserState = this.getUserState();
    if (!userState) {
      this.router.navigate(['']);
    }
    this.firstName = userState?.user.firstName;
  }

  logout() {
    this.store.dispatch(new Logout())
    .subscribe((userState: UserState) => {
      if ( !userState.isLoggedIn ) {
        this.router.navigate(['']);
      }
    });
  }

  private getUserState(): UserState {
    const user = localStorage.getItem(USER_STATUS);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}
