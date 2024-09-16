import { Component } from '@angular/core';
import { PolicyService } from '../../service/policy.service';
import { BillService } from '../../service/bill.service';
import { Router, ActivatedRoute } from '@angular/router';
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
    private policiesService: PolicyService,
    private billService: BillService,
    private receiptService:ReceiptService ,
    private router: Router,
    private route: ActivatedRoute 
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
    
      this.receiptService.deleteReceipt(id).subscribe(() => {
        this.receipts = this.receipts.filter(receipt => receipt.id == id);
        
      });
    }
  

  navigateToAddReceipt() {
    this.router.navigateByUrl('/createreciept');
  }



}
