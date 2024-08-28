import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PolicyModel } from '../../model/policy.model';
import { PolicyService } from '../../service/policy.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  policies: PolicyModel[] = [];
  searchCriteria: string = '';
  searchValue: string = '';

  constructor(private fb: FormBuilder, private policyService: PolicyService) {
    this.searchForm = this.fb.group({
     
      value: ['']
    });
  }

  ngOnInit(): void {
    // Initial setup if needed
  }

  // Perform search based on criteria and value
  searchPolicies(): void {
    if (this.searchValue) {
      this.policyService.searchPolicies(this.searchCriteria, this.searchValue).subscribe(
        (data: PolicyModel[]) => this.policies = data,
        error => console.error('Error searching policies', error)
      );
    }
  }
}
