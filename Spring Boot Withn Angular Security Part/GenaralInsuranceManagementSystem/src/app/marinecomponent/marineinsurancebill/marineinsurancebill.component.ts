import { Component, OnInit } from '@angular/core';
import { MarineBillModel } from '../../model/MarineBill.Model';
import { MarinebillService } from '../../service/marinebill.service';
import { Router } from '@angular/router';
import { MarinedetailsService } from '../../service/marinedetails.service';

@Component({
  selector: 'app-marineinsurancebill',
  templateUrl: './marineinsurancebill.component.html',
  styleUrl: './marineinsurancebill.component.css'
})
export class MarineinsurancebillComponent implements OnInit {

  policies: any;
  marinebills: MarineBillModel[] = [];
  filteredBills: MarineBillModel[] = [];
  searchTerm: string = '';
  sortBy: 'policyholder' | 'id' | 'bankName' = 'policyholder';

  constructor(
    private marinedetailsService: MarinedetailsService,
    private MarinebillService: MarinebillService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPolicies();
    this.loadBills();
  }

  private loadPolicies(): void {
    this.marinedetailsService.viewAllMarineListForMarineBill().subscribe({
      next: (data) => this.policies = data,
      error: (error) => console.error('Error fetching policies:', error)
    });
  }

  private loadBills(): void {
    this.MarinebillService.getMarineBill().subscribe({
      next: (data: MarineBillModel[]) => {
        this.marinebills = data;
        this.filteredBills = data; // Initialize filteredBills
      },
      error: (error) => console.error('Error fetching marinebill:', error)
    });
  }

  deleteMarineBill(id: number): void {
    this.MarinebillService.deleteMarineBill(id).subscribe({
      next: () => {
        this.refreshBills();
        this.router.navigate(['/viewmarinebill']);
      },
      error: (error) => console.error('Error deleting marinebill:', error)
    });
  }

  private refreshBills(): void {
    this.loadBills(); // Re-fetch all marinebill
  }

  editMarineBill(marinebill: MarineBillModel): void {
    this.router.navigate(['/updatemarinebill', marinebill.id]);
  }

  detailsMarineBill(id: number) {
    this.router.navigate(['marinebilldetails', id]);
  }

  navigateToAddMarineBill(): void {
    this.router.navigateByUrl('/createmarinebill');
  }

  navigateToAddMarineReceipt(): void {
    this.router.navigateByUrl('/createmarinemoneyreceipt');
  }



  getFireAmount(marinebill: MarineBillModel): number {
    return Math.round((marinebill.marineDetails.sumInsured * marinebill.marineRate) / 100);
  }

  getRsdAmount(marinebill: MarineBillModel): number {
    return Math.round((marinebill.marineDetails.sumInsured * marinebill.warSrccRate) / 100);
  }

  getNetPremium(marinebill: MarineBillModel): number {
    return Math.round(this.getFireAmount(marinebill) + this.getRsdAmount(marinebill));
  }

  getTaxAmount(marinebill: MarineBillModel): number {
    return Math.round((this.getNetPremium(marinebill) * marinebill.tax) / 100);
  }

  getStampDutyAmount(marinebill: MarineBillModel): number {
    return Math.round(marinebill.stampDuty || 0); 
  }

  getGrossPremium(marinebill: MarineBillModel): number {
    return Math.round(
      this.getNetPremium(marinebill) +
      this.getTaxAmount(marinebill) +
      this.getStampDutyAmount(marinebill)
    );
  }
}
