import 'zone.js';  // Included with Angular CLI.
import '@angular/localize/init'; 
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
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
import { NavbarComponent } from './guard/navbar/navbar.component';
import { CreatepolicyComponent } from './component/createpolicy/createpolicy.component';
import { UpdatepolicyComponent } from './component/updatepolicy/updatepolicy.component';
import { BillComponent } from './component/bill/bill.component';
import { CreatebillComponent } from './component/createbill/createbill.component';
import { UpdatebillComponent } from './component/updatebill/updatebill.component';
import { CreatereceiptComponent } from './component/createreceipt/createreceipt.component';
import { ReceiptComponent } from './component/receipt/receipt.component';
import { PrintreceiptComponent } from './component/printreceipt/printreceipt.component';
import { PolicydetailsComponent } from './component/policydetails/policydetails.component';
import { MoneyreceiptComponent } from './component/moneyreceipt/moneyreceipt.component';
import { CreatemoneyreceiptComponent } from './component/createmoneyreceipt/createmoneyreceipt.component';
import { PrintmoneyreceiptComponent } from './component/printmoneyreceipt/printmoneyreceipt.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PolicyComponent,
    RegistrationComponent,
    LoginComponent,
    UserprofileComponent,
    LogoutComponent,
    NavbarComponent,
    CreatepolicyComponent,
    UpdatepolicyComponent,
    BillComponent,
    CreatebillComponent,
    UpdatebillComponent,
    CreatereceiptComponent,
    ReceiptComponent,
    PrintreceiptComponent,
    PolicydetailsComponent,
    MoneyreceiptComponent,
    CreatemoneyreceiptComponent,
    PrintmoneyreceiptComponent
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
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
