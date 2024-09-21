import { Component, OnInit } from '@angular/core';
import { MoneyReceiptModel } from '../../model/moneyreceipt.model';
import { MoneyreceiptService } from '../../service/moneyreceipt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-printmoneyreceipt',
  templateUrl: './printmoneyreceipt.component.html',
  styleUrl: './printmoneyreceipt.component.css'
})
export class PrintmoneyreceiptComponent implements OnInit{

  moneyreceipt?: MoneyReceiptModel;

  constructor(
    private moneyreceiptService: MoneyreceiptService,
    private router: Router,
    private route: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.moneyreceiptService.getMoneyReceiptById(id).subscribe({
      next: response => {
        this.moneyreceipt = response;
      },
      error: error => {
        alert(error);
      }
    });
  }

  getSumInsured(): number {
    return this.moneyreceipt?.bill?.policy?.sumInsured ?? 0;
  }

  getFireRate(): number {
    return (this.moneyreceipt?.bill?.fire ?? 0) / 100;
  }

  getTotalFire(): number {
    const sumInsured = this.getSumInsured();
    const fireRate = this.getFireRate();
    return Math.round(sumInsured * fireRate);
  }

  getRsdRate(): number {
    return (this.moneyreceipt?.bill?.rsd ?? 0) / 100;
  }

  getTotalRsd(): number {
    const sumInsured = this.getSumInsured();
    const rsdRate = this.getRsdRate();
    return Math.round(sumInsured * rsdRate);
  }

  getTaxRate(): number {
    return (this.moneyreceipt?.bill?.tax ?? 0) / 100;
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
