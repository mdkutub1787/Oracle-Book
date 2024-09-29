import { Component, OnInit } from '@angular/core';
import { BillService } from '../../service/bill.service';
import { BillModel } from '../../model/bill.model';
import { PolicyService } from '../../service/policy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  policies: any; // Consider typing this properly if you have a specific type
  bills: BillModel[] = [];
  filteredBills: BillModel[] = [];
  searchTerm: string = '';            
  sortBy: 'policyholder' | 'id' | 'bankName' = 'policyholder'; 

  constructor(
    private policyService: PolicyService,
    private billService: BillService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPolicies();
    this.loadBills();
  }

  private loadPolicies(): void {
    this.policyService.viewAllPolicyForBill().subscribe({
      next: (data) => this.policies = data,
      error: (error) => console.error('Error fetching policies:', error)
    });
  }

  private loadBills(): void {
    this.billService.viewAllBill().subscribe({
      next: (data: BillModel[]) => {
        this.bills = data;
        this.filteredBills = data; // Initialize filteredBills
      },
      error: (error) => console.error('Error fetching bills:', error)
    });
  }

  deleteBill(id: number): void {
    this.billService.deleteBill(id).subscribe({
      next: () => {
        this.refreshBills();
        this.router.navigate(['/viewbill']);
      },
      error: (error) => console.error('Error deleting bill:', error)
    });
  }

  private refreshBills(): void {
    this.loadBills(); // Re-fetch all bills
  }

  editBill(bill: BillModel): void {
    this.router.navigate(['/updatebill', bill.id]);
  }

  detailsBill(id: number) {
    this.router.navigate(['billdetails', id]);
  }
  
  navigateToAddBill(): void {
    this.router.navigateByUrl('/createbill');
  }

  navigateToAddReceipt(): void {
    this.router.navigateByUrl('/createreciept');
  }

  searchBill(): void {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredBills = this.bills.filter(item =>
      item.policy.policyholder?.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.policy.bankName?.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.policy.id?.toString().includes(lowerCaseSearchTerm)
    );
  }

  getFireAmount(bill: BillModel): number {
    return Math.round((bill.policy.sumInsured * bill.fire) / 100);
  }

  getRsdAmount(bill: BillModel): number {
    return Math.round((bill.policy.sumInsured * bill.rsd) / 100);
  }

  getNetPremium(bill: BillModel): number {
    return Math.round(this.getFireAmount(bill) + this.getRsdAmount(bill));
  }

  getTaxAmount(bill: BillModel): number {
    return Math.round((this.getNetPremium(bill) * bill.tax) / 100);
  }

  getGrossPremium(bill: BillModel): number {
    return Math.round(this.getNetPremium(bill) + this.getTaxAmount(bill));
  }
}
