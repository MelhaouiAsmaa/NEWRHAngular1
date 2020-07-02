import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChargeService } from '../charge.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-charge',
  templateUrl: './liste-charge.component.html',
  styleUrls: ['./liste-charge.component.css']
})
export class ListeChargeComponent implements OnInit {

  charges: any;

  constructor(private chargeservice: ChargeService, private router: Router) { }

  ngOnInit() {
    this.chargeservice.getAllcharges().subscribe(
      data => {
        this.charges = data;
        console.log(this.charges);
      }
    );
  }
  reloadData(){
    this.chargeservice.getAllcharges().subscribe(
      data => {
        this.charges = data;
        console.log(this.charges);
      }
    );
  }
  deleteCharge(id:number)
    {
    this.chargeservice.archive(id).subscribe(
    data => {
     console.log(data);
        this.reloadData();
      },
     error => console.log(error));
  }
   chargeDetails(id:number)
  {
     this.router.navigate(['detailsCharge',id]);
   }
   updatecharge(id:number){
     this.router.navigate(['updatecharge',id]);
   }
}
