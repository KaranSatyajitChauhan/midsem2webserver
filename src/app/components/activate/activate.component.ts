import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activate',
  imports: [ReactiveFormsModule],
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.scss'
})
export class ActivateComponent {
 activationForm: FormGroup;
  
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
      this.activationForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        activationCode: ['', [Validators.required]]
      });
}

activate() {
  console.log("Form submit")
  console.log(this.activationForm)
  const {email,activationCode} = this.activationForm.value;

  console.log(this.authService.activate(email,activationCode))
}



navigateToLogin() {
  this.router.navigate(['/login']); // Navigate to the register page
}
}
