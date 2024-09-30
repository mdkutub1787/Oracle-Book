import 'zone.js';  // Included with Angular CLI.
import '@angular/localize/init'; 
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintModule } from 'ngx-print';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { TokenInterceptor } from './guard/TokenInterceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { UpdateMarineBillComponent } from './marinecomponent/update-marine-bill/update-marine-bill.component';
import { PrintMarinemoneyReceiptComponent } from './marinecomponent/print-marinemoney-receipt/print-marinemoney-receipt.component';
import { BillDetailsComponent } from './component/bill-details/bill-details.component';
import { UpdateMarineMoneyReceiptComponent } from './marinecomponent/update-marine-money-receipt/update-marine-money-receipt.component';
import { UpdateMoneyReceiptComponent } from './component/update-money-receipt/update-money-receipt.component';
import { CreateMarinePolicyComponent } from './marinecomponent/create-marine-policy/create-marine-policy.component';
import { CreateMarineBillComponent } from './marinecomponent/create-marine-bill/create-marine-bill.component';
import { MarineBillComponent } from './marinecomponent/marine-bill/marine-bill.component';
import { MarinePolicyComponent } from './marinecomponent/marine-policy/marine-policy.component';
import { MarinePolicyDetailsComponent } from './marinecomponent/marine-policy-details/marine-policy-details.component';
import { MarineBillDetailsComponent } from './marinecomponent/marine-bill-details/marine-bill-details.component';
import { MarineMaoneyReceiptComponent } from './marinecomponent/marine-maoney-receipt/marine-maoney-receipt.component';
import { CreateMarineMaoneyReceiptComponent } from './marinecomponent/create-marine-maoney-receipt/create-marine-maoney-receipt.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PolicyComponent,
    RegistrationComponent,
    LoginComponent,
    UserprofileComponent,
    LogoutComponent,
    CreatepolicyComponent,
    UpdatepolicyComponent,
    BillComponent,
    CreatebillComponent,
    UpdatebillComponent,
    PolicydetailsComponent,
    MoneyreceiptComponent,
    CreatemoneyreceiptComponent,
    PrintmoneyreceiptComponent,
    NavbarComponent,
    MarinePolicyComponent,
    UpdateMarineBillComponent,
    PrintMarinemoneyReceiptComponent,
    BillDetailsComponent,
    UpdateMarineMoneyReceiptComponent,
    UpdateMoneyReceiptComponent,
    CreateMarinePolicyComponent,
    CreateMarineBillComponent,
    MarineBillComponent,
    MarinePolicyDetailsComponent,
    MarineBillDetailsComponent,
    MarineMaoneyReceiptComponent,
    CreateMarineMaoneyReceiptComponent,
   
   


    
    
 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FontAwesomeModule,
    NgbModule,
    NgxPrintModule,
    AppRoutingModule,
    
  ],
  providers: [
    // provideClientHydration(),
    // provideAnimationsAsync(),
    provideHttpClient(
      withFetch()
    ),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
