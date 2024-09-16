import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PolicyModel } from '../../model/policy.model';
import { PolicyService } from '../../service/policy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createpolicy',
  templateUrl: './createpolicy.component.html',
  styleUrls: ['./createpolicy.component.css']
})
export class CreatepolicyComponent implements OnInit {

  formValue!: FormGroup;
  policy: PolicyModel = new PolicyModel();
  errorMessage: string = ''; 

  constructor(
    private policyService: PolicyService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const currentDate = new Date().toISOString().substring(0, 10);

    this.formValue = this.formBuilder.group({
      date: [currentDate],
      bankName: ['', Validators.required],  
      policyholder: ['', Validators.required], 
      address: ['', Validators.required], 
      sumInsured: ['', [Validators.required, Validators.min(1)]],  
      stockInsured: ['', Validators.required],  
      interestInsured: ['', Validators.required],  
      coverage: ['Fire &/or Lightning only'],
      location: ['', Validators.required], 
      construction: ['', Validators.required],  
      owner: ['The Insured'],
      usedAs: ['', Validators.required],  
      periodFrom: ['', Validators.required],
      periodTo: [{ value: '',}]  
    });

    
    this.formValue.get('periodFrom')?.valueChanges.subscribe(value => {
      if (value) {
        const periodFromDate = new Date(value);
        const periodToDate = new Date(periodFromDate);
        periodToDate.setFullYear(periodFromDate.getFullYear() + 1);  
        this.formValue.patchValue({
          periodTo: periodToDate.toISOString().substring(0, 10)
        }, { emitEvent: false });
      }
    });
  }

  createPolicy() {
    if (this.formValue.valid) {
      this.policy = this.formValue.getRawValue(); 
      this.policyService.createPolicy(this.policy)
        .subscribe({
          next: res => {
            console.log(res);
            this.formValue.reset();  
            this.router.navigate(['/viewpolicy']); 
          },
          error: err => {
            console.error('Error creating policy:', err);
            this.errorMessage = 'Failed to create the policy. Please try again.';  
          }
        });
    } else {
      console.log('Form is invalid');
      this.errorMessage = 'Please fill out all required fields correctly.';  
    }
  }
}
