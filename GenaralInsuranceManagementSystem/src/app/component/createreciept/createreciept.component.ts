import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReceiptModel } from '../../model/reciept.model';
import { PolicyModel } from '../../model/policy.model';
import { RecieptService } from '../../service/reciept.service';
import { PolicyService } from '../../service/policy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BillService } from '../../service/bill.service';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-createreciept',
  templateUrl: './createreciept.component.html',
  styleUrls: ['./createreciept.component.css']
})
export class CreaterecieptComponent implements OnInit {

  receiptForm!: FormGroup;
  policyholders: PolicyModel[] = [];

  constructor(
    private fb: FormBuilder,
    private policyService: PolicyService,
    private billService: BillService,
    private receiptService: RecieptService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setFormData();
    this.loadPolicyholders();
  }

  private initializeForm(): void {
    this.receiptForm = this.fb.group({
      id: ['', Validators.required],
      bill: this.fb.group({
        fire: [undefined],
        rsd: [undefined],
        netPremium: [undefined],
        tax: [undefined],
        grossPremium: [undefined],
        policies: this.fb.group({
          billNo: [undefined],
          date: [undefined],
          bankName: [undefined],
          policyholder: [undefined],
          address: [undefined],
          stockInsured: [undefined],
          sumInsured: [undefined],
          interestInsured: [undefined],
          coverage: [undefined],
          location: [undefined],
          construction: [undefined],
          owner: [undefined],
          usedAs: [undefined],
          periodFrom: [undefined],
          periodTo: [undefined],
        })
      })
    });

    this.receiptForm.get('bill.policies.policyholder')?.valueChanges.subscribe(policyholderId => {
      this.autoFillPolicyData(policyholderId);
    });
  }

  private loadPolicyholders(): void {
    this.policyService.getAllPolicies().subscribe(policies => {
      this.policyholders = policies;
    }, error => {
      console.error('Error fetching policyholders:', error);
      alert('Failed to fetch policyholders. Please try again.');
    });
  }

  private autoFillPolicyData(policyholderId: string): void {
    const selectedPolicy = this.policyholders.find(policy => policy.id === policyholderId);
    if (selectedPolicy) {
      this.receiptForm.patchValue({
        bill: {
          policies: {
            billNo: selectedPolicy.billNo,
            date: selectedPolicy.date,
            bankName: selectedPolicy.bankName,
            address: selectedPolicy.address,
            stockInsured: selectedPolicy.stockInsured,
            sumInsured: selectedPolicy.sumInsured,
            interestInsured: selectedPolicy.interestInsured,
            coverage: selectedPolicy.coverage,
            location: selectedPolicy.location,
            construction: selectedPolicy.construction,
            owner: selectedPolicy.owner,
            usedAs: selectedPolicy.usedAs,
            periodFrom: selectedPolicy.periodFrom,
            periodTo: selectedPolicy.periodTo,
          }
        }
      });
    }
  }

  private setFormData(): void {
    const billId = this.route.snapshot.paramMap.get('billId');
    const policyId = this.route.snapshot.paramMap.get('policyId');

    if (billId) {
      this.billService.getByBillId(billId).subscribe(billData => {
        this.receiptForm.patchValue({
          bill: {
            fire: billData.fire,
            rsd: billData.rsd,
            netPremium: billData.netPremium,
            tax: billData.tax,
            grossPremium: billData.grossPremium,
            policies: {
              billNo: billData.policies.billNo,
              date: billData.policies.date,
              bankName: billData.policies.bankName,
              policyholder: billData.policies.policyholder,
              address: billData.policies.address,
              stockInsured: billData.policies.stockInsured,
              sumInsured: billData.policies.sumInsured,
              interestInsured: billData.policies.interestInsured,
              coverage: billData.policies.coverage,
              location: billData.policies.location,
              construction: billData.policies.construction,
              owner: billData.policies.owner,
              usedAs: billData.policies.usedAs,
              periodFrom: billData.policies.periodFrom,
              periodTo: billData.policies.periodTo,
            }
          }
        });
      }, error => {
        console.error('Error fetching bill data:', error);
        alert('Failed to fetch bill data. Please try again.');
      });
    }

    if (policyId) {
      this.policyService.getByPolicyId(policyId).subscribe(policyData => {
        this.receiptForm.patchValue({
          bill: {
            policies: {
              billNo: policyData.billNo,
              date: policyData.date,
              bankName: policyData.bankName,
              policyholder: policyData.policyholder,
              address: policyData.address,
              stockInsured: policyData.stockInsured,
              sumInsured: policyData.sumInsured,
              interestInsured: policyData.interestInsured,
              coverage: policyData.coverage,
              location: policyData.location,
              construction: policyData.construction,
              owner: policyData.owner,
              usedAs: policyData.usedAs,
              periodFrom: policyData.periodFrom,
              periodTo: policyData.periodTo,
            }
          }
        });
      }, error => {
        console.error('Error fetching policy data:', error);
        alert('Failed to fetch policy data. Please try again.');
      });
    }
  }

  createReceipt(): void {
    if (this.receiptForm.valid) {
      const receiptData: ReceiptModel = this.receiptForm.value;
      this.receiptService.createReciept(receiptData).subscribe(
        response => {
          this.receiptForm.reset();
          this.router.navigate(['viewreciept']);
        },
        error => {
          console.error('Error creating receipt:', error);
          alert('Failed to create receipt. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
