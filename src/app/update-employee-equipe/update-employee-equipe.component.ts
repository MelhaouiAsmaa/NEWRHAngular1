import { EmployeeService } from './../employee.service';
import { EquipeService } from './../equipe.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmployeeEquipeService } from '../employee-equipe.service';
import { MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { EmployeeEquipeId } from '../employee-equipe-id';
import { error } from 'protractor';
import { Employee } from '../employee';
import { Equipe } from '../equipe';

@Component({
  selector: 'app-update-employee-equipe',
  templateUrl: './update-employee-equipe.component.html',
  styleUrls: ['./update-employee-equipe.component.css']
})
export class UpdateEmployeeEquipeComponent implements OnInit {

  emp: Employee = new Employee();
  eq: Equipe = new Equipe();
  empeqId: EmployeeEquipeId = new EmployeeEquipeId();
  empeq: any;
  UpdateEquipeEmployeeForm: FormGroup;
  submitted = false;
  myFinDate: any;

  constructor(private router: Router,
    private formbuilder: FormBuilder,
    private equipeservice: EquipeService,
    private employeeservice: EmployeeService,
    private employeeequipeService: EmployeeEquipeService,
    private activatedroute: ActivatedRoute,
    public dialog: MatDialog,
    private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.activatedroute.params.forEach((param: Params) => {
      this.empeqId.empId = param['idemp'];
      this.empeqId.equipeId = param['ideq'];
      this.empeqId.dateDebutA = param['datedeb'];
      console.log(this.empeqId);
      console.log(this.empeqId.dateDebutA);
      this.employeeequipeService.getEmployeeEquipe(this.empeqId).subscribe(
        data => {
          this.empeq = data;
          console.log(this.empeq.dateFinA);
          this.myFinDate = this.empeq.dateFinA;
          this.equipeservice.getEquipeById(this.empeqId.equipeId).subscribe(
            data1 => {
              this.eq = data1;
              this.employeeservice.getEmployee(this.empeqId.empId).subscribe(
                data2 => {
                  this.emp = data2;
                });
            }
          )
          this.UpdateEquipeEmployeeForm = this.formbuilder.group({
            dateFinA: [this.myFinDate, Validators.required]
          });
        }, error => {
          console.log(error);
        });
    })
    console.log(this.emp);
    console.log(this.eq);
  }

  f() { return this.UpdateEquipeEmployeeForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.UpdateEquipeEmployeeForm.invalid) {
      return;
    }
    console.log(this.empeq);
    this.myFinDate = this.datePipe.transform(this.UpdateEquipeEmployeeForm.get("dateFinA").value, "yyyy-MM-dd'T'HH:mm:ss");
    if (this.myFinDate) {
      this.empeq.dateFinA = this.myFinDate;
    }
    console.log(this.empeq);
    this.employeeequipeService.updateEmployeeEquipe(this.empeq).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['details', this.empeq.employee.matricule]);
      }, error => {
        console.log(error);
      });
  }

}
