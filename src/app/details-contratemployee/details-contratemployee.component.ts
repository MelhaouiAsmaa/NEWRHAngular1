import { Component, OnInit } from '@angular/core';
import { ContratId } from '../contrat-id';
import { Contrat } from '../contrat';
import { Router, ActivatedRoute } from '@angular/router';
import { ContratService } from '../contrat.service';
import { TypeContrat } from '../typecontrat';
import { Employee } from '../employee';

@Component({
  selector: 'app-details-contratemployee',
  templateUrl: './details-contratemployee.component.html',
  styleUrls: ['./details-contratemployee.component.css']
})
export class DetailsContratemployeeComponent implements OnInit {

  id: ContratId = new ContratId();
  contrat1: Contrat;
  constructor(private route: Router,
    private router: ActivatedRoute,
    private contratemployeeservice: ContratService) {
this.contrat1=new Contrat();
    this.contrat1.pkContrat = new ContratId();
    this.contrat1.pkContrat.contrat = new TypeContrat();
    this.contrat1.pkContrat.employee = new Employee();
    this.id.contrat = new TypeContrat();
    this.id.employee = new Employee();

  }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.id.contrat.id_typeC = params['id'];
      this.id.employee.matricule = params['id1'];
      this.id.date_Contrat = params['id2'];
    });
    this.contratemployeeservice.getContrat(this.id).subscribe(data => {
      console.log(data)
      this.contrat1 = data;
    }, error => console.log(error));
  }
  redirect() {
    this.route.navigate(['listerContrat']);
  }

}
