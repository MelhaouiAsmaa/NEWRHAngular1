import { Component, OnInit } from '@angular/core';
import {ChargeSociete} from '../ChargeSociete';
import {ChargesocieteService} from '../chargesociete.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {Charge} from '../charge';
import {ChargeService} from '../charge.service';
import {Societe} from '../societe';
import {SocieteService} from '../societe.service';
import { ChargeSocieteId } from '../ChargeSocieteId';
@Component({
  selector: 'app-create-chargesociete',
  templateUrl: './create-chargesociete.component.html',
  styleUrls: ['./create-chargesociete.component.css']
})
export class CreateChargesocieteComponent implements OnInit {
submitted=false;
charges:Observable<Charge[]>;
societes:Observable<Societe[]>;
chargesociete:ChargeSociete;

  constructor(private router:Router,private chargeservice:ChargeService,private societeservice:SocieteService,private chargesocieteservice:ChargesocieteService) {
    this.chargesociete=new ChargeSociete();
    this.chargesociete.pkchargesociete=new ChargeSocieteId();
    this.chargesociete.pkchargesociete.societe=new Societe();
    this.chargesociete.pkchargesociete.charge=new Charge();
   }

  ngOnInit(): void {
    this.charges=this.chargeservice.getCharges();
    this.societes=this.societeservice.getSocieteList();
  }
  newChargeSociete():void{
    this.submitted=false;
  }
  save()
{
  this.chargesocieteservice.createChargeSociete(this.chargesociete).subscribe(data => console.log(data), error => console.log(error));
}

onSubmit()
{
  this.submitted=true;
  this.save();
  
}
gotoList(){
  this.router.navigate(['listersociete']);
}
}
