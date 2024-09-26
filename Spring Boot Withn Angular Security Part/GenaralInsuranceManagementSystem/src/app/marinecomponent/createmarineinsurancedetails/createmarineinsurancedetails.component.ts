import { Component, OnInit } from '@angular/core';
import { MarineDetailsModel } from '../../model/MarineDetailsModel';
import { MarinedetailsService } from '../../service/marinedetails.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-createmarineinsurancedetails',
  templateUrl: './createmarineinsurancedetails.component.html',
  styleUrl: './createmarineinsurancedetails.component.css'
})

export class CreatemarineinsurancedetailsComponent implements OnInit {

  marineinsurancedetails: MarineDetailsModel = new MarineDetailsModel();
  errorMessage: string = '';
  isEditMode: boolean = false;
  exchangeRate: number = 1;

  constructor(
    private marinedetailsService: MarinedetailsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.getDetails(params['id']);
      } else {
        this.initializeForm();
      }
    });

  
    this.marinedetailsService.getExchangeRate().subscribe({
      next: (data) => {
        this.exchangeRate = data.rates.BDT || 1; 
        console.log('Exchange rate fetched:', this.exchangeRate);
      },
      error: (err) => {
        console.error('Error fetching exchange rate:', err);
        this.errorMessage = 'Could not fetch exchange rate. Defaulting to 1.';
        this.exchangeRate = 1; 
      }
    });
  }

  initializeForm() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    this.marineinsurancedetails.date = formattedDate;
    this.marineinsurancedetails.coverage = 'Lorry Risk Only'; 
  }

  getDetails(id: number) {
    this.marinedetailsService.getByMarineDetailsId(id).subscribe({
      next: (data) => {
        console.log('Marine details data retrieved:', data);
        this.marineinsurancedetails = data;
      },
      error: (err) => {
        console.error('Error fetching marine details data:', err);
        this.errorMessage = 'Could not fetch marine details. Please try again.';
      }
    });
  }

  createOrUpdateMarineList() {
    if (this.exchangeRate !== 1) {
      this.marineinsurancedetails.sumInsured *= this.exchangeRate;
    }

    if (this.isEditMode) {
      // Update existing record
      this.marinedetailsService.updateMarineList(
        this.marineinsurancedetails.id,
         this.marineinsurancedetails)
         .subscribe({
        next: (data) => {
          console.log('Marine insurance updated successfully', data);
          this.router.navigate(['/viewmarinelist']);
        },
        error: (err) => {
          console.error('Error occurred while updating marine details', err);
          this.errorMessage = 'There was an error updating the marine details. Please try again.';
        }
      });
    } else {
      // Create new record
      this.marinedetailsService.createMarinedetails(this.marineinsurancedetails).subscribe({
        next: (data) => {
          console.log('Marine insurance created successfully', data);
          this.router.navigate(['/viewmarinelist']);
        },
        error: (err) => {
          console.error('Error occurred while creating marine details', err);
          this.errorMessage = 'There was an error creating the marine details. Please try again.';
        }
      });
    }
  }
}   