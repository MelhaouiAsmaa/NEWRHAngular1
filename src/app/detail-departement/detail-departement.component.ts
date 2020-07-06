import { ResponsableService } from './../responsable.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Departement } from "../departement";
import { DepartementService } from "../departement.service";

import { Observable } from 'rxjs';
import { ResponsableId } from '../responsable-id';
@Component({
  selector: 'app-detail-departement',
  templateUrl: './detail-departement.component.html',
  styleUrls: ['./detail-departement.component.css']
})
export class DetailDepartementComponent implements OnInit {
  id: number;
  departement: Departement;
  equipe: Observable<any[]>;
  responsable: Observable<any[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private responsableservice: ResponsableService,
    private departementservice: DepartementService) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.departement = new Departement();
    this.departementservice.getDepartement(this.id).subscribe(data => {
      console.log(data)
      this.departement = data;
    }, error => console.log(error));
    this.equipe = this.departementservice.getEquipeDepartement(this.id);
    this.responsable = this.departementservice.getResponsableDepartement(this.id);
  }

  createdepres(id) {
    this.router.navigate(['/creerresponsabledepartement', id]);
  }
  redirect() {
    this.router.navigate(['departement']);
  }
  update(id: number, id1: number, id3: Date) {
    console.log("la date est: " + id3);
    this.router.navigate(['modifierresponsabledepartement'], { queryParams: { id: id, id1: id1, id2: id3 } });

  }
  delete(respo: ResponsableId) {
    this.responsableservice.archive(respo).subscribe(
      data => {
        console.log(data);
        this.ngOnInit();
      },
      error => console.log(error));
  }
}
