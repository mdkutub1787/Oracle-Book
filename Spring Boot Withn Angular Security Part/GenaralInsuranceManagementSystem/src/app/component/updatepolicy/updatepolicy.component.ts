import { Component, OnInit } from '@angular/core';
import { PolicyModel } from '../../model/policy.model';
import { PolicyService } from '../../service/policy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-updatepolicy',
  templateUrl: './updatepolicy.component.html',
  styleUrls: ['./updatepolicy.component.css']
})
export class UpdatepolicyComponent implements OnInit {

  formValue!: FormGroup;
  policy: PolicyModel = new PolicyModel();
  policyId: number = 0;

  constructor(
    private policyService: PolicyService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.policyId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.initializeForm();

    if (this.policyId) {
      this.policyService.getByPolicyId(this.policyId).subscribe({
        next: (data: PolicyModel) => {
          if (data) {
            this.policy = data;
            this.formValue.patchValue(this.policy);
          } else {
            console.error('Policy not found');
            
          }
        },
        error: err => {
          console.log(err);
         
        }
      });
    }
  }

  initializeForm() {
    const currentDate = new Date().toISOString().substring(0, 10);

    this.formValue = this.formBuilder.group({
      date: [currentDate],
      bankName: [''],
      policyholder: [''],
      address: [''],
      sumInsured: [''],
      stockInsured: [''],
      interestInsured: [''],
      coverage: ['Fire &/or Lightning only'],
      location: [''],
      construction: [''],
      owner: ['The Insured'],
      usedAs: [''],
      periodFrom: ['', Validators.required],
      periodTo: [{ value: '' }]
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

  updatePolicy() {
    this.policy = this.formValue.value;
    this.policy.id = this.policyId; 
    this.policyService.updatePolicy(this.policyId, this.policy) 
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
