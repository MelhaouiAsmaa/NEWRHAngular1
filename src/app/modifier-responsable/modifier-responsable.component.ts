import { Component, OnInit } from '@angular/core';
import { ResponsableId } from '../responsable-id';
import { Responsable } from '../responsable';
import { Employee } from '../employee';
import { Departement } from '../departement';
import { EmployeeService } from '../employee.service';
import { DepartementService } from '../departement.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponsableService } from '../responsable.service';

@Component({
  selector: 'app-modifier-responsable',
  templateUrl: './modifier-responsable.component.html',
  styleUrls: ['./modifier-responsable.component.css']
})
export class ModifierResponsableComponent implements OnInit {

  id: ResponsableId = new ResponsableId();
  submitted = false;
  responsable: Responsable;
  nom: Employee = new Employee();
  dept: Departement = new Departement();
  constructor(
    private employeeservice: EmployeeService,
    private departementservice: DepartementService,
    private router: Router,
    private route: ActivatedRoute,
    private responsableservice: ResponsableService) {
    this.responsable = new Responsable();
    this.responsable.pkResponsable = new ResponsableId();
    this.responsable.pkResponsable.employee = new Employee();
    this.responsable.pkResponsable.departement = new Departement();


    this.id.departement = new Departement();
    this.id.employee = new Employee();
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.id.departement.idDepartement = params['id'];
      this.id.employee.matricule = params['id1'];
      this.id.dateDebutRes = params['id2'];
    });
    this.employeeservice.getEmployee(this.id.employee.matricule).subscribe(
      data => {
        this.nom = data;
      }
    );
    this.departementservice.getDepartement(this.id.departement.idDepartement).subscribe(
      data => {
        this.dept = data;
      }
    )
    this.responsableservice.getresponsable(this.id).subscribe(data => {
      console.log(data)
      this.responsable = data;
    }, error => console.log(error));


  }
  save() {
    if (this.responsable.pkResponsable.dateDebutRes > this.responsable.dateFinRes)
      window.alert("attention date fin doit etre superieur au date début")
    else
      this.responsableservice.updateResponsable(this.responsable).subscribe(data => console.log(data), error => console.log(error));
    this.gotoList();
  }
  onSubmit() {
    this.submitted = true;
    this.save();
  }
  gotoList() {
    this.router.navigate(['/listerresponsable']);
  }

}
