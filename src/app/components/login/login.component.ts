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
      firstName: ['Fulvio', [Validators.required ]],
      lastName: ['Cosco', [Validators.required ]],
      email: ['ciao@ciao.com', [Validators.required, Validators.pattern(new RegExp(AppValidators.emailRegEx))]],
      password: ['ciaociA0fulvi', [Validators.required, Validators.minLength(8), AppValidators.passwordLogin()]],
    });

  }

  login() {
    this.isLogging = true;
    this.loginForm.disable();
    this.authService.login(this.loginForm.value)
    .subscribe(resp => {
      console.log(123, resp);
      // if ( resp.success ) {
        // this.router.navigate([`app/user`, resp.data.username]);
      // }
      this.loginForm.enable();
      this.isLogging = false;
    });
  }

}
