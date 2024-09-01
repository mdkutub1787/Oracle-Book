import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PolicyModule {
  "id": string | undefined;
  "billNo": number | undefined;
  "date": Date | undefined;
  "bankName": string | undefined;
  "policyholder": string | undefined;
  "address": string | undefined;
  "sumInsured": number | undefined;
  "stockInsured": string | undefined;
  "interestInsured": string | undefined;
  "usedAs": string| undefined;
 }
