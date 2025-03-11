import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Define a proper interface for accounts
interface Account {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
  accounts: Account[] = [];
  private subscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    this.authService.getAccounts().subscribe(
      (data) => {
        console.log('API Response:', data);
        this.accounts = Array.isArray(data) ? data : [];  // Ensure it's an array
      },
      (error) => {
        console.error('Error fetching accounts:', error);
        this.accounts = [];
      }
    );
  }
  

  navigateToAccountDetails(accountId: string): void {
    this.router.navigate([`/account-details/${accountId}`]);
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
