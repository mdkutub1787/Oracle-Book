import { Component, OnInit } from '@angular/core';
import { faHome, faUser, faSignInAlt, faSignOutAlt, faUserPlus, faSearch, faAppleAlt, faEye, faPlus, faShoppingCart, faChartLine } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faAppleAlt = faAppleAlt;
  faEye = faEye;
  faPlus = faPlus;
  faShoppingCart = faShoppingCart;
  faChartLine = faChartLine;

  constructor() {}

  ngOnInit(): void {
   
  }
}
