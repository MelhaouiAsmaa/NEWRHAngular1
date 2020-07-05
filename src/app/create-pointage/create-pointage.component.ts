import { Component, OnInit } from '@angular/core';
import { Pointage } from '../pointage';
import { Employee } from '../employee';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PointageService } from '../pointage.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create-pointage',
  templateUrl: './create-pointage.component.html',
  styleUrls: ['./create-pointage.component.css']
})
export class CreatePointageComponent implements OnInit {

  employees: Observable<Employee[]>;
  pointage: Pointage;
  submitted = false;
  constructor(private router: Router, private pointageservice: PointageService, private employeeservice: EmployeeService) {
    this.pointage = new Pointage();
    this.pointage.employee = new Employee();
  }

  ngOnInit(): void {
    this.employees = this.employeeservice.getAllEmployee();
  }
  newPointage(): void {
    this.submitted = false;
    this.pointage = new Pointage();
  }
  save() {
    this.pointageservice.createPointage(this.pointage).subscribe(data => console.log(data), error => console.log(error));
    this.pointage = new Pointage();
    this.gotoList();
  }
  onSubmit() {
    this.submitted = true;
    this.save();

  }
  gotoList() {
    this.router.navigate(['/listerpointage']);
  }

}
