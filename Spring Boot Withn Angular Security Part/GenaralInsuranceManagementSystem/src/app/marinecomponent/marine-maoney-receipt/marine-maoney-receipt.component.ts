import { Component, OnInit } from '@angular/core';
import { MarineMoneyReceiptModel } from '../../model/MarineMoneyReceipt.Model';
import { MarineBillMoneyreceiptService } from '../../service/marine-bill-moneyreceipt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marine-maoney-receipt',
  templateUrl: './marine-maoney-receipt.component.html',
  styleUrl: './marine-maoney-receipt.component.css'
})
export class MarineMaoneyReceiptComponent implements OnInit{

  marinebill: MarineMoneyReceiptModel[] = [];
  filteredMarineMoneyReceipts: MarineMoneyReceiptModel[] = [];
  searchTerm: string = '';
  isLoading: boolean = false; 
  errorMessage: string | null = null; 
  sortBy: 'issuingOffice' | 'policyholder' | 'id' | 'bankName' | 'issuingOffice' = 'policyholder'; 


  constructor(
    private marineBillMoneyreceiptService: MarineBillMoneyreceiptService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMarineMoneyReceipts();
  }

  // Load all Marine Money Receipts
  loadMarineMoneyReceipts() {
    this.isLoading = true; // Set loading state
    this.marineBillMoneyreceiptService.getMarineMoneyReceipts()
      .subscribe({
        next: (data: MarineMoneyReceiptModel[]) => {
          this.marinebill = data;
          this.filteredMarineMoneyReceipts = data; // Initialize filtered list
          this.isLoading = false; // Reset loading state
        },
        error: (error) => {
          console.error('Error fetching Marine Money Receipts:', error);
          this.errorMessage = 'Failed to load Marine Money Receipts.';
          this.isLoading = false; // Reset loading state
        }
      });
  }

  // Delete a specific Marine Money Receipt by ID
  deleteMarineManyReceipt(id?: number) {
    if (id !== undefined) {
      this.marineBillMoneyreceiptService.deleteMarineMoneyReceipt(id).subscribe({
        next: res => {
          console.log(res);
          this.loadMarineMoneyReceipts(); // Reload after delete
          this.router.navigate(['/viewmarinemoneyreceipt']);
        },
        error: error => {
          console.error('Error deleting Marine Money Receipt:', error);
          this.errorMessage = 'Failed to delete Marine Money Receipt.';
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

  // Search Marine Money Receipts
  searchMarineMoneyReceipt(): void {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
  
    this.filteredMarineMoneyReceipts = this.marinebill.filter(item => 
      item.issuingOffice?.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.marinebill?.marineDetails?.policyholder?.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.marinebill?.marineDetails?.bankName?.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.marinebill?.marineDetails?.id?.toString().includes(lowerCaseSearchTerm)
    );
  }
}
