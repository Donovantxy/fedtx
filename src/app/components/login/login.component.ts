import { AuthService } from './../../services/auth.service';
import { AppValidators } from './../../utils/validators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

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
      firstName: ['', [Validators.required ]],
      lastName: ['', [Validators.required ]],
      email: ['', [Validators.required, Validators.pattern(new RegExp(AppValidators.emailRegEx))]],
      password: ['', [Validators.required, Validators.minLength(8), AppValidators.passwordLogin()]],
    });

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

}
