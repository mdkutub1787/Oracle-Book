import { Component, OnInit } from '@angular/core';
import { RecieptService } from '../../service/reciept.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiptModel } from '../../model/reciept.model';

@Component({
  selector: 'app-viewreceipt',
  templateUrl: './printreceipt.component.html',
  styleUrl: './printreceipt.component.css'
})
export class PrintReceiptComponent implements OnInit {

  receipt?: ReceiptModel;

  constructor(
    private receiptService: RecieptService,
    private router: Router,
    private route: ActivatedRoute 
  ) { }



  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    this.receiptService.getRecieptById(id).subscribe({
      next: response => {
        this.receipt = response;
      },
      error: error => {
        alert(error)
      }
    })

  }

  getFirePremium(receipt: ReceiptModel | undefined): number {
    if (receipt && receipt.bill && receipt.bill.policies) {
      const sumInsured = receipt.bill.policies.sumInsured || 0;
      const fire = receipt.bill.fire || 0;
      return (sumInsured * fire) / 100;
    }
    return 0;
  }

  getVAT(receipt: ReceiptModel | undefined): number {
    if (receipt && receipt.bill && receipt.bill.policies) {
      const sumInsured = receipt.bill.policies.sumInsured || 0;
      const fire = receipt.bill.fire || 0;
      const tax = receipt.bill.tax || 0;
      return (sumInsured * fire / 100) * (tax / 100);
    }
    return 0;
  }

  getGrossPremium(receipt: ReceiptModel | undefined): number {
    if (receipt && receipt.bill && receipt.bill.policies) {
      const sumInsured = receipt.bill.policies.sumInsured || 0;
      const fire = receipt.bill.fire || 0;
      const tax = receipt.bill.tax || 0;
      const firePremium = sumInsured * fire / 100;
      const vat = firePremium * (tax / 100);
      return firePremium + vat;
    }
    return 0;
  }
  
  


}
