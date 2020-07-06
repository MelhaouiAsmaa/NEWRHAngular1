import { ResponsableId } from './../responsable-id';
import { Component, OnInit } from '@angular/core';
import { Departement } from '../departement';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DepartementService } from '../departement.service';
import { ResponsableService } from '../responsable.service';
import { EmployeeService } from '../employee.service';
import { Observable } from 'rxjs';
import { Employee } from '../employee';
import { Responsable } from '../responsable';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-create-responsable',
  templateUrl: './create-responsable.component.html',
  styleUrls: ['./create-responsable.component.css']
})
export class CreateResponsableComponent implements OnInit {


  departement: Departement;
  idDep;
  employees: Observable<Employee[]>;
  submitted = false;
  responsable: Responsable;
  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private departemetservice: DepartementService,
    private responsableservice: ResponsableService,
    private employeeservice: EmployeeService) {
    this.responsable = new Responsable();
    this.responsable.pkResponsable = new ResponsableId();
    this.responsable.pkResponsable.employee = new Employee();
    this.responsable.pkResponsable.departement = new Departement();
  }
  ngOnInit() {

    //this.departements = this.departemetservice.getDepartementsList();
    this.activatedroute.params.subscribe((param: Params) => {
      this.idDep = param['id'];
    });
    this.departemetservice.getDepartement(this.idDep).subscribe(
      data1 => {
        console.log(data1);
        this.departement = data1;
        this.employees = this.departemetservice.getEmployeesByDep(this.departement.idDepartement);
        console.log(this.employees);
      }
    )

  }
  save() {
    if (this.responsable.dateFinRes == null)
      this.responsable.dateFinRes = new Date("2100-01-01");

    if (this.responsable.dateFinRes < this.responsable.pkResponsable.dateDebutRes) {
      window.alert("la date de Fin doit etre plus grande \n que la date de début ! ");
      console.log("hananaaae");
    }
    else {
      this.responsable.pkResponsable.departement = this.departement;
      this.responsableservice.createresponsable(this.responsable).subscribe(
        data =>
          console.log(data),
        error => console.log(error)
      );

      this.gotoList(this.departement.idDepartement);
    }
  }
  gotoList(id) {
    this.router.navigate(['/detailDepartement', id]);
  }
  onSubmit() {
    this.submitted = true;
    this.save();

  }
}
