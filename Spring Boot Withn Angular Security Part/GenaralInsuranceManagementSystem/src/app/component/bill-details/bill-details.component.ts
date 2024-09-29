import { Component, OnInit } from '@angular/core';
import { BillModel } from '../../model/bill.model';
import { BillService } from '../../service/bill.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrl: './bill-details.component.css'
})
export class BillDetailsComponent implements OnInit{

  id!: number;
  bill!: BillModel;

  constructor(
    private billService: BillService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.bill = new BillModel();
    this.id = this.route.snapshot.params['id'];
    this.billService.getByBillId(this.id).subscribe({
      next: (data) => {
        console.log('Marine details data retrieved:', data);
        this.bill = data;
      },
      error: (err) => {
        console.error('Error fetching Marine details data:', err);
      }
    });
  }

  getSumInsured(): number {
    return this.bill?.policy?.sumInsured ?? 0;
  }

  getFireRate(): number {
    return (this.bill?.fire ?? 0) / 100;
  }

  getTotalFire(): number {
    const sumInsured = this.getSumInsured();
    const fireRate = this.getFireRate();
    return Math.round(sumInsured * fireRate);
  }

  getRsdRate(): number {
    return (this.bill?.rsd ?? 0) / 100;
  }

  getTotalRsd(): number {
    const sumInsured = this.getSumInsured();
    const rsdRate = this.getRsdRate();
    return Math.round(sumInsured * rsdRate);
  }

  getTaxRate(): number {
    return (this.bill?.tax ?? 0) / 100;
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

  getTotalPremiumWithTax(): number {
    const totalPremium = this.getTotalPremium();
    const totalTax = this.getTotalTax();
    return Math.round(totalPremium + totalTax);
  }
  }
