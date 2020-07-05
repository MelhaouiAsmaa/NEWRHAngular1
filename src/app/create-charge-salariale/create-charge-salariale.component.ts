import { EmployeeChargeService } from './../employee-charge.service';
import { EmployeeChargeId } from './../employee-charge-id';
import { EmployeeCharge } from './../employee-charge';
import { EmployeeService } from './../employee.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChargeService } from './../charge.service';
import { Component, OnInit } from '@angular/core';
import { Charge } from '../charge';

@Component({
  selector: 'app-create-charge-salariale',
  templateUrl: './create-charge-salariale.component.html',
  styleUrls: ['./create-charge-salariale.component.css']
})
export class CreateChargeSalarialeComponent implements OnInit {

  chg: any;
  idemp;
  myDebDate: any;
  employee: any;
  charge: any;
  submitted = false;
  chargesalarialeForm: FormGroup;
  employees: any;
  charges: any[] = [];
  periode: any[] = ['Mensuel', 'Annuel', 'Trimestriel', 'Hebdomadaire', 'Quotidien'];
  prd: any;
  constructor(private chargeservice: ChargeService,
    private employeeservice: EmployeeService,
    private employechargeser: EmployeeChargeService,
    private formbuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.employeeservice.getAllEmployee().subscribe(
      data1 => {
        this.employees = data1;
        console.log(this.employees);
        this.chargeservice.getAllcharges().subscribe(
          data2 => {
            this.chg = data2;
            for (let ch of this.chg) {
              if (ch.typeCharge !== 'courante') {
                this.charges.push(ch);
              }
            }
          }
        )
      });
    this.chargesalarialeForm = this.formbuilder.group({
      charges: [null, Validators.required],
      employees: [this.employees, Validators.required],
      dateDebutC: null,
      periode: [this.periode[0]],
      montant: [null, [Validators.required, Validators.pattern('^([0-9]*[.])?[0-9]+$')]]
    })
  }

  get f() { return this.chargesalarialeForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.chargesalarialeForm.invalid) {
      return;
    }
    let empcharge = new EmployeeCharge();
    let empchargeid = new EmployeeChargeId();

    this.charge = this.chargesalarialeForm.get('charges').value;
    console.log(this.charge);
    this.employee = this.chargesalarialeForm.get('employees').value;
    console.log(this.employee);
    this.myDebDate = this.chargesalarialeForm.get('dateDebutC').value;
    if (this.myDebDate == null) {
      this.myDebDate = new Date();
      console.log('value:', this.myDebDate);
    }
    empchargeid.empId = this.employee.matricule;
    empchargeid.chargeId = this.charge.idCharge;
    empchargeid.dateDebutC = this.myDebDate;

    this.prd = this.chargesalarialeForm.get('periode').value;
    if (this.prd === 'Mensuel') {
      empcharge.dateFinC =
        new Date(this.myDebDate.getFullYear(), this.myDebDate.getMonth() + 1, this.myDebDate.getDate());
      console.log('Mensuel =====> ' + empcharge.dateFinC);
    } else if (this.prd === 'Annuel') {
      empcharge.dateFinC =
        new Date(this.myDebDate.getFullYear() + 1, this.myDebDate.getMonth(), this.myDebDate.getDate());
    } else if (this.prd === 'Trimestriel') {
      empcharge.dateFinC =
        new Date(this.myDebDate.getFullYear(), this.myDebDate.getMonth() + 3, this.myDebDate.getDate());
    } else if (this.prd === 'Hebdomadaire') {
      empcharge.dateFinC =
        new Date(this.myDebDate.getFullYear(), this.myDebDate.getMonth(), this.myDebDate.getDate() + 7);
    } else if (this.prd === 'Quotidien') {
      empcharge.dateFinC =
        new Date(this.myDebDate.getFullYear(), this.myDebDate.getMonth(), this.myDebDate.getDate() + 1);
    }
    empcharge.montant = this.chargesalarialeForm.get('montant').value;
    empcharge.employeec = this.employee;
    empcharge.chargeS = this.charge;
    empcharge.pkChargeemp = empchargeid;

    console.log(empcharge);
    this.employechargeser.createEmployeeCharge(empcharge).subscribe(
      data2 => {
        console.log(data2);
        this.router.navigate(['listerChargesalarialecourant']);
      }
    )
  }

}
