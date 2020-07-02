import { Component, OnInit } from '@angular/core';
import { ChargedepartementService } from '../chargedepartement.service'
import { Router } from '@angular/router';
import { Observable, ObjectUnsubscribedError } from "rxjs";
import { ChargeDepartement } from '../charge-departement';
@Component({
  selector: 'app-lister-chargedepartement',
  templateUrl: './lister-chargedepartement.component.html',
  styleUrls: ['./lister-chargedepartement.component.css']
})
export class ListerChargedepartementComponent implements OnInit {

  chargedepartement;
  constructor(private router: Router, private chargedepartementservice: ChargedepartementService) { }

  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    this.chargedepartementservice.getChargeDepartementList().subscribe(data => {
      this.chargedepartement = data;
    });
  }
  archiver(id: Object) {
    this.chargedepartementservice.archive(id).subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
  }
  ChargeDepartementUpdate(id1: number, id2: number, id3: Date) {
    this.router.navigate(['updatechargedepartement'], { queryParams: { id: id1, id1: id2, id2: id3 } });
  }


}
