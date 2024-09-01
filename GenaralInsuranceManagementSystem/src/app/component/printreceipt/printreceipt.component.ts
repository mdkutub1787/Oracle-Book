import { Component, OnInit } from '@angular/core';
import { RecieptService } from '../../service/reciept.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiptModel } from '../../model/reciept.model';

@Component({
  selector: 'app-viewreceipt',
  templateUrl: './printreceipt.component.html',
  styleUrl: './printreceipt.component.css'
})
export class PrintReceiptComponent implements OnInit {

  receipt?: ReceiptModel;
  

  constructor(
    private receiptService: RecieptService,
    private router: Router,
    private route: ActivatedRoute 
  ) { }



  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.receiptService.getRecieptById(id).subscribe({
      next: response => {
        this.receipt = response;
      },
      error: error => {
        alert('Error fetching receipt: ' + error);
      }
    });
  }

  getSumInsured(): number {
    // Provide a default value if `sumInsured` is undefined
    return this.receipt?.bill?.policies?.sumInsured ?? 0;
  }

  getFireRate(): number {
    // Provide a default value if `fire` is undefined
    return this.receipt?.bill?.fire ?? 0;
  }

  getTotalFire(): number {
    const sumInsured = this.getSumInsured();
    const fire = this.getFireRate();
    return sumInsured * fire;
  }

  getRsdRate(): number {
    // Provide a default value if `rsd` is undefined
    return this.receipt?.bill?.rsd ?? 0;
  }

  getTotalRsd(): number {
    const sumInsured = this.getSumInsured();
    const rsd = this.getRsdRate();
    return sumInsured * rsd;
  }

  getTaxRate(): number {
    // Provide a default value if `tax` is undefined
    return this.receipt?.bill?.tax ?? 0;
  }

  getTotalPremium(): number {
    const sumInsured = this.getSumInsured();
    const fire = this.getFireRate();
    const rsd = this.getRsdRate();
    return sumInsured * (fire + rsd);
  }

  getTotalTax(): number {
    const totalPremium = this.getTotalPremium();
    const tax = this.getTaxRate();
    return totalPremium * tax;
  }

  getTotalPremiumWithTax(): number {
    const totalPremium = this.getTotalPremium();
    const totalTax = this.getTotalTax();
    return totalPremium + totalTax;
  }
}

