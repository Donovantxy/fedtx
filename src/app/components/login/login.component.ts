import { PW_ERR_MSG } from './../../utils/constants';
import { isInString } from './../../utils/functions';
import { AuthService } from './../../services/auth.service';
import { AppValidators } from './../../utils/validators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { merge, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  errorLogin = '';
  public loginForm: FormGroup;
  public isLogging = false;
  private subscribe: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      firstName: ['fulvio', [Validators.required ]],
      lastName: ['cosco', [Validators.required ]],
      email: ['ciao@cao.com', [Validators.required, Validators.pattern(new RegExp(AppValidators.emailRegEx))]],
      password: ['ciaociA0', [Validators.required, Validators.minLength(8), AppValidators.passwordLogin()]],
    });
    this.checkPwDependingOnNameChanges();
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  login() {
    this.isLogging = true;
    this.loginForm.disable();
    /*
      We don't need to unsubscribe an observable from a http request,
      because Angular finalizes itself already
    */
    console.log(this.loginForm, this.loginForm.value);
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
    this.subscribe = merge(
      this.loginForm.get('firstName').valueChanges,
      this.loginForm.get('lastName').valueChanges,
    ).subscribe(val => {
      const passwordCtrl = this.loginForm.controls?.password;
      passwordCtrl.setErrors(isInString([val], passwordCtrl.value) ? { password: PW_ERR_MSG } : null);
    });
  }

}
