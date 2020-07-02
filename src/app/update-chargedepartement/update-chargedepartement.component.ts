import { ChargedepartementId } from './../chargedepartement-id';
import { Component, OnInit } from '@angular/core';
import { ChargeDepartement } from '../charge-departement';
import { ActivatedRoute, Router } from '@angular/router';
import { ChargedepartementService } from '../chargedepartement.service';
import { Charge } from '../charge';
import { Departement } from '../departement';

@Component({
  selector: 'app-update-chargedepartement',
  templateUrl: './update-chargedepartement.component.html',
  styleUrls: ['./update-chargedepartement.component.css']
})
export class UpdateChargedepartementComponent implements OnInit {

  c: ChargeDepartement;
  id: ChargedepartementId;
  submitted = false;
  constructor(private route: ActivatedRoute, private router: Router, private chargedepartementservice: ChargedepartementService) {
    this.c = new ChargeDepartement();
    this.c.pk_chargedep = new ChargedepartementId();
    this.c.pk_chargedep.charge = new Charge();
    this.c.pk_chargedep.departement = new Departement();

  }

  ngOnInit(): void {
    this.id = new ChargedepartementId();
    this.id.charge = new Charge();
    this.id.departement = new Departement();

    this.route.queryParams.subscribe(params => {
      this.id.charge.idCharge = params['id'];
      this.id.departement.idDepartement = params['id1'];
      this.id.date_Debut = params['id2'];

    });

    this.chargedepartementservice.getChargeDepartement(this.id).subscribe(data => {
      console.log(data)
      this.c = data;
    }, error => console.log(error));
  }
  update() {
    if (this.c.date_Fin < this.c.pk_chargedep.date_Debut)
      window.alert("attention date fin est plus GRANDE que Date de Début");
    else {
      this.chargedepartementservice.createChargeDepartement(this.c).subscribe(data => console.log(data), error => console.log(error));
      this.gotoList();
    }
  }
  onSubmit() {
    this.submitted = true;
    this.update();
  }
  gotoList() {
    this.router.navigate['listerContrat'];
  }

}
