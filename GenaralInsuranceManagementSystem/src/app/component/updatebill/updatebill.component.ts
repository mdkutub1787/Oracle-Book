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
  billId: string = "";
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
            policies: bill.policies,
          });
        },
        error: error => {
          console.log(error);
        }
      });
  }

  calculatePremiums(): void {
    const formValues = this.billForm.value;
    const sumInsured = formValues.policies.sumInsured || 0;
    const fireRate = formValues.fire || 0;
    const rsdRate = formValues.rsd || 0;
    const taxRate = formValues.tax || 0;

    const netPremium = (sumInsured * fireRate + sumInsured * rsdRate);
    const grossPremium = netPremium + (netPremium * taxRate);

    this.billForm.patchValue({
      netPremium: netPremium,
      grossPremium: grossPremium
    }, { emitEvent: false });
  }

  updateBill(): void {
    const updateBill: BillModel = {
      ...this.bill,
      ...this.billForm.getRawValue() // Get raw value to include disabled fields
    };

    this.billService.updateBill(updateBill)
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
