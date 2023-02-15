import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  template: `
  <h2>Belépés</h2>

  <form [formGroup]="loginForm" (ngSubmit)="login()">
      <div class="mt-3">
          <input type="text"
          placeholder="e-mail"
          class="form-control"
          formControlName="email"
          >
      </div>
      <div class="mt-3">
          <input type="password"
          placeholder="jelszó"
          class="form-control"
          formControlName="password"
          >
      </div>
      <button type="submit" class="btn btn-primary mt-3">Belépés</button>
  </form>
  `, 
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup
  
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private app: AppComponent
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  login() {
    let email = this.loginForm.value.email;
    let pass = this.loginForm.value.password;
    this.auth.login(email, pass)
    .subscribe({
      next: data => {
        console.log(data.token)
        console.log(data.name)
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        this.app.isLoggedIn = true;

        localStorage.setItem('isLoggedIn', JSON.stringify(this.app.isLoggedIn));
      },
      error: err => {
        console.log('Hiba! Az azonosítás sikertelen!')
      }
    });
  }
}
