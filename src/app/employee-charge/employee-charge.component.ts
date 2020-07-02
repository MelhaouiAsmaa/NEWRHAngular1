import { ChargeService } from './../charge.service';
import { EmployeeService } from './../employee.service';
import { EmployeeChargeId } from './../employee-charge-id';
import { EmployeeChargeService } from './../employee-charge.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmployeeCharge } from '../employee-charge';
import { error } from 'protractor';

@Component({
  selector: 'app-employee-charge',
  templateUrl: './employee-charge.component.html',
  styleUrls: ['./employee-charge.component.css']
})
export class EmployeeChargeComponent implements OnInit {

  periode: any[] = ['Mensuel', 'Annuel', 'Trimestriel', 'Hebdomadaire', 'Quotidien'];
  idemp;
  chargeEmployeeForm;
  submitted = false;
  myDebDate: any;
  empchargeId: EmployeeChargeId = new EmployeeChargeId();
  empcharge: EmployeeCharge = new EmployeeCharge();
  prd;
  constructor(private router: Router,
    private formbuilder: FormBuilder,
    private employeechargeservice: EmployeeChargeService,
    private employeeservice: EmployeeService,
    private chargeservice: ChargeService,
    private activatedroute: ActivatedRoute,
    public dialog: MatDialog,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.activatedroute.params.subscribe((param: Params) => {
      this.idemp = param['id'];
    });
    this.chargeEmployeeForm = this.formbuilder.group({
      dateDebutC: null,
      periode: [this.periode[0]],
      montant: [null, [Validators.required, Validators.pattern('^([0-9]*[.])?[0-9]+$')]]
    });

  }

  get f() { return this.chargeEmployeeForm.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.chargeEmployeeForm.invalid) {
      return;
    }
    // console.log(this.myDebDate);
    this.myDebDate = this.chargeEmployeeForm.get('dateDebutC').value;
    if (this.myDebDate == null) {
      this.myDebDate = new Date();
    }
    console.log('value:', this.myDebDate);
    this.prd = this.chargeEmployeeForm.get('periode').value;
    console.log(this.prd);
    this.empchargeId.chargeId = 3;
    this.empchargeId.dateDebutC = this.myDebDate;
    this.empchargeId.empId = this.idemp;
    console.log(this.empchargeId);
    this.empcharge.pkChargeemp = this.empchargeId;
    this.employeeservice.getEmployee(this.idemp).subscribe(
      data1 => {
        this.empcharge.employeec = data1;
        this.chargeservice.getChargeById(this.empchargeId.chargeId).subscribe(
          data2 => {
            this.empcharge.chargeS = data2;
            this.empcharge.montant = this.chargeEmployeeForm.get('montant').value;
            if (this.prd === 'Mensuel') {
              this.empcharge.dateFinC =
                new Date(this.myDebDate.getFullYear(), this.myDebDate.getMonth() + 1, this.myDebDate.getDate());
              console.log('Mensuel =====> ' + this.empcharge.dateFinC);
            } else if (this.prd === 'Annuel') {
              this.empcharge.dateFinC =
                new Date(this.myDebDate.getFullYear() + 1, this.myDebDate.getMonth(), this.myDebDate.getDate());
            } else if (this.prd === 'Trimestriel') {
              this.empcharge.dateFinC =
                new Date(this.myDebDate.getFullYear(), this.myDebDate.getMonth() + 3, this.myDebDate.getDate());
            } else if (this.prd === 'Hebdomadaire') {
              this.empcharge.dateFinC =
                new Date(this.myDebDate.getFullYear(), this.myDebDate.getMonth(), this.myDebDate.getDate() + 7);
            } else if (this.prd === 'Quotidien') {
              this.empcharge.dateFinC =
                new Date(this.myDebDate.getFullYear(), this.myDebDate.getMonth(), this.myDebDate.getDate() + 1);
            }
            console.log(this.empcharge);
            this.employeechargeservice.createEmployeeCharge(this.empcharge).subscribe(
              data3 => {
                console.log(data3);
                // si l'employe a deja une equipe on ne va au formulaire d'affectation équipe
                this.employeeservice.getActualEquipe(this.idemp).subscribe(
                  data4 => {
                    if (data4 == null) {
                      this.gotolist(this.idemp);
                    } else {
                      this.router.navigate(['employees']);
                    }
                  });
              }, error => {
                console.log(error);
              });
          });
      });
  }

  gotolist(id) {
    this.router.navigate(['/employees/add/equipe', id]);
  }
}
