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
    this.loadPolicies();
    this.initializeForm();
    this.setupSubscriptions();
  }

  initializeForm(): void {
    this.billForm = this.formBuilder.group({
      fire: [''],
      rsd: [''],
      netPremium: [{ value: '' }],
      tax: ['15'], // Tax is fixed at 15%
      grossPremium: [{ value: '' }], 
      policies: this.formBuilder.group({
        id: [undefined],
        billNo: [undefined],
        date: [],
        bankName: [undefined],
        policyholder: [undefined],
        address: [undefined],
        sumInsured: [undefined],
        stockInsured: [undefined],
        interestInsured: [undefined],
        coverage: [undefined],
        location: [undefined],
        construction: [undefined],
        owner: [undefined],
        usedAs: [undefined],
        periodFrom: ['', Validators.required],
        periodTo: [{ value: '' }]
      })
    });
  }

  setupSubscriptions(): void {
    // Trigger recalculation on any change in fire, rsd, or sumInsured
    this.billForm.valueChanges.subscribe(() => this.calculatePremiums());

    // Subscribe to periodFrom changes to update periodTo
    this.billForm.get('periodFrom')?.valueChanges.subscribe(value => {
      if (value) {
        const periodFromDate = new Date(value);
        const periodToDate = new Date(periodFromDate);
        periodToDate.setFullYear(periodFromDate.getFullYear() + 1);
        this.billForm.patchValue({
          periodTo: periodToDate.toISOString().substring(0, 10) // Format as YYYY-MM-DD
        }, { emitEvent: false });
      }
    });

    // Subscribe to policyholder changes and update related fields
    this.billForm.get('policies.policyholder')?.valueChanges.subscribe(policyholder => {
      const selectedPolicy = this.policies.find(policy => policy.policyholder === policyholder);
      if (selectedPolicy) {
        this.billForm.get('policies')?.patchValue(selectedPolicy);
        this.calculatePremiums(); // Recalculate premiums when policyholder changes
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
        alert('There was an error loading policies. Please try again.'); // User feedback
      }
    });
  }

  calculatePremiums(): void {
    const fireRate = (this.billForm.get('fire')?.value || 0) / 100; // Convert percentage to decimal
    const rsdRate = (this.billForm.get('rsd')?.value || 0) / 100; // Convert percentage to decimal
    const sumInsured = this.billForm.get('policies.sumInsured')?.value || 0;
    const taxRate = 0.15; // Fixed 15% tax rate

    const netPremium = this.getTotalPremium(sumInsured, fireRate, rsdRate);
    const taxAmount = this.getTotalTax(netPremium, taxRate);
    const grossPremium = netPremium + taxAmount;

    this.billForm.patchValue({
      netPremium: netPremium,
      grossPremium: grossPremium
    }, { emitEvent: false });
  }

  getTotalPremium(sumInsured: number, fireRate: number, rsdRate: number): number {
    return sumInsured * fireRate + (sumInsured * rsdRate);
  }

  getTotalTax(netPremium: number, taxRate: number): number {
    return netPremium * taxRate;
  }

  createBill(): void {
    const formValues = this.billForm.value;

    // Map form values to bill model
    this.bill.fire = formValues.fire;
    this.bill.rsd = formValues.rsd;
    this.bill.netPremium = formValues.netPremium;
    this.bill.tax = formValues.tax;
    this.bill.grossPremium = formValues.grossPremium;
    this.bill.policy = formValues.policies;

    // Call service to create bill
    this.billService.createBill(this.bill).subscribe({
      next: res => {
        this.loadPolicies(); // Reload policies after creating the bill
        this.billForm.reset(); // Reset form after success
        this.router.navigate(['viewbill']); // Navigate to the bill view page
        alert('Bill created successfully!'); // Success message
      },
      error: error => {
        console.error('Error creating bill:', error);
        alert('There was an error creating the bill. Please try again.'); // Error message
      }
    });
  }
}
