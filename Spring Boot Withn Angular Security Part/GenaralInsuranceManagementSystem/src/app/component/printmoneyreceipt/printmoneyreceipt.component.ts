import { Component, OnInit } from '@angular/core';
import { MoneyReceiptModel } from '../../model/moneyreceipt.model';
import { MoneyreceiptService } from '../../service/moneyreceipt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-printmoneyreceipt',
  templateUrl: './printmoneyreceipt.component.html',
  styleUrls: ['./printmoneyreceipt.component.css']
})
export class PrintmoneyreceiptComponent implements OnInit {
  
  moneyreceipt?: MoneyReceiptModel;

  constructor(
    private moneyreceiptService: MoneyreceiptService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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

  convertToWords(num: number): string {
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    const numToWords = (n: number): string => {
      if (n < 20) return ones[n];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
      if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + numToWords(n % 100) : "");
      if (n < 100000) return numToWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + numToWords(n % 1000) : "");
      return "";
    };

    return numToWords(num);
  }

  convertAmountToWords(amount: number): string {
    const words = this.convertToWords(amount);
    return `${words} Taka`;
  }

  getTotalAmountInWords(): string {
    const totalAmount = this.getTotalPremiumWithTax();
    return this.convertAmountToWords(totalAmount);
  }
}
