import { Component, OnInit } from '@angular/core';
import { MarineBillModel } from '../../model/MarineBill.Model';
import { MarinebillService } from '../../service/marinebill.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-marine-bill-details',
  templateUrl: './marine-bill-details.component.html',
  styleUrl: './marine-bill-details.component.css'
})
export class MarineBillDetailsComponent implements OnInit{

  id!: number;
  marinebill!: MarineBillModel;

  constructor(
    private marinebillService: MarinebillService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.marinebill = new MarineBillModel();
    this.id = this.route.snapshot.params['id'];
    this.marinebillService.getByMarineBillId(this.id).subscribe({
      next: (data) => {
        console.log('Marine details data retrieved:', data);
        this.marinebill = data;
      },
      error: (err) => {
        console.error('Error fetching Marine details data:', err);
      }
    });
  }

  getSumInsured(): number {
    return this.marinebill?.marineDetails?.sumInsured ?? 0;
  }

  getFireRate(): number {
    return (this.marinebill?.marineRate ?? 0) / 100;
  }

  getTotalFire(): number {
    const sumInsured = this.getSumInsured();
    const fireRate = this.getFireRate();
    return Math.round(sumInsured * fireRate);
  }

  getRsdRate(): number {
    return (this.marinebill?.warSrccRate ?? 0) / 100;
  }

  getTotalRsd(): number {
    const sumInsured = this.getSumInsured();
    const rsdRate = this.getRsdRate();
    return Math.round(sumInsured * rsdRate);
  }

  getTaxRate(): number {
    return (this.marinebill?.tax ?? 0) / 100;
  }

  getTotalPremium(): number {
    const sumInsured = this.getSumInsured();
    const fireRate = this.getFireRate();
    const rsdRate = this.getRsdRate();
    return Math.round(sumInsured * (fireRate + rsdRate));
  }

  getTotalTax(): number {
    const totalPremium = this.getTotalPremium();
    const taxRate = this.getTaxRate();
    return Math.round(totalPremium * taxRate);
  }

  getStampDuty(): number {
    return this.marinebill?.stampDuty ?? 0;
  }

  getTotalPremiumWithTax(): number {
    const totalPremium = this.getTotalPremium();
    const totalTax = this.getTotalTax();
    const stampDuty = this.getStampDuty();
    return Math.round(totalPremium + totalTax+stampDuty);
  }

}
