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
import { UpdatepolicyComponent } from './component/updatepolicy/updatepolicy.component';
import { UpdatebillComponent } from './component/updatebill/updatebill.component';
import { BillComponent } from './component/bill/bill.component';
import { CreatepolicyComponent } from './component/createpolicy/createpolicy.component';
import { CreatebillComponent } from './component/createbill/createbill.component';
import { CreaterecieptComponent } from './component/createreciept/createreciept.component';
import { RecieptComponent } from './component/reciept/reciept.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { LogoutComponent } from './logout/logout.component';
import { SearchComponent } from './component/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PolicyComponent,
    UpdatepolicyComponent,
    UpdatebillComponent,
    BillComponent,
    CreatepolicyComponent,
    CreatebillComponent,
    CreaterecieptComponent,
    RecieptComponent,
    RegistrationComponent,
    LoginComponent,
    UserprofileComponent,
    LogoutComponent,
    SearchComponent,
    
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
