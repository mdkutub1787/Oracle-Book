import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BillModel } from '../../model/bill.model';
import { PolicyModel } from '../../model/policy.model';
import { ReceiptModel } from '../../model/receipt.model';
import { BillService } from '../../service/bill.service';
import { PolicyService } from '../../service/policy.service';
import { ReceiptService } from '../../service/receipt.service';

@Component({
  selector: 'app-createreceipt',
  templateUrl: './createreceipt.component.html',
  styleUrls: ['./createreceipt.component.css']
})
export class CreatereceiptComponent implements OnInit {

  policies: PolicyModel[] = [];
  bill: BillModel[] = [];
  receipt: ReceiptModel = new ReceiptModel();
  receiptForm!: FormGroup;
  selectedBill?: BillModel;

  constructor(
    private receiptService: ReceiptService,
    private billService: BillService,
    private policyService: PolicyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPolicies();
    this.loadBills();

    // Form definition
    this.receiptForm = this.formBuilder.group({
      bill: this.formBuilder.group({
        id: [null],
        fire: [null],
        rsd: [null],
        netPremium: [null],
        tax: [null],
        grossPremium: [null],
        policies: this.formBuilder.group({
          id: [null],
          date: [null],
          bankName: [null],
          policyholder: [null],
          address: [null],
          sumInsured: [null],
          stockInsured: [null],
          interestInsured: [null],
          coverage: [null],
          location: [null],
          construction: [null],
          owner: [null],
          usedAs: [null],
          periodFrom: [null],
          periodTo: [null],
        })
      })
    });

    // Subscribe to policyholder field change
    this.receiptForm.get('bill.policies.policyholder')?.valueChanges
      .subscribe(policyholder => {
        this.selectedBill = this.bill.find(bill => bill.policy.policyholder === policyholder);
        if (this.selectedBill) {
          // Patch bill data into the form
          this.receiptForm.patchValue({
            bill: {
              ...this.receiptForm.get('bill')?.value,
              id: this.selectedBill.id,
              fire: this.selectedBill.fire,
              rsd: this.selectedBill.rsd,
              netPremium: this.selectedBill.netPremium,
              tax: this.selectedBill.tax,
              grossPremium: this.selectedBill.grossPremium,
              policies: this.selectedBill.policy
            }
          }, { emitEvent: false });
        }
      });
  }

  // Load all policies for bills
  loadPolicies(): void {
    this.policyService.viewAllPolicyForBill()
      .subscribe({
        next: res => {
          this.policies = res;
        },
        error: error => {
          console.error('Error loading policies:', error);
        }
      });
  }

  // Load all bills for receipt
  loadBills(): void {
    this.billService.getAllBillForReceipt()
      .subscribe({
        next: res => {
          this.bill = res;
        },
        error: error => {
          console.error('Error loading bills:', error);
        }
      });
  }

  // Create receipt
  createReceipt(): void {
    if (this.receiptForm.valid) {
      const formValues = this.receiptForm.value;
      this.receipt.bill = formValues.bill;

      this.receiptService.createReceipt(this.receipt)
        .subscribe({
          next: res => {
            // Assume the response contains the created receipt with the auto-generated id
            this.receipt = res;
            this.loadPolicies();
            this.loadBills();
            this.receiptForm.reset();
            this.router.navigate(['viewreciept']);
          },
          error: error => {
            console.error('Error creating receipt:', error);
          }
        });
    } else {
      console.warn('Form is invalid');
    }
  }
}
