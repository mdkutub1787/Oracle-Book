import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../service/policy.service';
import { BillService } from '../../service/bill.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RecieptService } from '../../service/reciept.service';
import { ReceiptModel } from '../../model/reciept.model';

@Component({
  selector: 'app-reciept',
  templateUrl: './reciept.component.html',
  styleUrls: ['./reciept.component.css'] // Corrected to 'styleUrls'
})
export class RecieptComponent implements OnInit {

  receipts: ReceiptModel[] = [];

  constructor(
    private policiesService: PolicyService,
    private billService: BillService,
    private recieptService: RecieptService,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute to get route parameters
  ) { }

  ngOnInit(): void {
    this.loadReceipts();
  }

  navigateToAddReciept() {
    this.router.navigateByUrl('/createreciept');
  }

  private loadReceipts(): void {
    this.recieptService.getAllReciept().subscribe({
      next: response => {
        this.receipts = response;
      },
      error: error => {
        console.error('Error fetching receipts:', error);
        alert('Failed to fetch receipts. Please try again.');
      }
    });
  }

  viewReceipt(id: string) {
    this.router.navigate(['/printreciept', id]);
  }
}
