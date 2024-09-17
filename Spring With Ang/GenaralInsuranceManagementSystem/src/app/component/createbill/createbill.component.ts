import { Component, OnInit } from '@angular/core';
import { PolicyModel } from '../../model/policy.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillModel } from '../../model/bill.model';
import { BillService } from '../../service/bill.service';
import { PolicyService } from '../../service/policy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createbill',
  templateUrl: './createbill.component.html',
  styleUrls: ['./createbill.component.css']
})
export class CreatebillComponent implements OnInit {

  policies: PolicyModel[] = [];
  billForm!: FormGroup;
  bill: BillModel = new BillModel();

  constructor(
    private billService: BillService,
    private policyService: PolicyService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadPolicies();
    this.setupSubscriptions();
  }

  initializeForm(): void {
    this.billForm = this.formBuilder.group({
      fire: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      rsd: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      netPremium: [{ value: 0, }],
      tax: [15, [Validators.min(0), Validators.max(100)]],
      grossPremium: [{ value: 0,  }],
      policies: this.formBuilder.group({
        policyholder: [null, Validators.required],
        address: [null, Validators.required],
        sumInsured: [null, Validators.required]
      })
    });

    this.calculatePremiums(); 
  }

  setupSubscriptions(): void {
    this.billForm.valueChanges.subscribe(() => this.calculatePremiums());

    this.billForm.get('policies.policyholder')?.valueChanges.subscribe(policyholder => {
      const selectedPolicy = this.policies.find(policy => policy.policyholder === policyholder);
      if (selectedPolicy) {
        this.billForm.get('policies')?.patchValue(selectedPolicy, { emitEvent: false });
        this.calculatePremiums();
      }
    });
  }

  loadPolicies(): void {
    this.policyService.viewAllPolicyForBill().subscribe({
      next: res => {
        this.policies = res;
      },
      error: error => {
        console.error('Error loading policies:', error);
        alert('There was an error loading policies. Please try again.');
      }
    });
  }

  calculatePremiums(): void {
    const fireRate = Math.round((this.billForm.get('fire')?.value || 0) * 100) / 100; 
    const rsdRate = Math.round((this.billForm.get('rsd')?.value || 0) * 100) / 100; 
    const sumInsured = this.billForm.get('policies.sumInsured')?.value || 0;
    const taxRate = Math.round((this.billForm.get('tax')?.value || 15) * 100) / 100; 

    if (fireRate > 100 || rsdRate > 100 || taxRate > 100) {
      alert('Rates must be less than or equal to 100%.');
      return;
    }

    const netPremium = sumInsured * (fireRate + rsdRate) / 100;
    const tax = netPremium * taxRate / 100;
    const grossPremium = netPremium + tax;

    this.billForm.patchValue({
      netPremium: netPremium,
      grossPremium: grossPremium
    }, { emitEvent: false }); 
  }

  createBill(): void {
    if (this.billForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const formValues = this.billForm.value;
    this.bill.fire = formValues.fire;
    this.bill.rsd = formValues.rsd;
    this.bill.netPremium = formValues.netPremium;
    this.bill.tax = formValues.tax;
    this.bill.grossPremium = formValues.grossPremium;

    const selectedPolicy = this.policies.find(policy => policy.policyholder === formValues.policies.policyholder);
    if (!selectedPolicy) {
      alert('Policy not found. Please select a valid policyholder.');
      return;
    }
    this.bill.policy = selectedPolicy;

    this.billService.createBill(this.bill).subscribe({
      next: () => {
        this.billForm.reset();
        this.router.navigate(['viewbill']);
      },
      error: error => {
        console.error('Error creating bill:', error);
        alert('There was an error creating the bill. Please try again.');
      }
    });
  }
}
