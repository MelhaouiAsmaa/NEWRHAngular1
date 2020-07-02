import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pointage } from '../pointage';
import { Router } from '@angular/router';
import { PointageService } from '../pointage.service';

@Component({
  selector: 'app-lister-pointage',
  templateUrl: './lister-pointage.component.html',
  styleUrls: ['./lister-pointage.component.css']
})
export class ListerPointageComponent implements OnInit {

  pointage: any;

  constructor(private router: Router, private pointageservice: PointageService) { }

  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    this.pointageservice.getallpointage().subscribe(
      data => {
        this.pointage = data;
        for (let p of this.pointage) {
          console.log(data);
        }
      }
    );
  }
  deletePointage(id: number) {
    this.pointageservice.archivepointage(id).subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
  }
  PointageUpdate(id: number) {
    this.router.navigate(['/modifierPointage', id])
  }
}
