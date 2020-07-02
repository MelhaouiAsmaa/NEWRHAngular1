import { FonctionService } from './../fonction.service';
import { EmployeeService } from './../employee.service';
import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { EquipeService } from '../equipe.service';

@Component({
  selector: 'app-equipe-details',
  templateUrl: './equipe-details.component.html',
  styleUrls: ['./equipe-details.component.css']
})
export class EquipeDetailsComponent implements OnInit {

  myArray: any;
  equipe: any;
  employeesId: any;
  empObj;
  idEqp;
  constructor(private activatedroute: ActivatedRoute,
              private eqService: EquipeService,
              private fctService: FonctionService,
              private empService: EmployeeService) { }

  ngOnInit() {
    this.activatedroute.params.subscribe((param: Params) => {
      this.idEqp = param['id'];
      console.log(this.idEqp);
      this.eqService.getEquipeById(this.idEqp).subscribe(
        data => {
          this.equipe = data;
        });
    });

    this.eqService.getEmployeesEquipe(this.idEqp).subscribe(
      data => {
        this.myArray = data;
        console.log(data);
        for (let arr of this.myArray) {
          // console.log(arr.id);
          this.empService.getEmployee(arr.id).subscribe(
            data2 => {
              console.log(arr);
              console.log(data2);
              arr.nom = data2.nom;
              arr.prenom = data2.prenom;
              console.log('idfct: ' + arr.fonction);
              this.fctService.getFunctionById(arr.fonction).subscribe(
                 data3 => {
                   arr.libelleFct = data3.libelleFct;
                   console.log('nomfct: ' + data3.libelleFct);
                   console.log(arr);
                 });
            });
        }
      });
  }

}
