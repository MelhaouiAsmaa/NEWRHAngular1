import { ChargeDepartement } from './../charge-departement';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChargedepartementService } from '../chargedepartement.service';

@Component({
  selector: 'app-lister-chargedepartementarchive',
  templateUrl: './lister-chargedepartementarchive.component.html',
  styleUrls: ['./lister-chargedepartementarchive.component.css']
})
export class ListerChargedepartementarchiveComponent implements OnInit {

  chargedepartement: ChargeDepartement[];
  constructor(private router: Router, private chargedepartementservice: ChargedepartementService) { }
  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    this.chargedepartementservice.getChargeDepartementListArchive().subscribe(
      data => {
        this.chargedepartement = data;
      }
    );
  }
  desarchiver(id: Object) {
    this.chargedepartementservice.desarchive(id).subscribe(
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
