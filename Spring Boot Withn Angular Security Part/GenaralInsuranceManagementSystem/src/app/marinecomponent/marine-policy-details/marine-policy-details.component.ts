import { Component, OnInit } from '@angular/core';
import { MarineDetailsModel } from '../../model/MarineDetailsModel';
import { MarinedetailsService } from '../../service/marinedetails.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-marine-policy-details',
  templateUrl: './marine-policy-details.component.html',
  styleUrl: './marine-policy-details.component.css'
})
export class MarinePolicyDetailsComponent implements OnInit{


  id!: number;
  marineDeatails!: MarineDetailsModel;

  constructor(
    private marinedetailsService: MarinedetailsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.marineDeatails = new MarineDetailsModel();
    this.id = this.route.snapshot.params['id'];
    this.marinedetailsService.getByMarineDetailsId(this.id).subscribe({
      next: (data) => {
        console.log('Marine details data retrieved:', data);
        this.marineDeatails = data;
      },
      error: (err) => {
        console.error('Error fetching Marine details data:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['viewmarinelist']);
  }
}
