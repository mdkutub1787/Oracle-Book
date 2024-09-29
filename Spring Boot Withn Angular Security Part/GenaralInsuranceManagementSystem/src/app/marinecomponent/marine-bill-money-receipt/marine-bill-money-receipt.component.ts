import { Component, OnInit } from '@angular/core';
import { MarineMoneyReceiptModel } from '../../model/MarineMoneyReceipt.Model';
import { MarineBillMoneyreceiptService } from '../../service/marine-bill-moneyreceipt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marine-bill-money-receipt',
  templateUrl: './marine-bill-money-receipt.component.html',
  styleUrls: ['./marine-bill-money-receipt.component.css'] // Fixed 'styleUrl' to 'styleUrls'
})
export class MarineBillMoneyReceiptComponent implements OnInit {

  marinebill!: MarineMoneyReceiptModel[];

  constructor(
    private marineBillMoneyreceiptService: MarineBillMoneyreceiptService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadMarineMoneyReceipt();
  }

  // Load all Marine Money Receipts
  loadMarineMoneyReceipt() {
    this.marineBillMoneyreceiptService.getMarineMoneyReceipts()
      .subscribe((data: MarineMoneyReceiptModel[]) => {
        this.marinebill = data;
      });
  }

  // Delete a specific Marine Money Receipt by ID
  deleteMarineManyReceipt(id?: number) {
    if (id !== undefined) {
      this.marineBillMoneyreceiptService.deleteMarineMoneyReceipt(id).subscribe({
        next: res => {
          console.log(res);
          this.loadMarineMoneyReceipt();
          this.router.navigate(['/viewmarinemoneyreceipt']);
        },
        error: error => {
          console.log(error);
        }
      });
    } else {
      console.error('Invalid id');
    }
  }

  editMarineMoneyReceipt(id?: number) {
    if (id !== undefined) {
      this.router.navigate(['updatemarinemoneyreceipt', id]);
    } else {
      console.error('Invalid id');
    }
  }


  printMarineMoneyReceipt(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['printmarinemoney', id]);
    } else {
      console.error('ID is undefined');
    }
  }
  

  // Navigate to add a new Marine Money Receipt
  navigateToAddMarineMoneyReceipt() {
    this.router.navigateByUrl('/createmarinemoneyreceipt');
  }

  // Round a value
  round(value: number): number {
    return Math.round(value);
  }

}
