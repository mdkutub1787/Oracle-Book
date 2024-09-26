import { Component, OnInit } from '@angular/core';
import { MarineDetailsModel } from '../../model/MarineDetailsModel';
import { MarinedetailsService } from '../../service/marinedetails.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marineinsurancelist',
  templateUrl: './marineinsurancelist.component.html',
  styleUrl: './marineinsurancelist.component.css'
})
export class MarineinsurancelistComponent implements OnInit{

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

  
  deleteMarineDetails(id: number) {
    this.marinedetailsService.deleteMarineList(id).subscribe({
      next: res => {
        console.log(res);
        this.loadMarineDetails()
        this.router.navigate(['/viewmarinelist']);
      },
      error: error => {
        console.log(error);
      }
    });
  }

 
  editMarineInsurance(id: number) {
    this.router.navigate(['updatemarinelist', id]);
  }

 
  
  detailsMarineInsurance(id: number) {
    this.router.navigate(['marinedetails', id]);
  }

   // Navigate to the create policy page
   navigateToAddMarineList() {
    this.router.navigateByUrl('/createmarinelist');
  }

  // Navigate to the create bill page
  navigateToAddMarineBill() {
    this.router.navigateByUrl('/createmarinebill');
  }
}
