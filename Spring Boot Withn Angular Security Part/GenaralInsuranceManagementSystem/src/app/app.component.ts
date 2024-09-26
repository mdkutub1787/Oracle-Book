import { Component, PLATFORM_ID, Inject } from '@angular/core';
import {  Router } from '@angular/router';
import { UntilDestroy,  } from '@ngneat/until-destroy';
import { AuthService } from './service/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GeneralInsuranceManagementSystem';

  isAdmin = false;
  isPharmacist = false;
  isUser = false;

  userRole: string | null = null;


  constructor( public authService: AuthService, private router:Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}


  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.authService.userRole$.subscribe(role => {
      this.isAdmin = role === 'ADMIN';
      // this.isBill = role === 'BILL';
      this.isUser = role === 'USER';
    });
  }


  
}
