import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement } from '../departement';
import { DepartementService } from '../departement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lister-departement-archive',
  templateUrl: './lister-departement-archive.component.html',
  styleUrls: ['./lister-departement-archive.component.css']
})
export class ListerDepartementArchiveComponent implements OnInit {

  departements: Observable<Departement[]>;

  constructor(private departementService: DepartementService, private router: Router) { }
  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.departementService.getDepartementsArchiveList().subscribe(
      data => {
        this.departements = data;
      }
    );
  }
  departementDetails(id: number) {
    this.router.navigate(['detailDepartement', id]);
  }

  departementUpdate(id: number) {
    this.router.navigate(['modifierDepartement', id]);
  }
  departementDesarchiver(id: number) {
    this.departementService.desarchive(id).subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
  }

}
