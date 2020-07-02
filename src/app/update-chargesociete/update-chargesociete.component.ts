import { Component, OnInit } from '@angular/core';
import {ChargeSociete} from '../ChargeSociete';
import {ChargesocieteService} from '../chargesociete.service';
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import {Charge} from '../charge';
import {Societe} from '../societe';
import { ChargeSocieteId } from '../ChargeSocieteId';
@Component({
  selector: 'app-update-chargesociete',
  templateUrl: './update-chargesociete.component.html',
  styleUrls: ['./update-chargesociete.component.css']
})
export class UpdateChargesocieteComponent implements OnInit {
  submitted=false;
  id:ChargeSocieteId;
  chargesociete:ChargeSociete;
  constructor(private route:ActivatedRoute,private router:Router,private chargesocieteservice:ChargesocieteService) { 
    this.chargesociete=new ChargeSociete();

    this.chargesociete.pkchargesociete=new ChargeSocieteId();
    this.chargesociete.pkchargesociete.societe=new Societe();
    this.chargesociete.pkchargesociete.charge=new Charge();
  }

  ngOnInit(): void {
    this.id=new ChargeSocieteId();
    this.id.charge=new Charge();
    this.id.societe=new Societe();
    this.route.queryParams.subscribe(params => {
      this.id.charge.idCharge = params['id'];
      this.id.societe.idsociete=params['id1'];
      this.id.datedebut=params['id2'];
    });
    this.chargesocieteservice.get(this.id).subscribe(data => {
      console.log(data)
      this.chargesociete=data;
    }, error => console.log(error));
  }
  update()
  {
    this.chargesocieteservice.modifier(this.chargesociete).subscribe(data => console.log(data), error => console.log(error));
    this.chargesociete=new ChargeSociete();
    this.gotoList();
  }
  onSubmit()
  {
    this.submitted=true;
    this.update();
  }
  gotoList()
  {
    this.router.navigate(['listerchargesociete']);
  }
}
