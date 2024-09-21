import { Component, OnInit } from '@angular/core';
import { PolicyModel } from '../../model/policy.model';
import { PolicyService } from '../../service/policy.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-policydetails',
  templateUrl: './policydetails.component.html',
  styleUrl: './policydetails.component.css'
})
export class PolicydetailsComponent implements OnInit {

  id!: number;
  policy!: PolicyModel;

  constructor(
    private policyService: PolicyService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.policy = new PolicyModel();
    this.id = this.route.snapshot.params['id'];
    this.policyService.getByPolicyId(this.id).subscribe({
      next: (data) => {
        console.log('Policy data retrieved:', data);
        this.policy = data;
        // this.router.navigate(['viewpolicy']);
      },
      error: (err) => {
        console.error('Error fetching policy data:', err);
      }
    });
  }


}
