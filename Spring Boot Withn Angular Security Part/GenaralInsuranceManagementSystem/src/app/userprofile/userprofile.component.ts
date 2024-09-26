import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserprofileService } from '../service/userprofile.service';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserModel } from '../model/user.model';
import { Subscription } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent  {


 
}
