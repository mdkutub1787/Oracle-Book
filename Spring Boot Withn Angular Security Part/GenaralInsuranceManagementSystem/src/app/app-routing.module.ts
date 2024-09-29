import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PolicyComponent } from './component/policy/policy.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { LogoutComponent } from './logout/logout.component';
import { CreatepolicyComponent } from './component/createpolicy/createpolicy.component';
import { UpdatepolicyComponent } from './component/updatepolicy/updatepolicy.component';
import { BillComponent } from './component/bill/bill.component';
import { CreatebillComponent } from './component/createbill/createbill.component';
import { UpdatebillComponent } from './component/updatebill/updatebill.component';
import { PolicydetailsComponent } from './component/policydetails/policydetails.component';
import { MoneyreceiptComponent } from './component/moneyreceipt/moneyreceipt.component';
import { CreatemoneyreceiptComponent } from './component/createmoneyreceipt/createmoneyreceipt.component';
import { PrintmoneyreceiptComponent } from './component/printmoneyreceipt/printmoneyreceipt.component';
import { MarineinsurancedetailsComponent } from './marinecomponent/marineinsurancedetails/marineinsurancedetails.component';
import { MarineinsurancelistComponent } from './marinecomponent/marineinsurancelist/marineinsurancelist.component';
import { MarineinsurancebillComponent } from './marinecomponent/marineinsurancebill/marineinsurancebill.component';
import { CtreatemarineinsurancebillComponent } from './marinecomponent/ctreatemarineinsurancebill/ctreatemarineinsurancebill.component';
import { MarineinsurancebillDetailsComponent } from './marinecomponent/marineinsurancebill-details/marineinsurancebill-details.component';
import { MarineBillMoneyReceiptComponent } from './marinecomponent/marine-bill-money-receipt/marine-bill-money-receipt.component';
import { CreateMarineBillMoneyReceiptComponent } from './marinecomponent/create-marine-bill-money-receipt/create-marine-bill-money-receipt.component';
import { UpdateMarineBillComponent } from './marinecomponent/update-marine-bill/update-marine-bill.component';
import { PrintMarinemoneyReceiptComponent } from './marinecomponent/print-marinemoney-receipt/print-marinemoney-receipt.component';
import { CreateMarineListComponent } from './marinecomponent/create-marine-list/create-marine-list.component';
import { BillDetailsComponent } from './component/bill-details/bill-details.component';


const routes: Routes = [
  {path: '',pathMatch: 'full',redirectTo: '/home'},
  {path: 'home',component: HomeComponent},
  { path: "viewpolicy", component: PolicyComponent },
  { path: "createpolicy", component: CreatepolicyComponent },
  { path: "updatepolicy/:id", component: UpdatepolicyComponent },
  { path: "details/:id", component: PolicydetailsComponent },
  { path: "viewbill", component: BillComponent },
  { path: "billdetails/:id", component: BillDetailsComponent },
  { path: "createbill", component: CreatebillComponent },
  { path: "updatebill/:id", component: UpdatebillComponent},
  { path: "viewmoneyreciept", component: MoneyreceiptComponent},
  { path: "createmoneyreciept", component: CreatemoneyreceiptComponent},
  { path: "printmoneyreciept/:id", component: PrintmoneyreceiptComponent},
  { path: "viewmarinelist", component: MarineinsurancelistComponent},
  { path: "marinedetails/:id", component: MarineinsurancedetailsComponent },
  { path: 'createmarinelist', component: CreateMarineListComponent },
  { path: 'updatemarinelist/:id', component: CreateMarineListComponent },
  { path: "viewmarinebill", component: MarineinsurancebillComponent},
  { path: 'createmarinebill', component: CtreatemarineinsurancebillComponent },
  { path: 'updatemarinebill/:id', component: UpdateMarineBillComponent },
  { path: "marinebilldetails/:id", component: MarineinsurancebillDetailsComponent },
  { path: "viewmarinemoneyreceipt", component: MarineBillMoneyReceiptComponent },
  { path: "createmarinemoneyreceipt", component: CreateMarineBillMoneyReceiptComponent },
  { path: "printmarinemoney/:id", component: PrintMarinemoneyReceiptComponent },
  { path: "reg", component: RegistrationComponent},
  { path: "login", component: LoginComponent},
  { path: "logout", component: LogoutComponent},
  { path: "userprofile", component: UserprofileComponent},


  { path: "**", redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
