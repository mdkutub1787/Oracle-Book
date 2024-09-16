import { Component, OnInit } from '@angular/core';
import { PolicyModel } from '../../model/policy.model';
import { PolicyService } from '../../service/policy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createpolicy',
  templateUrl: './createpolicy.component.html',
  styleUrls: ['./createpolicy.component.css']
})
export class CreatepolicyComponent implements OnInit {

  policy: PolicyModel = new PolicyModel();
  errorMessage: string = '';
  submitted = false;

  constructor(
    private policyService: PolicyService,
    private router: Router
  ) {}

  ngOnInit() {}

  // Reset the form and create a new policy object
  newPolicy(): void {
    this.submitted = false;
    this.policy = new PolicyModel();
  }

  // Handle the form submission to create a new policy
  createPolicy() {
    this.policyService.createPolicy(this.policy)
      .subscribe({
        next: (data) => {
          console.log('Policy created successfully', data);
          this.router.navigate(['/viewpolicy']);
        },
        error: (err) => {
          console.error('Error occurred while creating policy', err);
          this.errorMessage = 'There was an error creating the policy. Please try again.';
        }
      });
  }

  // Submit the form and call createPolicy method
  onSubmit() {
    this.submitted = true;
    this.createPolicy();
  }

}
