import { EmployeeChargeId } from './../employee-charge-id';
import { ConfirmationDialogComponent } from './../shared/confirmation-dialog/confirmation-dialog.component';
import { ChargeService } from './../charge.service';
import { EmployeeChargeService } from './../employee-charge.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-charge-salariale-list',
  templateUrl: './charge-salariale-list.component.html',
  styleUrls: ['./charge-salariale-list.component.css']
})
export class ChargeSalarialeListComponent implements OnInit {

  charge;
  ch;
  idemp: any;
  periode;
  empchargeId: EmployeeChargeId = new EmployeeChargeId();
  constructor(private datePipe: DatePipe,
              private router: Router,
              private employeeservice: EmployeeService,
              private employeechargeser: EmployeeChargeService,
              private chargeservice: ChargeService,
              private activatedroute: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.activatedroute.params.subscribe((param: Params) => {
      this.idemp = param['id'];
      this.employeeservice.getChargeByEmployee(this.idemp).subscribe(
        data1 => {
          this.charge = data1;
          for (let ch of this.charge) {
            ch.dateFinC = new Date(ch.dateFinC);
            console.log(ch.dateFinC);
            ch.pkChargeemp.dateDebutC = new Date(ch.pkChargeemp.dateDebutC);
            console.log(ch.pkChargeemp.dateDebutC);
            this.periode = Math.floor((Date.UTC(ch.dateFinC.getFullYear(), ch.dateFinC.getMonth(), ch.dateFinC.getDate())
           - Date.UTC(ch.pkChargeemp.dateDebutC.getFullYear(), ch.pkChargeemp.dateDebutC.getMonth(),
            ch.pkChargeemp.dateDebutC.getDate()) ) / (1000 * 60 * 60 * 24));
            if (this.periode === 366 || this.periode === 365) {
              ch.periode = 'Annuel';
            } else if (this.periode <= 93 && this.periode >= 89) {
              ch.periode = 'Trimestriel';
            } else if (this.periode <= 32 && this.periode >= 28) {
              ch.periode = 'Mensuel';
            } else if (this.periode === 7) {
              ch.periode = 'Hebdomadaire';
            } else if (this.periode === 1) {
              ch.periode = 'Quotidien';
            }
            console.log(ch.periode);
            ch.dateFinC = this.datePipe.transform(ch.dateFinC, 'yyyy-MM-dd');
            ch.pkChargeemp.dateDebutC = this.datePipe.transform(ch.pkChargeemp.dateDebutC, 'yyyy-MM-dd');
          }
        }
      );
    });
  }

  onSupprimer(idemp, datedeb): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '350px',
    data: 'Voulez vous vraiment supprimer cette charge d\'employé ?'
    });
    dialogRef.afterClosed().subscribe(result => {
    if (result) {
    console.log('Ok clicked');
    console.log(idemp, datedeb);
    this.empchargeId.dateDebutC = datedeb;
    this.empchargeId.empId = idemp;
    this.empchargeId.chargeId = 3;
    console.log(this.empchargeId);
    this.employeechargeser.deleteemployeeCharge(this.empchargeId).subscribe(
      data => {
        this.ngOnInit();
      }, error => {
        console.log(error);
      });
    }
    });
  }

  onModifier(idemp, dateDebutC) {
    this.router.navigate(['updateEmployee/charge/', idemp, dateDebutC]);
  }
}
