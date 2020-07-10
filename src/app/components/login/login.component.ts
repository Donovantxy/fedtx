import { PW_ERR_MSG } from './../../utils/constants';
import { isInString } from './../../utils/functions';
import { AuthService } from './../../services/auth.service';
import { AppValidators } from './../../utils/validators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { merge } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  errorLogin = '';
  public loginForm: FormGroup;
  public isLogging = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      firstName: ['ciao', [Validators.required ]],
      lastName: ['miao', [Validators.required ]],
      email: ['ciao@miao.com', [Validators.required, Validators.pattern(new RegExp(AppValidators.emailRegEx))]],
      password: ['Asdfghjk', [Validators.required, Validators.minLength(8), AppValidators.passwordLogin()]],
    });
    this.checkPwDependingOnNameChanges();
  }

  login() {
    this.isLogging = true;
    this.loginForm.disable();
    /*
      We don't need to unsubscribe an observable from a http request,
      because Angular finalizes itself already
    */
    this.authService.login(this.loginForm.value)
    .subscribe(resp => {
      // usually from the response we can get if the request is successfull or not,
      // here we suppose it's always status 200
      this.router.navigate([`app/user`]);
      this.loginForm.enable();
      this.isLogging = false;
    });
  }

  private checkPwDependingOnNameChanges() {
    merge(
      this.loginForm.get('firstName').valueChanges,
      this.loginForm.get('lastName').valueChanges,
    ).subscribe(val => {
      const passwordCtrl = this.loginForm.get('password');
      passwordCtrl.setErrors(isInString([val], passwordCtrl.value) ? { passowrd: PW_ERR_MSG } : null);
    });
  }

}
