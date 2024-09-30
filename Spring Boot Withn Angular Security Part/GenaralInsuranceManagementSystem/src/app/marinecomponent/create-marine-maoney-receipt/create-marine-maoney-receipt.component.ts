import { Component, OnInit } from '@angular/core';
import { MarineDetailsModel } from '../../model/MarineDetailsModel';
import { MarineBillModel } from '../../model/MarineBill.Model';
import { MarineMoneyReceiptModel } from '../../model/MarineMoneyReceipt.Model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarineBillMoneyreceiptService } from '../../service/marine-bill-moneyreceipt.service';
import { MarinebillService } from '../../service/marinebill.service';
import { MarinedetailsService } from '../../service/marinedetails.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-marine-maoney-receipt',
  templateUrl: './create-marine-maoney-receipt.component.html',
  styleUrl: './create-marine-maoney-receipt.component.css'
})
export class CreateMarineMaoneyReceiptComponent implements OnInit{

  policies: MarineDetailsModel[] = [];
  bills: MarineBillModel[] = [];
  moneyReceipt: MarineMoneyReceiptModel = new MarineMoneyReceiptModel();
  moneyReceiptForm!: FormGroup;
  selectedBill?: MarineBillModel;

  constructor(
    private moneyReceiptService: MarineBillMoneyreceiptService,
    private billService: MarinebillService,
    private policyService: MarinedetailsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadPolicies();
    this.loadBills();

    // Subscribe to policyholder field change
    this.moneyReceiptForm.get('bill.policies.policyholder')?.valueChanges
      .subscribe(policyholder => {
        this.selectedBill = this.bills.find(bill => bill.marineDetails.policyholder === policyholder);
        if (this.selectedBill) {
          this.updateBillDetails(this.selectedBill);
        }
      });
  }

  initializeForm(): void {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    this.moneyReceiptForm = this.formBuilder.group({
      id: [null],
      issuingOffice: [null, Validators.required],
      classOfInsurance: [null, Validators.required],
      date: [formattedDate, Validators.required],
      modeOfPayment: [null, Validators.required],
      issuedAgainst: [null, Validators.required],
      bill: this.formBuilder.group({
        id: [null, Validators.required],
        marineRate: [null, Validators.required],
        warSrccRate: [null, Validators.required],
        netPremium: [null, Validators.required],
        tax: [null, Validators.required],
        stampDuty: [null, Validators.required],
        grossPremium: [null, Validators.required],
        policies: this.formBuilder.group({
          id: [null, Validators.required],
          date: [null, Validators.required],
          bankName: [null, Validators.required],
          policyholder: [null, Validators.required],
          address: [null, Validators.required],
          sumInsured: [null, Validators.required],
          stockItem: [null, Validators.required],
          voyageFrom: [null, Validators.required],
          voyageTo: [null, Validators.required],
          via: [null, Validators.required],
          coverage: [null, Validators.required],
        })
      })
    });
  }

  loadPolicies(): void {
    this.policyService.viewAllMarineListForMarineBill()
      .subscribe({
        next: res => this.policies = res,
        error: error => console.error('Error loading policies:', error)
      });
  }

  loadBills(): void {
    this.billService.getAllMaeineBillForMoneyReceipt()
      .subscribe({
        next: res => this.bills = res,
        error: error => console.error('Error loading bills:', error)
      });
  }

  updateBillDetails(selectedBill: MarineBillModel): void {
    if (selectedBill) {
      this.moneyReceiptForm.patchValue({
        bill: {
          id: selectedBill.id,
          marineRate: selectedBill.marineRate, // Ensure property names are correct
          warSrccRate: selectedBill.warSrccRate,
          netPremium: selectedBill.netPremium,
          tax: selectedBill.tax,
          stampDuty: selectedBill.stampDuty,
          grossPremium: selectedBill.grossPremium,
          policies: selectedBill.marineDetails // Ensure this matches the expected type
        }
      }, { emitEvent: false });
    }
  }

  createMarineMoneyReceipt(): void {
    if (this.moneyReceiptForm.valid) {
      const formValues = this.moneyReceiptForm.value;

      this.moneyReceipt = { ...this.moneyReceipt, ...formValues, marinebill: formValues.bill };

      this.moneyReceiptService.createMarineMoneyReceipt(this.moneyReceipt)
        .subscribe({
          next: res => {
            this.moneyReceipt = res;
            this.loadPolicies();
            this.loadBills();
            this.moneyReceiptForm.reset();
            this.router.navigate(['viewmarinemoneyreceipt']);
          },
          error: error => console.error('Error creating money receipt:', error)
        });
    } else {
      console.warn('Form is invalid');
    }
  }
}
