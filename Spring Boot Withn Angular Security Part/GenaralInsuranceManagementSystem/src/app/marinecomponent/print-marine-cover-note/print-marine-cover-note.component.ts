import { Component, OnInit } from '@angular/core';
import { MarineMoneyReceiptModel } from '../../model/MarineMoneyReceipt.Model';
import { MarineBillMoneyreceiptService } from '../../service/marine-bill-moneyreceipt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-print-marine-cover-note',
  templateUrl: './print-marine-cover-note.component.html',
  styleUrl: './print-marine-cover-note.component.css'
})
export class PrintMarineCoverNoteComponent implements OnInit{

  moneyreceipt?: MarineMoneyReceiptModel;

  constructor(
    private marineBillMoneyreceiptService: MarineBillMoneyreceiptService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.marineBillMoneyreceiptService.getMarineMoneyReceiptById(id).subscribe({
      next: response => {
        this.moneyreceipt = response;
      },
      error: error => {
        alert(error);
      }
    });
  }

  getSumInsured(): number {
    return this.moneyreceipt?.marinebill?.marineDetails?.sumInsured ?? 0;
  }

  getMarineRate(): number {
    return (this.moneyreceipt?.marinebill?.marineRate ?? 0) / 100;
  }

  getwarSrccRate(): number {
    return (this.moneyreceipt?.marinebill?.warSrccRate ?? 0) / 100;
  }

  getTotalMarine(): number {
    const sumInsured = this.getSumInsured();
    const marineRate = this.getwarSrccRate();
    return Math.round(sumInsured * marineRate);
  }
  getTotalwarSrcc(): number {
    const sumInsured = this.getSumInsured();
    const warSrccRate = this.getwarSrccRate();
    return Math.round(sumInsured * warSrccRate);
  }

  getTaxRate(): number {
    return (this.moneyreceipt?.marinebill?.tax ?? 0) / 100;
  }

  getTotalStampDuty(): number {
    return this.moneyreceipt?.marinebill?.stampDuty ?? 0;
  }

  getTotalPremium(): number {
    const sumInsured = this.getSumInsured();
    const marineRate = this.getMarineRate();
    const warSrccRate = this.getwarSrccRate();
    return Math.round(sumInsured * (marineRate + warSrccRate));
  }

  getTotalTax(): number {
    const totalPremium = this.getTotalPremium();
    const taxRate = this.getTaxRate();
    return Math.round(totalPremium * taxRate);
  }

  getTotalPremiumWithTax(): number {
    const totalPremium = this.getTotalPremium();
    const totalTax = this.getTotalTax();
    const stampDuty = this.getTotalStampDuty();
    return Math.round(totalPremium + totalTax + stampDuty);
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

    // New Method to Get Sum Insured in Words
    getSumInsuredInWords(): string {
      const sumInsuredAmount = this.getSumInsured();
      return this.convertAmountToWords(sumInsuredAmount);
    }
}
