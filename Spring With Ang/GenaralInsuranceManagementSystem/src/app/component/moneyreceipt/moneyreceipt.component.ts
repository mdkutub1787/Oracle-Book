import { Component } from '@angular/core';
import { MoneyReceiptModel } from '../../model/moneyreceipt.model';
import { MoneyreceiptService } from '../../service/moneyreceipt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moneyreceipt',
  templateUrl: './moneyreceipt.component.html',
  styleUrl: './moneyreceipt.component.css'
})
export class MoneyreceiptComponent {

  moneyreceipts: MoneyReceiptModel[] = [];

  constructor(
    private moneyreceiptService:MoneyreceiptService ,
    private router: Router,
   
  ) { }

  ngOnInit(): void {
    this.loadMoneyReceipts();
  }

  private loadMoneyReceipts(): void {
    this.moneyreceiptService.getAllMoneyReceipt().subscribe({
      next: response => {
        this.moneyreceipts = response;
      },
      error: error => {
        console.error('Error fetching receipts:', error);
        alert('Failed to fetch moneyreceipts. Please try again.');
      }
    });
  }


  viewReceipt(id: number) {
    this.router.navigate(['/printreciept', id]);
  }

  deleteMoneyReceipt(id: number): void {
    this.moneyreceiptService.deleteMoneyReceipt(id).subscribe({
      next: () => {
        this.moneyreceipts = this.moneyreceipts.filter(moneyreceipt => moneyreceipt.id !== id);
        this.router.navigate(['/viewmoneyreciept']);
      },
      error: (err) => {
        console.error('Error deleting moneyreceipt:', err);
        alert('There was an error deleting the moneyreceipt. Please try again.');
      }
    });
  }

  viewMoneyReceipt(id: number) {
    this.router.navigate(['/printmoneyreciept', id]);
  }

  navigateToAddMoneyReceipt() {
    this.router.navigateByUrl('/createmoneyreciept');
  }

}
