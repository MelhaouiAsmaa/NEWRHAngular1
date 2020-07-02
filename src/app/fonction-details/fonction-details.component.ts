import { Router, ActivatedRoute, Params } from '@angular/router';
import { FonctionService } from './../fonction.service';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-fonction-details',
  templateUrl: './fonction-details.component.html',
  styleUrls: ['./fonction-details.component.css']
})
export class FonctionDetailsComponent implements OnInit {

  fonction: any;
  idFct;
  employeesId: any;
  employees: any[] = [];
  constructor(private empService: EmployeeService,
              private fctService: FonctionService,
              private activatedroute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.activatedroute.params.subscribe((param: Params) => {
      this.idFct = param['id'];
      this.fctService.getFunctionById(this.idFct).subscribe(
        data => {
        this.fonction = data;
        });
  });

    this.fctService.getEmployeesByFunction(this.idFct).subscribe(
      data => {
        this.employeesId = data;
        console.log(this.employeesId);
        if (this.employeesId != null) {
           // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.employeesId.length ; i++) {
            this.empService.getEmployee(this.employeesId[i]).subscribe(
              data2 => {
                console.log(data2);
                this.employees.push(data2);
              });
          }
        }
      });
}





}