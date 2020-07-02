import { Component, OnInit } from '@angular/core';
import {Charge} from "../charge";
import {ChargeService } from "../charge.service";
import {Router} from '@angular/router';
@Component({
  selector: 'app-create-charge',
  templateUrl: './create-charge.component.html',
  styleUrls: ['./create-charge.component.css']
})
export class CreateChargeComponent implements OnInit {

  charge: Charge=new Charge();
  submitted=false;
  constructor(private router:Router,private chargeservice:ChargeService) { }

  ngOnInit(): void {
  }
newCharge():void{
  this.submitted=false;
  this.charge=new Charge();
}

save()
{
  this.chargeservice.createCharge(this.charge).subscribe(data => console.log(data), error => console.log(error));
  this.charge=new Charge();
  this.gotoList();
}
onSubmit()
{
  this.submitted=true;
  this.save();
}

gotoList()
{
  this.router.navigate(['/listerDepartement']);
}
}
