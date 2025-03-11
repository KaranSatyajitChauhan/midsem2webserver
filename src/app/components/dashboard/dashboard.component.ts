import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  balance: number = 0; // Initialize balance
  finalBalance: number = 0; // Initialize finalBalance
  email: string = '';
  firstname:string='';
  lastname:string='';
  gmail:string='';
  mobilenumber:string='';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getBalance();
    this.getAccountInformantion()
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Assuming token is stored in localStorage
  }
  getAccountInformantion() {
    const token = this.authService.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      this.email = decoded.email;  // Extract email from token
      console.log('Decoded Email:', this.email);

      this.authService.getAccountInfo(this.email).subscribe(
        (response: any) => {
          console.log('Account Info:', response.account);
          // Handle response data as needed

          this.gmail=response.account.email;
          this.firstname= response.account.firstName;
          this.lastname=response.account.lastName;
          this.mobilenumber = response.account.mobilePhone;
        },
        error => console.error('Error fetching account info:', error)
      );
    }
  }
  getBalance() {
    this.authService.getBalance().subscribe(
      (response) => {
        this.balance = response.balance;  
        this.finalBalance = response.finalBalance;  
      },
      (error) => {
        console.error('Error fetching balance:', error);
      }
    );
  }

  getAccountInfo() {
    this.router.navigate(['/get-account-info']);
  }

  navigateToTransfer() {
    this.router.navigate(['/transfer']);
  }

  navigateToDeposit() {
    this.router.navigate(['/deposit']);
  }

  goBackToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigateToWithdraw() {
    this.router.navigate(['/withdraw']);
  }

  navigateToTransactionHistory() {
    this.router.navigate(['/transaction-history']);
  }

}
