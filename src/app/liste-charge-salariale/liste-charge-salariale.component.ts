import { EmployeeChargeId } from './../employee-charge-id';
import { MatDialog } from '@angular/material';
import { ChargeService } from './../charge.service';
import { EmployeeChargeService } from './../employee-charge.service';
import { EmployeeService } from './../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-liste-charge-salariale',
  templateUrl: './liste-charge-salariale.component.html',
  styleUrls: ['./liste-charge-salariale.component.css']
})
export class ListeChargeSalarialeComponent implements OnInit {

  periode: any;
  empcharge: any;
  employeecharge: any;
  empchargeId: EmployeeChargeId = new EmployeeChargeId();
  constructor(private datePipe: DatePipe,
    private router: Router,
    private employeeservice: EmployeeService,
    private employeechargeser: EmployeeChargeService,
    private chargeservice: ChargeService,
    private activatedroute: ActivatedRoute,
    private dialog: MatDialog) { }

  onSupprimer(idemp, datedeb, idch): void {
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
        this.empchargeId.chargeId = idch;
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

  ngOnInit() {
    this.employeechargeser.getAllEmployeeCharge().subscribe(
      data1 => {
        this.employeecharge = data1;
        console.log(data1);
        for (let item of this.employeecharge) {
          item.dateFinC = new Date(item.dateFinC);
          console.log(item.dateFinC);
          item.pkChargeemp.dateDebutC = new Date(item.pkChargeemp.dateDebutC);
          console.log(item.pkChargeemp.dateDebutC);
          this.periode = Math.floor((Date.UTC(item.dateFinC.getFullYear(), item.dateFinC.getMonth(), item.dateFinC.getDate())
            - Date.UTC(item.pkChargeemp.dateDebutC.getFullYear(), item.pkChargeemp.dateDebutC.getMonth(),
              item.pkChargeemp.dateDebutC.getDate())) / (1000 * 60 * 60 * 24));
          if (this.periode === 366 || this.periode === 365) {
            item.periode = 'Annuel';
          } else if (this.periode <= 93 && this.periode >= 89) {
            item.periode = 'Trimestriel';
          } else if (this.periode <= 32 && this.periode >= 28) {
            item.periode = 'Mensuel';
          } else if (this.periode === 7) {
            item.periode = 'Hebdomadaire';
          } else if (this.periode === 1) {
            item.periode = 'Quotidien';
          }
          console.log(item.periode);
          item.dateFinC = this.datePipe.transform(item.dateFinC, 'yyyy-MM-dd');
          item.pkChargeemp.dateDebutC = this.datePipe.transform(item.pkChargeemp.dateDebutC, 'yyyy-MM-dd');

        }
        console.log(this.employeecharge);
      }
    )
  }



  onModifier(idemp, dateDebutC, idchg) {
    this.router.navigate(['updateEmployee/charge/', idemp, dateDebutC, idchg]);
  }



}
