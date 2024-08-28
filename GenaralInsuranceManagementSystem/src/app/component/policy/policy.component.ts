import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../service/policy.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PolicyModel } from '../../model/policy.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  policies: any;


  constructor(
    private policyService: PolicyService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.policies = this.policyService.viewAllPolicy();

  }

  deletePolicy(id: string) {
    this.policyService.deletePolicy(id)
      .subscribe({
        next: res => {
          console.log(res);
          this.policies = this.policyService.viewAllPolicy();
          this.router.navigate(['viewpolicy'])
        },
        error: error => {
          console.log(error);

        }

      });
  }

  editPolicy(id: string) {
    this.router.navigate(['updatepolicy', id]);
  }

  navigateToAddPolicy() {
    this.router.navigateByUrl('/createpolicy');
  }
}
