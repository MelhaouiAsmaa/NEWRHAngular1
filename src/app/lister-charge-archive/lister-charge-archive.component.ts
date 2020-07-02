import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import {Charge} from '../charge';
import {ChargeService} from '../charge.service'

@Component({
  selector: 'app-lister-charge-archive',
  templateUrl: './lister-charge-archive.component.html',
  styleUrls: ['./lister-charge-archive.component.css']
})
export class ListerChargeArchiveComponent implements OnInit {

  charges:Observable<Charge[]>;

  constructor(private chargeservice:ChargeService,private router:Router) { }

  ngOnInit(): void {
    this.reloadData();
  }
reloadData(){
  this.charges=this.chargeservice.getChargesArchive();
}
desarchiveCharge(id:number)
 {
   this.chargeservice.desarchive(id).subscribe(
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
