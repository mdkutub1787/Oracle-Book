import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReceiptModel } from '../../model/receipt.model';
import { ReceiptService } from '../../service/receipt.service';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent {

  receipts: ReceiptModel[] = [];

  constructor(
    private receiptService:ReceiptService ,
    private router: Router,
   
  ) { }

  ngOnInit(): void {
    this.loadReceipts();
  }

 

  private loadReceipts(): void {
    this.receiptService.getAllReceipt().subscribe({
      next: response => {
        this.receipts = response;
      },
      error: error => {
        console.error('Error fetching receipts:', error);
        alert('Failed to fetch receipts. Please try again.');
      }
    });
  }

  viewReceipt(id: number) {
    this.router.navigate(['/printreciept', id]);
  }

  deleteReceipt(id: number): void {
    this.receiptService.deleteReceipt(id).subscribe({
      next: () => {
        this.receipts = this.receipts.filter(receipt => receipt.id !== id);
        this.router.navigate(['/viewreciept']);
      },
      error: (err) => {
        console.error('Error deleting receipt:', err);
        alert('There was an error deleting the receipt. Please try again.');
      }
    });
  }
  
  navigateToAddReceipt() {
    this.router.navigateByUrl('/createreciept');
  }

  navigateToAddMoneyReceipt() {
    this.router.navigateByUrl('/createmoneyreciept');
  }

}
