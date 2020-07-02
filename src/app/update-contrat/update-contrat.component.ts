import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from "../employee";
import { TypeContrat } from "../typecontrat";
import { ContratId } from '../contrat-id';
import { Contrat } from '../contrat';
import { ContratService } from '../contrat.service';


@Component({
  selector: 'app-update-contrat',
  templateUrl: './update-contrat.component.html',
  styleUrls: ['./update-contrat.component.css']
})
export class UpdateContratComponent implements OnInit {

  id1: ContratId = new ContratId();
  contrat1: Contrat;
  submitted = false;
  constructor(private route: ActivatedRoute, private router: Router, private contratservice: ContratService) {
    this.contrat1 = new Contrat();

    this.contrat1.pkContrat = new ContratId();
    this.contrat1.pkContrat.contrat = new TypeContrat();
    this.contrat1.pkContrat.employee = new Employee();
    this.id1.contrat=new TypeContrat();
    this.id1.employee=new Employee();

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id1.contrat.id_typeC = params['id'];
      this.id1.employee.matricule = params['id1'];
      this.id1.date_Contrat = params['id2'];
    });
    
    this.contratservice.getContrat(this.id1).subscribe(data => {
      console.log(data)
      this.contrat1 = data;
    }, error => console.log(error));
  }
  updateContratEmployee() {
    
    if (this.contrat1.pkContrat.date_Contrat > this.contrat1.date_Debut
      || this.contrat1.date_Debut > this.contrat1.date_Fin) {

      window.alert("la Date du Contrat doit etre inférieur ou égale à la date du début!!" + "la date du début doit etre inférieur ou égale à la date fin");

    }
    else {

      this.contratservice.updateContratEmployee(this.contrat1).subscribe(
        data =>
          console.log(data), error => console.log(error));
      this.contrat1 = new Contrat();
      this.gotoList();
    }
  }
  onSubmit() {
    this.submitted = true;
    this.updateContratEmployee();
  }
  gotoList() {
    this.router.navigate['listerContrat'];
  }
}
