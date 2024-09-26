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
  filteredReceipts: ReceiptModel[] = []; 
  searchTerm: string = '';            
  sortBy: 'policyholder' | 'id' | 'bankName' = 'policyholder'; 

  constructor(
    private receiptService: ReceiptService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadReceipts();
  }

  loadReceipts(): void {
    this.receiptService.getAllReceipt().subscribe({
      next: response => {
        this.receipts = response;
        this.filteredReceipts = [...this.receipts]; 
      },
      error: error => {
        console.error('Error fetching receipts:', error);
        alert('Failed to fetch receipts. Please try again.');
      }
    });
  }

  viewReceipt(id: number): void {
    this.router.navigate(['/printreciept', id]);
  }

  deleteReceipt(id: number): void {
    this.receiptService.deleteReceipt(id).subscribe({
      next: () => {
        this.receipts = this.receipts.filter(receipt => receipt.id !== id);
        this.filteredReceipts = this.filteredReceipts.filter(receipt => receipt.id !== id); 
        this.router.navigate(['/viewreciept']);
      },
      error: (err) => {
        console.error('Error deleting receipt:', err);
        alert('There was an error deleting the receipt. Please try again.');
      }
    });
  }
  
  navigateToAddReceipt(): void {
    this.router.navigateByUrl('/createreciept');
  }

  navigateToAddMoneyReceipt(): void {
    this.router.navigateByUrl('/createmoneyreciept');
  }

  searchReceipt(): void {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
  
    this.filteredReceipts = this.receipts.filter(item =>
      item.bill?.policy.policyholder?.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.bill?.policy.bankName?.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.bill?.policy.id?.toString().includes(lowerCaseSearchTerm)
    );
  }

}
