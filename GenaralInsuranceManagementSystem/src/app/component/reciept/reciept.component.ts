import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../service/policy.service';
import { BillService } from '../../service/bill.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RecieptService } from '../../service/reciept.service';

@Component({
  selector: 'app-reciept',
  templateUrl: './reciept.component.html',
  styleUrls: ['./reciept.component.css'] // Corrected to 'styleUrls'
})
export class RecieptComponent implements OnInit {

  policies: any[] = [];
  bills: any[] = [];
  receipts: any[] = [];

  constructor(
    private policiesService: PolicyService,
    private billService: BillService,
    private recieptService: RecieptService,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute to get route parameters
  ) { }

  ngOnInit(): void {
    this.loadPolicies();
    this.loadBills();
    this.loadReceipts();
  }

  navigateToAddReciept() {
    this.router.navigateByUrl('/createreciept');
  }

  private loadPolicies(): void {
    this.policiesService.getAllPolicies().subscribe(policies => {
      this.policies = policies;
    }, error => {
      console.error('Error fetching policies:', error);
      alert('Failed to fetch policies. Please try again.');
    });
  }

  private loadBills(): void {
    this.billService.getAllBillForReciept().subscribe(bills => {
      this.bills = bills;
    }, error => {
      console.error('Error fetching bills:', error);
      alert('Failed to fetch bills. Please try again.');
    });
  }

  private loadReceipts(): void {
    this.recieptService.getAllReciept().subscribe(receipts => {
      this.receipts = receipts;
    }, error => {
      console.error('Error fetching receipts:', error);
      alert('Failed to fetch receipts. Please try again.');
    });
  }
}
