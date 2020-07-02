import { Component, OnInit } from '@angular/core';
import {Charge} from "../charge";
import {ChargeService } from "../charge.service";
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-update-charge',
  templateUrl: './update-charge.component.html',
  styleUrls: ['./update-charge.component.css']
})
export class UpdateChargeComponent implements OnInit {
  id:number;
  charge: Charge=new Charge();
  submitted=false;
  constructor(private router:Router,private route:ActivatedRoute,private chargeservice:ChargeService) { }
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.chargeservice.getChargeById(this.id).subscribe(data => {
      console.log(data)
      this.charge= data;
    }, error => console.log(error));
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
