import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeContrat } from '../typecontrat';
import { TypecontratService } from '../typecontrat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-archive-type-contrat',
  templateUrl: './liste-archive-type-contrat.component.html',
  styleUrls: ['./liste-archive-type-contrat.component.css']
})
export class ListeArchiveTypeContratComponent implements OnInit {

  typecontrats: Observable<TypeContrat[]>;
  constructor(private typecontratservice: TypecontratService, private router: Router) { }


  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.typecontrats = this.typecontratservice.getTypeContratListArchive();
  }
  detailsTypeContrat(id: number) {
    this.router.navigate(['detailtypecontrat', id]);
  }
  TypeContratUpdate(id: number) {
    this.router.navigate(['modifierTypeContrat', id]);
  }
  dearchiveTypeContrat(id: number) {
    this.typecontratservice.desarchive(id).subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
  }
}
