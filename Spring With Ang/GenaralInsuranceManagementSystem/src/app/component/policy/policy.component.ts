import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../service/policy.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  policy: any;


  constructor(
    private policyService: PolicyService,
    private router: Router
    
  ) { }

  ngOnInit(): void {
    this.policy = this.policyService.viewAllPolicy();

  }

  deletePolicy(id: number) {
    this.policyService.deletePolicy(id)
      .subscribe({
        next: res => {
          console.log(res);
          this.policy = this.policyService.viewAllPolicy();
          this.router.navigate(['viewpolicy'])
        },
        error: error => {
          console.log(error);

        }

      });
  }
  

  editPolicy(id: number) {
    this.router.navigate(['updatepolicy', id]);
  }
  

  navigateToAddPolicy() {
    this.router.navigateByUrl('/createpolicy');
  }

  navigateToAddBill() {
    this.router.navigateByUrl('/createbill');
  }

}
