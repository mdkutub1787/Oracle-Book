import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { PolicyService } from './service/policy.service';
import { ActivatedRoute,  Router } from '@angular/router';
import { UntilDestroy,  } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GeneralInsuranceManagementSystem';

  @ViewChild('sidenav') sidenav!: any; // Replace with the correct type if available

  constructor(
    private policyService: PolicyService,

    private router: Router,
    private route: ActivatedRoute
  ) {}

  
}
