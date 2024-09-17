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

    // Initialize form with validation and calculation logic
    this.billForm = this.formBuilder.group({
      fire: [''],
      rsd: [''],
      netPremium:  [''], 
      tax: ['15'], // Tax is set to 15%
      grossPremium: [''], 
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

    // Trigger recalculation on any change in fire, rsd, tax, or sumInsured
    ['fire', 'rsd', 'tax', 'policies.sumInsured'].forEach(field => {
      this.billForm.get(field)?.valueChanges.subscribe(() => this.calculatePremiums());
    });

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
      }
    });
  }

  calculatePremiums(): void {
    const formValues = this.billForm.value;
    const sumInsured = parseFloat(formValues.policies.sumInsured) || 0;
    const fireRate = parseFloat(formValues.fire) / 100 || 0; // Convert percentage to decimal
    const rsdRate = parseFloat(formValues.rsd) / 100 || 0; // Convert percentage to decimal
    const taxRate = parseFloat(formValues.tax) || 0;

    // Calculating net and gross premiums
    const netPremium = sumInsured * (fireRate + rsdRate);
    const grossPremium = netPremium + (netPremium * taxRate);

    // Update form fields with the calculated premiums
    this.billForm.patchValue({
      netPremium: netPremium.toFixed(2),
      grossPremium: grossPremium.toFixed(2)
    }, { emitEvent: false });
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
      },
      error: error => {
        console.error('Error creating bill:', error);
      }
    });
  }
}
