import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserprofileService } from '../service/userprofile.service';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserModel } from '../model/user.model';
import { Subscription } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit, OnDestroy {
  searchCriteria: string = 'username';  // Default search criteria
  searchValue: string = '';             // Input search value
  users: UserModel[] = [];              // Array to store search results
  isLoading: boolean = false;           // Loading state indicator
  errorMessage: string = '';            // Error message display
  user!: UserModel;                     // Currently logged in user profile
  data: any;                            // Data received from the getData method
  private subscription: Subscription = new Subscription();  // Manage additional subscriptions

  constructor(
    private userProfileService: UserprofileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // Method to handle user search
  onSearch(): void {
    if (this.searchValue.trim() === '') {
      this.errorMessage = 'Please enter a search value.';
      return;
    }

    this.isLoading = true;
    const searchSubscription = this.userProfileService.searchUsers(this.searchCriteria, this.searchValue)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) => {
          this.users = data;
          this.isLoading = false;
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = 'Error occurred while searching for users.';
          this.isLoading = false;
          console.error('Error fetching search results:', err);
        }
      });

    this.subscription.add(searchSubscription);
  }

  // Method to load user profile
  loadUserProfile(): void {
    this.userProfileService.getUserProfile()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (user) => {
          if (user) {
            this.user = user;
          }
        },
        error: (err) => {
          console.error('Error loading user profile:', err);
        }
      });
  }

  ngOnDestroy(): void {
    // Clean up any additional subscriptions
    this.subscription.unsubscribe();
  }
}
