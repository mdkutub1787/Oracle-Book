import { Component, OnInit } from '@angular/core';
import { ReceiptModel } from '../../model/receipt.model';
import { ReceiptService } from '../../service/receipt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-printreceipt',
  templateUrl: './printreceipt.component.html',
  styleUrl: './printreceipt.component.css'
})
export class PrintreceiptComponent implements OnInit{

  receipt?: ReceiptModel;

  constructor(
    private receiptService: ReceiptService,
    private router: Router,
    private route: ActivatedRoute 
  ) { }



  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    this.receiptService.getReceiptById(id).subscribe({
      next: response => {
        this.receipt = response;
      },
      error: error => {
        alert(error)
      }
    })

  }

  getSumInsured(): number {
    // Provide a default value if `sumInsured` is undefined
    return this.receipt?.bill?.policy?.sumInsured ?? 0;
  }

  getFireRate(): number {
    // Provide a default value if `fire` is undefined
    return this.receipt?.bill?.fire ?? 0;
  }

  getTotalFire(): number {
    const sumInsured = this.getSumInsured();
    const fireRate = this.getFireRate();
    return sumInsured * fireRate;
  }

  getRsdRate(): number {
    // Provide a default value if `rsd` is undefined
    return this.receipt?.bill?.rsd ?? 0;
  }

  getTotalRsd(): number {
    const sumInsured = this.getSumInsured();
    const rsdRate = this.getRsdRate();
    return sumInsured * rsdRate;
  }

  getTaxRate(): number {
    // Provide a default value if `tax` is undefined
    return this.receipt?.bill?.tax ?? 0;
  }

  getTotalPremium(): number {
    const sumInsured = this.getSumInsured();
    const fireRate = this.getFireRate();
    const rsdRate = this.getRsdRate();
    return sumInsured * (fireRate + rsdRate);
  }

  getTotalTax(): number {
    const totalPremium = this.getTotalPremium();
    const taxRate = this.getTaxRate();
    return totalPremium * taxRate;
  }

  getTotalPremiumWithTax(): number {
    const totalPremium = this.getTotalPremium();
    const totalTax = this.getTotalTax();
    return totalPremium + totalTax;
  }
}
