import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EmployeFonctionId } from '../employe-fonction-id';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeFonctionService } from '../employee-fonction.service';


@Component({
  selector: 'app-update-employee-fonction',
  templateUrl: './update-employee-fonction.component.html',
  styleUrls: ['./update-employee-fonction.component.css']
})
export class UpdateEmployeeFonctionComponent implements OnInit {

  UpdatefctEmployeeForm: FormGroup;
  empfct: any;
  empfctId: EmployeFonctionId = new EmployeFonctionId();
  fctId: any;
  fonction: any[] = [];
  dateDeb: any;
  dateFin: any;
  submitted = false;
  idemp: any;
  list;
  funct: any;
  myDebDate: any;
  myFinDate: any;
  constructor(private router: Router,
              private formbuilder: FormBuilder,
              private employeefonctionService: EmployeeFonctionService,
              private activatedroute: ActivatedRoute,
              public dialog: MatDialog,
              private datePipe: DatePipe) {
               }

  ngOnInit() {
    this.activatedroute.params.forEach((param: Params) => {
      this.empfctId.empId = param['idemp'];
      this.empfctId.fctId = param['idfct'];
      this.empfctId.dateDebutR = param['datedeb'];
      console.log(this.empfctId);
      this.employeefonctionService.getEmployeeFonction(this.empfctId).subscribe(
        data => {
          this.empfct = data;
          console.log(this.empfct.dateFinR);
          this.UpdatefctEmployeeForm = this.formbuilder.group({
            dateFinR: [this.empfct.dateFinR, Validators.required]
          });
        }
      );
    })
  }

  f() { return this.UpdatefctEmployeeForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.UpdatefctEmployeeForm.invalid) {
    return;
    }
    console.log(this.empfct);
    this.myFinDate = this.datePipe.transform(this.UpdatefctEmployeeForm.get("dateFinR").value, "yyyy-MM-dd'T'HH:mm:ss");
    if (this.myFinDate) {
       this.empfct.dateFinR = this.myFinDate;
     }
    console.log(this.empfct);
    this.employeefonctionService.updateEmployeeFonction(this.empfct).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['details', this.empfct.employeef.matricule]);
        }, error => {
          console.log(error);
        });
  }

}
