import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { TypeContrat } from '../typecontrat';
import { TypecontratService } from '../typecontrat.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-liste-typecontrat',
  templateUrl: './liste-typecontrat.component.html',
  styleUrls: ['./liste-typecontrat.component.css']
})
export class ListeTypecontratComponent implements OnInit {

  typecontrats: Observable<TypeContrat[]>;
  constructor(private typecontratservice: TypecontratService, private router: Router) { }


  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.typecontrats = this.typecontratservice.getTypeContratList();
  }

  deleteTypeContrat(id: number) {
    this.typecontratservice.deleteTypeContrat(id).subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
  }
  detailsTypeContrat(id: number) {
    this.router.navigate(['detailtypecontrat', id]);
  }
  TypeContratUpdate(id: number) {
    this.router.navigate(['modifierTypeContrat', id]);
  }
}
