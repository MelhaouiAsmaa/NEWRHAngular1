import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pointage } from '../pointage';
import { Router } from '@angular/router';
import { PointageService } from '../pointage.service';

@Component({
  selector: 'app-lister-pointage-archive',
  templateUrl: './lister-pointage-archive.component.html',
  styleUrls: ['./lister-pointage-archive.component.css']
})
export class ListerPointageArchiveComponent implements OnInit {

  pointage: Observable<Pointage[]>;

  constructor(private router: Router, private pointageservice: PointageService) { }

  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    this.pointageservice.getallpointagearchive().subscribe(
      data => {
        this.pointage = data;
      }
    );
  }
  desarchivePointage(id: number) {
    this.pointageservice.desarchiver(id).subscribe(
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
