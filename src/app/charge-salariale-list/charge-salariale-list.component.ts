import { EmployeeChargeId } from './../employee-charge-id';
import { ConfirmationDialogComponent } from './../shared/confirmation-dialog/confirmation-dialog.component';
import { ChargeService } from './../charge.service';
import { EmployeeChargeService } from './../employee-charge.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { MatDialog } from '@angular/material';
import { EmployeeCharge } from '../employee-charge';

@Component({
  selector: 'app-charge-salariale-list',
  templateUrl: './charge-salariale-list.component.html',
  styleUrls: ['./charge-salariale-list.component.css']
})
export class ChargeSalarialeListComponent implements OnInit {

  dateauj = new Date();
  charge: any[] = [];
  ch;
  idemp: any;
  periode;
  empchargeId: EmployeeChargeId = new EmployeeChargeId();
  lastcharge: EmployeeCharge = new EmployeeCharge();
  empcharge: any;
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
          this.empcharge = data1;
          console.log(data1);
          // for (let ch of this.empcharge) {
          //   if (ch.chargeS.typeCharge === 'courante') {
          //     this.charge.push(ch);
          //   }
          // }
          for (let item of this.empcharge) {
            //deep clone : prendre juste la valeur non pas la reference
            if (item.chargeS.typeCharge === 'courante') {
              this.lastcharge = JSON.parse(JSON.stringify(item));
            }
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

          console.log(this.lastcharge);
          let tempdate = new Date(this.lastcharge.dateFinC);
          let tempdatedeb = new Date(this.lastcharge.pkChargeemp.dateDebutC);
          console.log(this.dateauj);
          console.log(tempdate);
          if (this.dateauj.getFullYear() >= tempdate.getFullYear()
            && this.dateauj.getMonth() >= tempdate.getMonth()
            && this.dateauj.getDate() > tempdate.getDate()) {
            console.log('waaaaaaa');
            let diff = Math.floor((Date.UTC(tempdate.getFullYear(), tempdate.getMonth(), tempdate.getDate())
              - Date.UTC(tempdatedeb.getFullYear(), tempdatedeb.getMonth(),
                tempdatedeb.getDate())) / (1000 * 60 * 60 * 24));
            this.lastcharge.pkChargeemp.dateDebutC = this.lastcharge.dateFinC;
            this.lastcharge.dateFinC = new Date(tempdate.getFullYear(),
              tempdate.getMonth(),
              tempdate.getDate() + diff);
            console.log('diff' + diff);
            console.log(this.lastcharge);
            this.employeechargeser.createEmployeeCharge(this.lastcharge).subscribe(
              data2 => {
                console.log(data2);
                this.ngOnInit();
              });
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
    this.router.navigate(['updateEmployee/charge/', idemp, dateDebutC, 3]);
  }
}
