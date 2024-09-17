import { Component, OnInit } from '@angular/core';
import { BillModel } from '../../model/bill.model';
import { PolicyModel } from '../../model/policy.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PolicyService } from '../../service/policy.service';
import { BillService } from '../../service/bill.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatebill',
  templateUrl: './updatebill.component.html',
  styleUrl: './updatebill.component.css'
})
export class UpdatebillComponent {

  bill: BillModel = new BillModel();
  policies: PolicyModel[] = [];
  billId: number = 0;
  billForm!: FormGroup;

  constructor(
    private policiesService: PolicyService,
    private billService: BillService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.billId = this.route.snapshot.params['id'];
    console.log(this.billId);
    this.billForm = this.formBuilder.group({
      fire: [''],
      rsd: [''],
      netPremium: [{ value: '', disabled: true }], // Disable to prevent manual editing
      tax: [''],
      grossPremium: [{ value: '', disabled: true }], // Disable to prevent manual editing
      policies: this.formBuilder.group({
        id: [undefined],
        billNo: [undefined],
        date: [undefined],
        bankName: [undefined],
        policyholder: [undefined],
        address: [undefined],
        sumInsured: [undefined],
        stockInsured: [undefined],
        interestInsured: [undefined],
        usedAs: [undefined],
      })
    });

    this.loadBill();
    this.loadBillDetails();

    // Recalculate premiums when fire, rsd, or tax values change
    this.billForm.get('fire')?.valueChanges.subscribe(() => this.calculatePremiums());
    this.billForm.get('rsd')?.valueChanges.subscribe(() => this.calculatePremiums());
    this.billForm.get('tax')?.valueChanges.subscribe(() => this.calculatePremiums());
  }

  loadBill(): void {
    this.policiesService.viewAllPolicyForBill()
      .subscribe({
        next: (res: PolicyModel[]) => {
          this.policies = res;
        },
        error: er => {
          console.log(er);
        }
      });
  }

  loadBillDetails(): void {
    this.billService.getByBillId(this.billId)
      .subscribe({
        next: (bill: BillModel) => {
          this.bill = bill;
          this.billForm.patchValue({
            fire: bill.fire,
            rsd: bill.rsd,
            netPremium: bill.netPremium,
            tax: bill.tax,
            grossPremium: bill.grossPremium,
            policies: bill.policy,
          });
        },
        error: error => {
          console.log(error);
        }
      });
  }

  calculatePremiums(): void {
    const fireRate = (this.billForm.get('fire')?.value || 0) / 100; // Convert percentage to decimal
    const rsdRate = (this.billForm.get('rsd')?.value || 0) / 100; // Convert percentage to decimal
    const sumInsured = this.billForm.get('policies.sumInsured')?.value || 0;
    const taxRate = 0.15; // Fixed 15% tax rate

    const netPremium = this.roundToTwoDecimalPlaces(this.getTotalPremium(sumInsured, fireRate, rsdRate));
    const taxAmount = this.roundToTwoDecimalPlaces(this.getTotalTax(netPremium, taxRate));
    const grossPremium = this.roundToTwoDecimalPlaces(netPremium + taxAmount);

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

  roundToTwoDecimalPlaces(value: number): number {
    return Math.round(value * 100) / 100;
  }

  updateBill(): void {
    const updateBill: BillModel = {
      ...this.bill,
      ...this.billForm.getRawValue() 
    };
  
   
    this.billService.updateBill(this.billId, updateBill) 
      .subscribe({
        next: res => {
          console.log('Bill updated successfully:', res);
          this.billForm.reset();
          this.router.navigate(['viewbill']);
        },
        error: error => {
          console.log('Error updating bill:', error);
        }
      });
  }
}
