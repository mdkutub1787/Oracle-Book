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

  constructor(
    private policyService: PolicyService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const currentDate = new Date().toISOString().substring(0, 10); // Format as YYYY-MM-DD

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
      periodTo: [{ value: '' }] // Disable periodTo to prevent user input
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

  createPolicy() {
    this.policy = this.formValue.getRawValue(); // getRawValue to include disabled fields

    this.policyService.createPolicy(this.policy)
      .subscribe({
        next: res => {
          console.log(res);
          this.formValue.reset();
          this.router.navigate(['/viewpolicy']);
        },
        error: err => {
          console.log(err);
        }
      });
  }
}
