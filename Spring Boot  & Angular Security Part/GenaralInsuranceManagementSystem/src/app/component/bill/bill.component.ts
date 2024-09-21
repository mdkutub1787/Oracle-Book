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

  policyes: any;
  bills: BillModel[] = [];

  constructor(
    private policiesService: PolicyService,
    private billService: BillService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.policyes = this.policiesService.viewAllPolicyForBill();
    this.billService.viewAllBill().subscribe({
      next: (data: BillModel[]) => {
        this.bills = data;
      },
      error: (error) => {
        console.error('Error fetching bills:', error);
      }
    });
  }

  deleteBill(id: number): void {
    this.billService.deleteBill(id)
      .subscribe({
        next: () => {
          this.refreshBills();
          this.router.navigate(['/viewbill']);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  private refreshBills(): void {
    this.billService.viewAllBill().subscribe({
      next: (data: BillModel[]) => {
        this.bills = data;
      },
      error: (error) => {
        console.error('Error fetching bills:', error);
      }
    });
  }

  editBill(bill: BillModel): void {
    this.router.navigate(['/updatebill', bill.id]);
  }
  
  navigateToAddBill() {
    this.router.navigateByUrl('/createbill');
  }

  navigateToAddReciept() {
    this.router.navigateByUrl('/createreciept');
  }

  getFireAmount(bill: BillModel): number {
    return Math.round((bill.policy.sumInsured * bill.fire) / 100); // Assuming 'fire' is a percentage
  }

  getRsdAmount(bill: BillModel): number {
    return Math.round((bill.policy.sumInsured * bill.rsd) / 100); // Assuming 'rsd' is a percentage
  }

  getNetPremium(bill: BillModel): number {
    const fireAmount = this.getFireAmount(bill);
    const rsdAmount = this.getRsdAmount(bill);
    return Math.round(fireAmount + rsdAmount);
  }

  getTaxAmount(bill: BillModel): number {
    const netPremium = this.getNetPremium(bill);
    return Math.round((netPremium * bill.tax) / 100); // Assuming 'tax' is a percentage
  }

  getGrossPremium(bill: BillModel): number {
    const netPremium = this.getNetPremium(bill);
    const taxAmount = this.getTaxAmount(bill);
    return Math.round(netPremium + taxAmount);
  }

}
