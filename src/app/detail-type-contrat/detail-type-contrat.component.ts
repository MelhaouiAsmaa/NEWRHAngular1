import { Component, OnInit } from '@angular/core';
import { TypeContrat } from '../typecontrat';
import { Observable } from 'rxjs';
import { Contrat } from '../contrat';
import { Router, ActivatedRoute } from '@angular/router';
import { TypecontratService } from '../typecontrat.service';

@Component({
  selector: 'app-detail-type-contrat',
  templateUrl: './detail-type-contrat.component.html',
  styleUrls: ['./detail-type-contrat.component.css']
})
export class DetailTypeContratComponent implements OnInit {

  id: number;
  typecontrat: any;
  contrat1: Observable<Contrat[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contratservice: TypecontratService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.typecontrat = new TypeContrat();
    this.contratservice.getTypeContrat(this.id).subscribe(date => {
      console.log(date)
      this.typecontrat = date;
    }, error => console.log(error));
    this.contrat1 = this.contratservice.getdetail(this.id);


  }
  redirect() {
    this.router.navigate(['listertypeContrat']);
  }
}
