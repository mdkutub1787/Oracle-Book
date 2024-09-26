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
import { ReceiptComponent } from './component/receipt/receipt.component';
import { CreatereceiptComponent } from './component/createreceipt/createreceipt.component';
import { PrintreceiptComponent } from './component/printreceipt/printreceipt.component';
import { PolicydetailsComponent } from './component/policydetails/policydetails.component';
import { MoneyreceiptComponent } from './component/moneyreceipt/moneyreceipt.component';
import { CreatemoneyreceiptComponent } from './component/createmoneyreceipt/createmoneyreceipt.component';
import { PrintmoneyreceiptComponent } from './component/printmoneyreceipt/printmoneyreceipt.component';
import { MarineinsurancedetailsComponent } from './marinecomponent/marineinsurancedetails/marineinsurancedetails.component';
import { CreatemarineinsurancedetailsComponent } from './marinecomponent/createmarineinsurancedetails/createmarineinsurancedetails.component';
import { MarineinsurancelistComponent } from './marinecomponent/marineinsurancelist/marineinsurancelist.component';


const routes: Routes = [
  {path: '',pathMatch: 'full',redirectTo: '/home'},
  {path: 'home',component: HomeComponent},
  { path: "viewpolicy", component: PolicyComponent },
  { path: "createpolicy", component: CreatepolicyComponent },
  { path: "updatepolicy/:id", component: UpdatepolicyComponent },
  { path: "details/:id", component: PolicydetailsComponent },
  { path: "viewbill", component: BillComponent },
  { path: "createbill", component: CreatebillComponent },
  { path: "updatebill/:id", component: UpdatebillComponent},
  { path: "viewreciept", component: ReceiptComponent},
  { path: "createreciept", component: CreatereceiptComponent},
  { path: "printreciept/:id", component: PrintreceiptComponent},
  { path: "viewmoneyreciept", component: MoneyreceiptComponent},
  { path: "createmoneyreciept", component: CreatemoneyreceiptComponent},
  { path: "printmoneyreciept/:id", component: PrintmoneyreceiptComponent},
  { path: "viewmarinelist", component: MarineinsurancelistComponent},
  { path: "marinedetails/:id", component: MarineinsurancedetailsComponent },
  { path: 'createmarinelist', component: CreatemarineinsurancedetailsComponent },
  { path: 'updatemarinelist/:id', component: CreatemarineinsurancedetailsComponent },
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
