import { Component, OnInit } from '@angular/core';
import { MarineBillModel } from '../../model/MarineBill.Model';
import { MarineDetailsModel } from '../../model/MarineDetailsModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarinedetailsService } from '../../service/marinedetails.service';
import { MarinebillService } from '../../service/marinebill.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-marine-bill',
  templateUrl: './update-marine-bill.component.html',
  styleUrl: './update-marine-bill.component.css'
})
export class UpdateMarineBillComponent implements OnInit{


  marinebill: MarineBillModel = new MarineBillModel();
  marineDetails: MarineDetailsModel[] = [];
  marinebillId: number = 0;
  marinebillForm!: FormGroup;

  constructor(
    private marinedetailsService: MarinedetailsService,
    private marinebillService: MarinebillService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.marinebillId = this.route.snapshot.params['id'];
    console.log(this.marinebillId);
    this.marinebillForm = this.formBuilder.group({
      marineRate: ['', Validators.required],
      warSrccRate: ['', Validators.required],
      netPremium: [{ value: '' }, Validators.required], 
      tax: ['', Validators.required],
      stampDuty: ['', Validators.required],
      grossPremium: [{ value: ''}, Validators.required], 
      marineDetails: this.formBuilder.group({
        id: [undefined],
        date: [undefined],
        bankName: [undefined],
        policyholder: [undefined],
        address: [undefined],
        stockItem: [undefined],
        sumInsured: [undefined, Validators.required], 
        voyageFrom: [undefined],
        voyageTo: [undefined],
        via: [undefined],
        coverage: [undefined],
      })
    });

    this.loadBill();
    this.loadBillDetails();

    // Recalculate premiums when marineRate, warSrccRate, or tax values change
    this.marinebillForm.get('marineRate')?.valueChanges.subscribe(() => this.calculatePremiums());
    this.marinebillForm.get('warSrccRate')?.valueChanges.subscribe(() => this.calculatePremiums());
    this.marinebillForm.get('tax')?.valueChanges.subscribe(() => this.calculatePremiums());
    this.marinebillForm.get('marineDetails.sumInsured')?.valueChanges.subscribe(() => this.calculatePremiums()); // Listen for changes in sumInsured
  }

  loadBill(): void {
    this.marinedetailsService.viewAllMarineListForMarineBill()
      .subscribe({
        next: (res: MarineDetailsModel[]) => {
          this.marineDetails = res;
        },
        error: er => {
          console.log(er);
        }
      });
  }

  loadBillDetails(): void {
    this.marinebillService.getByMarineBillId(this.marinebillId)
      .subscribe({
        next: (marinebill: MarineBillModel) => {
          this.marinebill = marinebill;
          this.marinebillForm.patchValue({
            marineRate: marinebill.marineRate,
            warSrccRate: marinebill.warSrccRate,
            netPremium: marinebill.netPremium,
            tax: marinebill.tax,
            stampDuty: marinebill.stampDuty,
            grossPremium: marinebill.grossPremium,
            marineDetails: marinebill.marineDetails,
          });
        },
        error: error => {
          console.log(error);
        }
      });
  }

  calculatePremiums(): void {
    // Extract form values or default to 0
    const marineRate = (this.marinebillForm.get('marineRate')?.value || 0) / 100; // Convert percentage to decimal
    const warSrccRate = (this.marinebillForm.get('warSrccRate')?.value || 0) / 100; // Convert percentage to decimal
    const sumInsured = this.marinebillForm.get('marineDetails.sumInsured')?.value || 0;
    const taxRate = 0.15; // Fixed 15% tax rate
    const stampDuty = this.marinebillForm.get('stampDuty')?.value || 0;
  
    // Calculate the net premium
    const netPremium = this.roundToTwoDecimalPlaces(this.getTotalPremium(sumInsured, marineRate, warSrccRate));
  
    // Calculate the tax amount on the net premium
    const taxAmount = this.roundToTwoDecimalPlaces(this.getTotalTax(netPremium, taxRate));
  
    // Calculate the gross premium by adding net premium, tax, and stamp duty
    const grossPremium = this.roundToTwoDecimalPlaces(netPremium + taxAmount + stampDuty);
  
    // Update the form fields without triggering additional change events
    this.marinebillForm.patchValue({
      netPremium: netPremium,
      stampDuty: stampDuty,
      grossPremium: grossPremium
    }, { emitEvent: false });
  }
  
  getTotalPremium(sumInsured: number, marineRate: number, warSrccRate: number): number {
    // Calculate the total premium based on sum insured, marine rate, and war SRCC rate
    return (sumInsured * marineRate) + (sumInsured * warSrccRate);
  }
  
  getTotalTax(netPremium: number, taxRate: number): number {
    // Calculate the tax amount based on the net premium and tax rate
    return netPremium * taxRate;
  }
  
  roundToTwoDecimalPlaces(value: number): number {
    // Round a value to two decimal places
    return Math.round(value * 100) / 100;
  }
  

  updateMarineBill(): void {
    if (this.marinebillForm.valid) {
      const updateMarineBill: MarineBillModel = {
        ...this.marinebill,
        ...this.marinebillForm.getRawValue()
      };

      this.marinebillService.updateMarineBill(this.marinebillId, updateMarineBill)
        .subscribe({
          next: res => {
            console.log('marine Bill updated successfully:', res);
            this.marinebillForm.reset();
            this.router.navigate(['viewmarinebill']);
          },
          error: error => {
            console.log('Error updating marinebill:', error);
          }
        });
    } else {
      console.warn('Form is invalid');
    }
  }
}
