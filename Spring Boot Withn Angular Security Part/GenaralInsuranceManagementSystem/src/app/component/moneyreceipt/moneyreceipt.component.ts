import { Component } from '@angular/core';
import { MoneyReceiptModel } from '../../model/moneyreceipt.model';
import { MoneyreceiptService } from '../../service/moneyreceipt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moneyreceipt',
  templateUrl: './moneyreceipt.component.html',
  styleUrls: ['./moneyreceipt.component.css']  // Corrected 'styleUrls'
})
export class MoneyreceiptComponent {

  moneyreceipts: MoneyReceiptModel[] = [];
  filteredMoneyReceipts: MoneyReceiptModel[] = []; 
  searchTerm: string = '';            
  sortBy: 'issuingOffice' | 'policyholder' | 'id' | 'bankName' = 'policyholder'; 

  constructor(
    private moneyreceiptService: MoneyreceiptService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadMoneyReceipts();
  }

  private loadMoneyReceipts(): void {
    this.moneyreceiptService.getAllMoneyReceipt().subscribe({
      next: response => {
        this.moneyreceipts = response;
        this.filteredMoneyReceipts = [...this.moneyreceipts]; // Initialize filtered receipts
      },
      error: error => {
        console.error('Error fetching money receipts:', error);
        alert('Failed to fetch money receipts. Please try again.');
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
        this.filteredMoneyReceipts = this.filteredMoneyReceipts.filter(moneyreceipt => moneyreceipt.id !== id);
        this.router.navigate(['/viewmoneyreciept']);
      },
      error: (err) => {
        console.error('Error deleting money receipt:', err);
        alert('There was an error deleting the money receipt. Please try again.');
      }
    });
  }


  
  viewMoneyReceipt(id: number) {
    this.router.navigate(['/printmoneyreciept', id]);
  }

  navigateToAddMoneyReceipt() {
    this.router.navigateByUrl('/createmoneyreciept');
  }

  searchMoneyReceipt(): void {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
  
    this.filteredMoneyReceipts = this.moneyreceipts.filter(item =>
      item.issuingOffice?.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.bill?.policy.policyholder?.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.bill?.policy.bankName?.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.bill?.policy.id?.toString().includes(lowerCaseSearchTerm)
    );
  }

}
