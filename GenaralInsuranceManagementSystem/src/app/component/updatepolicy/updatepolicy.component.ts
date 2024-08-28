import { Component, OnInit } from '@angular/core';
import { PolicyModel } from '../../model/policy.model';
import { PolicyService } from '../../service/policy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-updatepolicy',
  templateUrl: './updatepolicy.component.html',
  styleUrls: ['./updatepolicy.component.css'] // Fixed the incorrect property name
})
export class UpdatepolicyComponent implements OnInit {

  policy: PolicyModel = new PolicyModel();
  id: string = "";
  formValue!: FormGroup; // Form group for binding form data

  constructor(
    private policyService: PolicyService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const currentDate = new Date().toISOString().substring(0, 10); // Format as YYYY-MM-DD

    this.id = this.route.snapshot.params['id'];

    // Initialize form with empty values
    this.formValue = this.formBuilder.group({
      billNo: [''],
      date: [currentDate], // Initialize with current date
      bankName: [''],
      policyholder: [''],
      address: [''],
      sumInsured: [''],
      stockInsured: [''],
      interestInsured: [''],
      coverage: [''],
      location: [''],
      construction: [''],
      owner: [''],
      usedAs: [''],
      periodFrom: ['', Validators.required],
      periodTo: [{ value: '', }] 
    });

    // Fetch the policy data by ID
    this.policyService.getByPolicyId(this.id)
      .subscribe({
        next: res => {
          this.policy = res;
          // Patch form with the received policy data
          this.formValue.patchValue(this.policy);
          
        },
        error: error => {
          console.log(error);
        }
      });

      this.formValue.get('periodFrom')?.valueChanges.subscribe(value => {
        if (value) {
          const periodFromDate = new Date(value);
          const periodToDate = new Date(periodFromDate);
          periodToDate.setFullYear(periodFromDate.getFullYear() + 1);
          this.formValue.patchValue({
            periodTo: periodToDate.toISOString().substring(0, 10) // Format as YYYY-MM-DD
          }, { emitEvent: false });
        }
      });

  }

  updatePolicy() {
    // Update policy with the values from the form
    this.policyService.updatePolicy(this.id, this.formValue.value)
      .subscribe({
        next: res => {
          console.log(res);
          this.router.navigate(['/viewpolicy']); // Navigate back to the policy list after successful update
        },
        error: error => {
          console.log(error);
        }
      });
  }
}
