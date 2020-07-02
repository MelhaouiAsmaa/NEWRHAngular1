import { EmployeFonctionId } from './../employe-fonction-id';

import { EmployeeFonction } from './../employee-function';
import { EmployeeFonctionService } from './../employee-fonction.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FonctionService } from '../fonction.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-employee-fonction',
  templateUrl: './employee-fonction.component.html',
  styleUrls: ['./employee-fonction.component.css']
})
export class EmployeeFonctionComponent implements OnInit {

  fonction: any[] = [];
  fctEmployeeForm: FormGroup;
  idemp;
  funct;
  myDebDate: any;
  myFinDate: any;
  empfct: EmployeeFonction = new EmployeeFonction();
  empfctId: EmployeFonctionId = new EmployeFonctionId();
  fctId: any;
  submitted = false;
  constructor(private fonctionService: FonctionService,
    private router: Router,
    private formbuilder: FormBuilder,
    private employeefonctionService: EmployeeFonctionService,
    private employeeService: EmployeeService,
    private activatedroute: ActivatedRoute,
    public dialog: MatDialog,
    private datePipe: DatePipe) {
    //  this.myDate = this.datePipe.transform(this.myDate, "yyyy-MM-dd'T'HH:mm:ss");
  }

  ngOnInit() {
    this.fonctionService.getAllfcts().subscribe(
      data => {
        this.fonction = data;
        console.log(data);
        this.fctEmployeeForm = this.formbuilder.group({
          fonctions: [this.fonction, Validators.required],
          dateDebutR: null,
          dateFinR: null,
        });
      });
  }

  get f() { return this.fctEmployeeForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.fctEmployeeForm.invalid) {
      return;
    }
    // tslint:disable-next-line: quotemark
    this.myDebDate = this.datePipe.transform(this.fctEmployeeForm.get("dateDebutR").value, "yyyy-MM-dd'T'HH:mm:ss");
    if (this.myDebDate == null) {
      this.myDebDate = new Date();
      // tslint:disable-next-line: quotemark
      this.myDebDate = this.datePipe.transform(this.myDebDate, "yyyy-MM-dd'T'HH:mm:ss");
      console.log('value:', this.myDebDate);
    }
    // tslint:disable-next-line: quotemark
    this.myFinDate = this.datePipe.transform(this.fctEmployeeForm.get("dateFinR").value, "yyyy-MM-dd'T'HH:mm:ss");
    if (this.myFinDate == null) {
      this.myFinDate = new Date('2999-12-31');
      this.myFinDate = this.datePipe.transform(this.myFinDate, "yyyy-MM-dd'T'HH:mm:ss");
    }
    if (this.myFinDate < this.myDebDate) {
      window.alert('date de fin inférieur à date de début!');
    } else {
      console.log('myFinDate' + this.myFinDate);
      this.funct = this.fctEmployeeForm.value;
      console.log(this.funct.fonctions);
      this.activatedroute.params.subscribe((param: Params) => {
        this.idemp = param['id'];
        console.log(this.idemp);
        this.empfctId.empId = this.idemp;
        this.empfctId.fctId = this.funct.fonctions;
        this.empfctId.dateDebutR = this.myDebDate;
        this.empfct.pkFonctionemp = this.empfctId;
        this.fonctionService.getFunctionById(this.funct.fonctions).subscribe(
          data => {
            console.log(data);
            this.empfct.fonction = data;
            this.employeeService.getEmployee(this.idemp).subscribe(
              data2 => {
                this.empfct.employeef = data2;
                this.empfct.dateFinR = this.myFinDate;
                console.log(this.empfct);

                this.employeeService.getActualFunction(this.idemp).subscribe(
                  data5 => {
                    if (data5 == null) {
                      this.employeefonctionService.createEmployeeFonction(this.empfct).subscribe(
                        data3 => {
                          console.log(data3);
                          console.log(this.empfct);
                          this.gotoThirdForm(this.idemp);
                        });
                    } else {
                      this.openDialog2();
                      this.gotoThirdForm(this.idemp);
                    }
                  });
              });
          },
          error => {
            console.log(error);
            this.openDialog();
          });
      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '350px',
      data: 'Veuillez choisir une fonction !'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Ok clicked');
        // DO SOMETHING
      }
    });
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '350px',
      data: 'Cet employé a déja une fonction actuellement !'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Ok clicked');
      }
    });
  }

  gotoThirdForm(id) {
    this.router.navigate(['employees/add/salary', id]);
  }

}
