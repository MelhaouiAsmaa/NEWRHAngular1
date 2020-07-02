import { ChargeDepartement } from './../charge-departement';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement } from '../departement';
import { Router } from '@angular/router';
import { DepartementService } from '../departement.service';
import { ChargeService } from '../charge.service';
import { ChargedepartementId } from '../chargedepartement-id';
import { ChargedepartementService } from '../chargedepartement.service';
import { Charge } from '../charge';

@Component({
  selector: 'app-create-charge-departement',
  templateUrl: './create-charge-departement.component.html',
  styleUrls: ['./create-charge-departement.component.css']
})
export class CreateChargeDepartementComponent implements OnInit {

  submitted = false;
  departements: Departement[];
  charges: any;
  chargedepartement: ChargeDepartement;
  constructor(private router: Router,
    private departementservice: DepartementService,
    private chargeservice: ChargeService,
    private chargedepartementservice: ChargedepartementService) {
    this.chargedepartement = new ChargeDepartement();
    this.chargedepartement.pk_chargedep = new ChargedepartementId();
    this.chargedepartement.pk_chargedep.departement = new Departement();
    this.chargedepartement.pk_chargedep.charge = new Charge();
  }

  ngOnInit(): void {
    this.chargeservice.getAllcharges().subscribe(
      data1 => {
        this.charges = data1;
      }
    );
    console.log(this.charges);
    this.departementservice.getDepartementsList().subscribe(
      data2 => {
        this.departements = data2;
      }
    );

  }
  newChargeDepartement(): void {
    this.submitted = false;
  }
  save() {
    if (this.chargedepartement.date_Fin < this.chargedepartement.pk_chargedep.date_Debut)
      window.alert("Attention Date Fin est Supérieur à La Date Début!!");
    else
      this.chargedepartementservice.createChargeDepartement(this.chargedepartement).subscribe(data => console.log(data), error => console.log(error));
  }
  onSubmit() {
    this.submitted = true;
    this.save();

  }
  gotoList() {
    this.router.navigate(['listertypecontart']);
  }

}
