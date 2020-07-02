import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contrat } from "../contrat";
import { ContratService } from "../contrat.service";
import { Observable } from 'rxjs';
import { TypeContrat } from '../typecontrat';
import { ContratId } from '../contrat-id';
@Component({
  selector: 'app-lister-contrat',
  templateUrl: './lister-contrat.component.html',
  styleUrls: ['./lister-contrat.component.css']
})
export class ListerContratComponent implements OnInit {

  contrats: Observable<Contrat[]>;
  constructor(private contratservice: ContratService, private router: Router) { }


  ngOnInit(): void {

    this.reloadData();
  }

  reloadData() {
    this.contrats = this.contratservice.getContratList();
  }
  deleteContrat(id: ContratId) {
    this.contratservice.deleteContrat(id).subscribe(
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
