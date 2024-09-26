import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { Inject, PLATFORM_ID } from "@angular/core";


export class AdminBillGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (this.authService.isAdminOrBill()) {
      return true;
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}