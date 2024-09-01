import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PolicyService } from '../../service/policy.service';

@Component({
  selector: 'app-viewpolicy',
  templateUrl: './viewpolicy.component.html',
  styleUrl: './viewpolicy.component.css'
})
export class ViewpolicyComponent implements OnInit {
  policyes: any;

  constructor(
    private policyService: PolicyService,
    private http: HttpClient,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.policyes = this.policyService.viewAllPolicy();

  }



}

