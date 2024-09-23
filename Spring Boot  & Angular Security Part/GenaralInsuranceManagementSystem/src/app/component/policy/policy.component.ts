import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../service/policy.service';
import { Router } from '@angular/router';
import { PolicyModel } from '../../model/policy.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  policy!: Observable<PolicyModel[]>;
  filtered: PolicyModel[] = [];
  searchQuery: string = '';

  constructor(
    private policyService: PolicyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.reloadPolicy();
  }

  reloadPolicy() {
    this.policy = this.policyService.viewAllPolicy();
  }

  deletePolicy(id: number) {
    this.policyService.deletePolicy(id)
      .subscribe({
        next: res => {
          console.log(res);
          this.reloadPolicy();  // Reload policies after deletion
          this.router.navigate(['viewpolicy']);
        },
        error: error => {
          console.log(error);
        }
      });
  }
  
  editPolicy(id: number) {
    this.router.navigate(['updatepolicy', id]);
  }

  detailsPolicy(id: number) {
    this.router.navigate(['details', id]);
  }
  
  navigateToAddPolicy() {
    this.router.navigateByUrl('/createpolicy');
  }

  navigateToAddBill() {
    this.router.navigateByUrl('/createbill');
  }

  searchPolicyHolderAndBankName(): void {
    this.policy.pipe(
      map((policies: PolicyModel[]) => 
        policies.filter(policy => 
          policy.policyholder?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          policy.bankName?.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      )
    ).subscribe(filteredPolicies => {
      this.filtered = filteredPolicies; 
    });
  }
  

  
}
