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

  policy!: PolicyModel[];                // Array to hold all policies
  filteredPolicy: PolicyModel[] = [];    // Array for filtered policies
  searchTerm: string = '';               // Search term for filtering
  sortBy: 'policyholder' | 'bankName' = 'policyholder';  // Sorting criteria

  constructor(
    private policyService: PolicyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.reloadPolicy();  // Fetch all policies on initialization
  }

  // Fetch all policies from the API
  reloadPolicy() {
    this.policyService.viewAllPolicyForBill().subscribe((data: PolicyModel[]) => {
      this.policy = data;               // Store fetched policies
      this.filteredPolicy = [...this.policy];  // Initially set filteredPolicy equal to policies
    });
  }

  // Delete a policy by ID
  deletePolicy(id: number) {
    this.policyService.deletePolicy(id).subscribe({
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
    this.filteredPolicy = this.policy.filter(item =>
      item.policyholder?.toLowerCase().includes(this.searchTerm.toLowerCase())
      || item.bankName?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.sortPolicy();  // Apply sorting after filtering
  }

  // Sort policies based on selected criterion (policyholder or bankName)
  sortPolicy() {
    this.filteredPolicy.sort((a, b) => {
      const valueA = a[this.sortBy]?.toLowerCase() ?? '';  
      const valueB = b[this.sortBy]?.toLowerCase() ?? '';

      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
  }
}
