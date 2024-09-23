import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../service/policy.service';
import { Router } from '@angular/router';
import { PolicyModel } from '../../model/policy.model';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  policy!: PolicyModel[];                
  policies: PolicyModel[] = []; 
  searchTerm: string = '';            
  sortBy: 'policyholder' | 'bankName' = 'policyholder'; 

  constructor(
    private policyService: PolicyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.reloadPolicy(); 
  }

  reloadPolicy() {
    this.policyService.viewAllPolicyForBill().subscribe((data: PolicyModel[]) => {
      this.policy = data;             
      this.policies = [...this.policy]; 
    });
  }

  // Delete a policy by ID
  deletePolicy(id: number) {
    this.policyService.deletePolicy(id).subscribe({
      next: res => {
        console.log(res);
        this.reloadPolicy();  
        this.router.navigate(['viewpolicy']);
      },
      error: error => {
        console.log(error);
      }
    });
  }
  
  // Navigate to the update policy page
  editPolicy(id: number) {
    this.router.navigate(['updatepolicy', id]);
  }

  // Navigate to the details policy page
  detailsPolicy(id: number) {
    this.router.navigate(['details', id]);
  }
  
  // Navigate to the create policy page
  navigateToAddPolicy() {
    this.router.navigateByUrl('/createpolicy');
  }

  // Navigate to the create bill page
  navigateToAddBill() {
    this.router.navigateByUrl('/createbill');
  }

  // Filter policies based on search term
  filterPolicy() {
    this.policies = this.policy.filter(item =>
      item.policyholder?.toLowerCase().includes(this.searchTerm.toLowerCase())
      || item.bankName?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
   
  }


}
