import { Component, OnInit } from '@angular/core';
import { MarineMoneyReceiptModel } from '../../model/MarineMoneyReceipt.Model';
import { MarineBillMoneyreceiptService } from '../../service/marine-bill-moneyreceipt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarineDetailsModel } from '../../model/MarineDetailsModel';

@Component({
  selector: 'app-update-marine-money-receipt',
  templateUrl: './update-marine-money-receipt.component.html',
  styleUrls: ['./update-marine-money-receipt.component.css']
})
export class UpdateMarineMoneyReceiptComponent implements OnInit {

  moneyReceiptForm!: FormGroup;
  receiptId: number = 0;
  marineDetails: MarineDetailsModel[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private marineMoneyReceiptService: MarineBillMoneyreceiptService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize the form
    this.initializeForm();

    // Get the receipt ID from the route
    this.receiptId = +this.route.snapshot.paramMap.get('id')!;

    // Load the Marine Money Receipt data by ID
    this.loadMarineMoneyReceipt();
  }

  // Form initialization method
  private initializeForm(): void {
    this.moneyReceiptForm = this.fb.group({
      issuingOffice: ['', Validators.required],
      id: [null, Validators.required],
      classOfInsurance: ['', Validators.required],
      date: ['', Validators.required],
      modeOfPayment: ['', Validators.required],
      issuedAgainst: ['', Validators.required],
      bill: this.fb.group({
        policies: this.fb.group({
          policyholder: [''],
          bankName: ['']
        })
      })
    });
  }

  // Method to load Marine Money Receipt data by ID
  private loadMarineMoneyReceipt(): void {
    this.marineMoneyReceiptService.getMarineMoneyReceiptById(this.receiptId).subscribe({
      next: (receipt) => {
        this.moneyReceiptForm.patchValue(receipt);

        // Patch the nested form group if needed
        if (receipt.marinebill && receipt.marinebill.marineDetails) {
          this.moneyReceiptForm.get('bill.policies')?.patchValue(receipt.marinebill.marineDetails);
        }
      },
      error: (error) => {
        console.error('Error fetching Marine Money Receipt', error);
      }
    });
  }

  // Submit handler for form submission
  onSubmit(): void {
    if (this.moneyReceiptForm.valid) {
      const updatedReceipt: MarineMoneyReceiptModel = this.moneyReceiptForm.value;
  
      this.marineMoneyReceiptService.updateMarineMoneyReceipt(this.receiptId, updatedReceipt)
        .subscribe({
          next: (response) => {
            console.log('Marine Money Receipt updated successfully', response);
            this.router.navigate(['/viewmarinemoneyreceipt']);
          },
          error: (error) => {
            console.error('Error updating Marine Money Receipt', error);
            // Optionally show an error message to the user
          }
        });
    } else {
      console.warn('Form is invalid. Please check the fields.');
    }
  }
  
}
