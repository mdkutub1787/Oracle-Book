import { Component, OnInit } from '@angular/core';
import { MarineDetailsModel } from '../../model/MarineDetailsModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarineBillModel } from '../../model/MarineBill.Model';
import { MarinebillService } from '../../service/marinebill.service';
import { MarinedetailsService } from '../../service/marinedetails.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-marine-bill',
  templateUrl: './create-marine-bill.component.html',
  styleUrl: './create-marine-bill.component.css'
})
export class CreateMarineBillComponent implements OnInit{


  marineDetails: MarineDetailsModel[] = [];
  marineBillForm!: FormGroup;
  marinebill: MarineBillModel = new MarineBillModel();

  constructor(
    private marinebillService: MarinebillService,
    private marineDetailsService: MarinedetailsService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadMarineDetails();
    this.setupFormSubscriptions();
  }

  private initializeForm(): void {
    this.marineBillForm = this.formBuilder.group({
      marineRate: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      warSrccRate: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      netPremium: [{ value: 0, disabled: true }],
      tax: [15, [Validators.min(0), Validators.max(100)]],
      stampDuty: [{ value: 0 }],
      grossPremium: [{ value: 0, disabled: true }],
      marineDetails: this.formBuilder.group({
        policyholder: [null, Validators.required],
        address: [null, Validators.required],
        sumInsured: [null, Validators.required]
      })
    });
  }


  private setupFormSubscriptions(): void {
    this.marineBillForm.get('marineRate')?.valueChanges.subscribe(() => this.calculatePremiums());
    this.marineBillForm.get('warSrccRate')?.valueChanges.subscribe(() => this.calculatePremiums());
    this.marineBillForm.get('tax')?.valueChanges.subscribe(() => this.calculatePremiums());

    this.marineBillForm.get('marineDetails.policyholder')?.valueChanges.subscribe(policyholder => {
      const selectedPolicy = this.marineDetails.find(policy => policy.policyholder === policyholder);
      if (selectedPolicy) {
        this.marineBillForm.get('marineDetails')?.patchValue(selectedPolicy, { emitEvent: false });
        this.calculatePremiums();
      }
    });
  }

  private loadMarineDetails(): void {
    this.marineDetailsService.viewAllMarineListForMarineBill().subscribe({
      next: res => {
        this.marineDetails = res;
      },
      error: () => this.handleError('Error loading marine details. Please try again.')
    });
  }

  private calculatePremiums(): void {
    const sumInsured = this.getFormValue('marineDetails.sumInsured');
    const marineRate = this.getFormValue('marineRate');
    const warSrccRate = this.getFormValue('warSrccRate');
    const stampDuty = this.getFormValue('stampDuty');
    const taxRate = this.getFormValue('tax');

    if (marineRate > 100 || warSrccRate > 100 || taxRate > 100) {
      this.handleError('Rates must be less than or equal to 100%.');
      return;
    }

    const netPremium = (sumInsured * (marineRate + warSrccRate)) / 100;
    const tax = (netPremium * taxRate) / 100;
    const grossPremium = netPremium + tax + stampDuty;

    this.marineBillForm.patchValue({ netPremium, grossPremium }, { emitEvent: false });
  }

  private getFormValue(controlName: string): number {
    return Math.round((this.marineBillForm.get(controlName)?.value || 0) * 100) / 100;
  }

  createMarineBill(): void {
    if (this.marineBillForm.invalid) {
      this.handleError('Please fill in all required fields correctly.');
      return;
    }

    const formValues = this.marineBillForm.value;
    this.marinebill = { ...this.marinebill, ...formValues };

    const selectedPolicy = this.marineDetails.find(policy => policy.policyholder === formValues.marineDetails.policyholder);
    if (!selectedPolicy) {
      this.handleError('Policy not found. Please select a valid policyholder.');
      return;
    }

    this.marinebill.marineDetails = selectedPolicy;

    this.marinebillService.createMarineBill(this.marinebill).subscribe({
      next: () => {
        this.marineBillForm.reset();
        this.router.navigate(['viewmarinebill']);
      },
      error: () => this.handleError('There was an error creating the marine bill. Please try again.')
    });
  }

  private handleError(message: string): void {
    console.error(message);
    alert(message);
  }
}
