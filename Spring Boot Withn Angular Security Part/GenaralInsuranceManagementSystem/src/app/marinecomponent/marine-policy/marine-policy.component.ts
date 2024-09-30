import { Component, OnInit } from '@angular/core';
import { MarineDetailsModel } from '../../model/MarineDetailsModel';
import { MarinedetailsService } from '../../service/marinedetails.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marine-policy',
  templateUrl: './marine-policy.component.html',
  styleUrls: ['./marine-policy.component.css']
})
export class MarinePolicyComponent implements OnInit {

  marinedetails!: MarineDetailsModel[]; 
  searchmarinedetails!: MarineDetailsModel[]; 
  searchTerm: string = '';            
  sortBy: 'policyholder' | 'id' | 'bankName' = 'policyholder'; 

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
      this.searchmarinedetails = [...data];  // Initialize search list with all marine details
    });
  }

  // Method to delete marine insurance details and update UI efficiently
  deleteMarineDetails(id: number) {
    this.marinedetailsService.deleteMarineList(id).subscribe({
      next: res => {
        console.log('Marine detail deleted successfully', res);
        // Remove the deleted item from the list to avoid reloading all data
        this.marinedetails = this.marinedetails.filter(detail => detail.id !== id);
        this.searchMarinePolicy(); // Update search results after deletion
      },
      error: error => {
        console.error('Error deleting marine detail', error);
      }
    });
  }

  // Method to edit marine insurance details
  editMarinePolicy(id: number) {
    this.router.navigate(['updatemarinelist', id]);
  }

  // Method to view marine insurance details
  detailsMarineInsurance(id: number) {
    this.router.navigate(['marinedetails', id]);
  }

  // Navigate to the create marine list page
  navigateToAddMarinePolicy() {
    this.router.navigateByUrl('/createmarinelist');
  }

  // Navigate to the create marine bill page
  navigateToAddMarineBill() {
    this.router.navigateByUrl('/createmarinebill');
  }

  // Filter policies based on search term
  searchMarinePolicy() {
    const lowerCaseSearchTerm = this.searchTerm.trim().toLowerCase(); 

    this.searchmarinedetails = this.marinedetails.filter(item =>
      item.policyholder?.toLowerCase().includes(lowerCaseSearchTerm) || 
      item.bankName?.toLowerCase().includes(lowerCaseSearchTerm) ||      
      item.id?.toString().includes(lowerCaseSearchTerm)
    );
  }
}
