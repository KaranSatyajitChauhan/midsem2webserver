import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
    loginForm: FormGroup;
  
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
    }

    login() {
      console.log("Form submit")
      console.log(this.loginForm)
      const {email,password} = this.loginForm.value;

      console.log(this.authService.login(email,password))
    }

    navigateToRegister() {
      this.router.navigate(['/register']); // Navigate to the register page
    }
  }