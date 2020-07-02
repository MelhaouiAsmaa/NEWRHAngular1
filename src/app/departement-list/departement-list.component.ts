import { Router } from '@angular/router';
import { DepartementService } from './../departement.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Departement } from '../departement';

@Component({
  selector: 'app-departement-list',
  templateUrl: './departement-list.component.html',
  styleUrls: ['./departement-list.component.css']
})
export class DepartementListComponent implements OnInit {

  deps: Observable<Departement[]>;
  constructor(private depService: DepartementService,
    private router: Router) { }

  ngOnInit() {
    this.depService.getDepartementsList().subscribe(
      data => {
        this.deps = data;
      }
    );
  }

  deleteDepartement(id) {
    this.depService.deleteDepartement(id).subscribe();
    this.ngOnInit();
  }

  departementUpdate(id) {
    this.router.navigate(['/updateDepartement', id]);
  }

  departementDetails(id) {
    this.router.navigate(['detailDepartement', id]);
  }
}
