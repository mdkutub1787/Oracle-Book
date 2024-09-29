import { Component, OnInit } from '@angular/core';
import { MarineDetailsModel } from '../../model/MarineDetailsModel';
import { MarinedetailsService } from '../../service/marinedetails.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marineinsurancelist',
  templateUrl: './marineinsurancelist.component.html',
  styleUrls: ['./marineinsurancelist.component.css'] // Corrected the 'styleUrl' to 'styleUrls'
})
export class MarineinsurancelistComponent implements OnInit {

  marinedetails!: MarineDetailsModel[]; 

  constructor(
    private marinedetailsService: MarinedetailsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadMarineDetails(); 
  }

  loadMarineDetails() {
    this.marinedetailsService.getMarinedetails().subscribe((data: MarineDetailsModel[]) => {
      this.marinedetails = data;
      this.marinedetails = [...this.marinedetails]; 
    });
  }

// Method to delete marine insurance details and navigate quickly after deletion
deleteMarineDetails(id: number) {
  this.marinedetailsService.deleteMarineList(id).subscribe({
    next: res => {
      console.log('Marine detail deleted successfully', res);
      this.router.navigate(['/viewmarinelist']); // Navigate immediately after deletion
      this.loadMarineDetails(); // Load the remaining marine details
    },
    error: error => {
      console.error('Error deleting marine detail', error);
    }
  });
}



  // Method to edit marine insurance details
  editMarineInsurance(id: number) {
    this.router.navigate(['updatemarinelist', id]);
  }

  // Method to view marine insurance details
  detailsMarineInsurance(id: number) {
    this.router.navigate(['marinedetails', id]);
  }

  // Navigate to the create marine list page
  navigateToAddMarineList() {
    this.router.navigateByUrl('/createmarinelist');
  }

  // Navigate to the create marine bill page
  navigateToAddMarineBill() {
    this.router.navigateByUrl('/createmarinebill');
  }
}
