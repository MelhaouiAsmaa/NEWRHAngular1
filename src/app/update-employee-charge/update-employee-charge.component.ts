import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeChargeService } from '../employee-charge.service';
import { EmployeeService } from '../employee.service';
import { ChargeService } from '../charge.service';
import { MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { EmployeeChargeId } from '../employee-charge-id';
import { EmployeeCharge } from '../employee-charge';

@Component({
  selector: 'app-update-employee-charge',
  templateUrl: './update-employee-charge.component.html',
  styleUrls: ['./update-employee-charge.component.css']
})
export class UpdateEmployeeChargeComponent implements OnInit {

  periode: any[] = ['Mensuel', 'Annuel', 'Trimestriel', 'Hebdomadaire', 'Quotidien'];
  idemp;
  chargeEmployeeForm;
  submitted = false;
  myDebDate: any;
  empchargeId: EmployeeChargeId = new EmployeeChargeId();
  empcharge;
  prd;
  DateDebutC: any;
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
      this.idemp = param['idemp'];
      this.DateDebutC = param['datedeb'];
    });
    this.empchargeId.dateDebutC = this.DateDebutC;
    this.empchargeId.empId = this.idemp;
    this.empchargeId.chargeId = 3;
    this.employeechargeservice.getEmployeeCharge(this.empchargeId).subscribe(
      data1 => {
        console.log(data1);
        this.empcharge = data1;
        this.empcharge.pkChargeemp.dateDebutC = this.datePipe.transform(this.empcharge.pkChargeemp.dateDebutC, 'dd/MM/yyyy');
        console.log(this.empcharge.pkChargeemp.dateDebutC);
        this.chargeEmployeeForm = this.formbuilder.group({
          periode: [this.periode[0]],
          montant: [this.empcharge.montant, [Validators.required, Validators.pattern('^([0-9]*[.])?[0-9]+$')]]
        });
      });
  }

  get f() { return this.chargeEmployeeForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.chargeEmployeeForm.invalid) {
      return;
    }
    this.prd = this.chargeEmployeeForm.get('periode').value;
    console.log(this.prd);
    console.log(this.empchargeId);
    this.myDebDate = new Date(this.empchargeId.dateDebutC);
    this.empcharge.montant = this.chargeEmployeeForm.get('montant').value;

    if (this.prd === 'Mensuel') {
      this.empcharge.dateFinC = new Date(this.myDebDate.setMonth(this.myDebDate.getMonth() + 1));
    } else if (this.prd === 'Annuel') {
      this.empcharge.dateFinC =
        new Date(this.myDebDate.getFullYear() + 1, this.myDebDate.getMonth(), this.myDebDate.getDate());
    } else if (this.prd === 'Trimestriel') {
      this.empcharge.dateFinC = new Date(this.myDebDate.setMonth(this.myDebDate.getMonth() + 3));
    } else if (this.prd === 'Hebdomadaire') {
      this.empcharge.dateFinC = new Date(this.myDebDate.setDate(this.myDebDate.getDate() + 7));
    } else if (this.prd === 'Quotidien') {
      this.empcharge.dateFinC = new Date(this.myDebDate.setDate(this.myDebDate.getDate() + 1));
    }

    // this.myDebDate = this.datePipe.transform(this.myDebDate, "yyyy-MM-dd'T'HH:mm:ss");
    this.empchargeId.dateDebutC = this.DateDebutC;
    this.empcharge.pkChargeemp = this.empchargeId;
    console.log(this.empcharge);
    this.employeechargeservice.updateEmployeeCharge(this.empcharge).subscribe(
      data3 => {
        console.log(data3);
        this.gotolist();
      }, error => {
        console.log(error);
      });
  }

  OnAnnuler() {
    this.router.navigate(['employees']);
  }

  gotolist() {
    this.router.navigate(['chargesalariale', this.idemp]);
  }
}
