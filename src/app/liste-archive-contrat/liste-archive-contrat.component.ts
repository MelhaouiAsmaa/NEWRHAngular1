import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contrat } from '../contrat';
import { ContratService } from '../contrat.service';
import { Router } from '@angular/router';
import { ContratId } from '../contrat-id';

@Component({
  selector: 'app-liste-archive-contrat',
  templateUrl: './liste-archive-contrat.component.html',
  styleUrls: ['./liste-archive-contrat.component.css']
})
export class ListeArchiveContratComponent implements OnInit {

  contrats: Observable<Contrat[]>;
  constructor(private contratservice: ContratService, private router: Router) { }


  ngOnInit(): void {

    this.reloadData();
  }

  reloadData() {
    this.contrats = this.contratservice.getContratArchiveList();
  }
  deleteContrat(id: ContratId) {
    this.contratservice.deleteContrat(id).subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
  }
  EssaiTypeContrat(id: ContratId) {
    this.contratservice.essai(id).subscribe(data => {
      console.log(data);
      this.reloadData();
    },
      error => console.log(error));

  }
  desarchiverContrat(id: ContratId) {
    this.contratservice.desarchive(id).subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
  }
  DetailTypeContrat(id1: number, id2: number, id3: Date) {
    this.router.navigate(['detailcontratEmployee'], { queryParams: { id: id1, id1: id2, id2: id3 } });

  }
  ContratUpdate(id1: number, id2: number, id3: Date) {
    this.router.navigate(['modifierContrat'], { queryParams: { id: id1, id1: id2, id2: id3 } });
  }

}
