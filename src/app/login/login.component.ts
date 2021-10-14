import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  statusMessage: string = '';
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
    this.loginForm.updateValueAndValidity();
  }

  register(): void {
    console.log(this.loginForm);
    const email = this.loginForm.get('username').value;
    const pwd = this.loginForm.get('password').value;
    this.loginService.register(email, pwd).subscribe((res) => {
      if (res.status === 'OK') {
        this.statusMessage = 'Registrazione completata, ora puoi accedere';
      } else {
        this.statusMessage = 'Utente già presente';
      }
    });
    console.log(this.loginService.users);
  }

  login(): void {
    console.log(this.loginForm);
    const email = this.loginForm.get('username').value;
    const pwd = this.loginForm.get('password').value;
    this.loginService.login(email, pwd).subscribe((res) => {
      if (res.status === 'OK') {
        console.log(res.value);
        this.statusMessage = 'Login avvenuto con successo';
        this.router.navigate(['home']);
      }
    });
  }
}
