import { DatePipe } from '@angular/common';
import { EmployeeEquipeService } from './../employee-equipe.service';
import { EmployeFonctionId } from './../employe-fonction-id';
import { EmployeeFonctionService } from './../employee-fonction.service';
import { EmployeeFonction } from './../employee-function';
import { ConfirmationDialogComponent } from './../shared/confirmation-dialog/confirmation-dialog.component';
import { Employee } from '../employee';
import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EmployeeEquipeId } from '../employee-equipe-id';
import { EmployeeEquipe } from '../employee-equipe';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: any;
  idemp: any;
  employeesfunctions: any;
  empfctid: EmployeFonctionId = new EmployeFonctionId();
  empeqid: EmployeeEquipeId = new EmployeeEquipeId();
  listequipe: any;
  employeeEquipe: any;
  dated: any;
  datef: any;

  constructor(private employeeService: EmployeeService,
    private employeefonctionService: EmployeeFonctionService,
    private employeequipeservice: EmployeeEquipeService,
    private activatedroute: ActivatedRoute,
    private datepipe: DatePipe,
    private router: Router,
    public dialog: MatDialog) { }

  openDialog(idemp, idfct, datedeb): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Voulez vous vraiment supprimer cette fonction d\'employé ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Ok clicked');
        console.log(idemp, idfct, datedeb);
        this.empfctid.dateDebutR = datedeb;
        this.empfctid.empId = idemp;
        this.empfctid.fctId = idfct;
        console.log(this.empfctid);
        this.employeefonctionService.deleteEmployeeFonction(this.empfctid).subscribe(
          data => {
            this.ngOnInit();
          }, error => {
            console.log(error);
          });
      }
    });
  }

  openDialog1(idemp, ideq, datedeb): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Voulez vous vraiment supprimer cette équipe d\'employé ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Ok clicked');
        console.log(idemp, ideq, datedeb);
        this.empeqid.dateDebutA = datedeb;
        this.empeqid.empId = idemp;
        this.empeqid.equipeId = ideq;
        console.log(this.empeqid);
        this.employeequipeservice.deleteemployeeequipe(this.empeqid).subscribe(
          data => {
            this.ngOnInit();
          }, error => {
            console.log(error);
          });
      }
    });
  }

  ngOnInit() {
    this.activatedroute.params.subscribe((param: Params) => {
      this.idemp = param['id'];
      this.employeeService.getEmployee(this.idemp).subscribe(
        data1 => {
          this.employee = data1;
          let datee = new Date(this.employee.datenaissance);
          this.employee.age = this.age(datee);
          console.log(this.employee);
        });
      this.employeeService.getEmployeeFonctions(this.idemp).subscribe(
        data => {
          console.log(data);
          this.employeesfunctions = data;
          for (const i of this.employeesfunctions) {
            console.log(this.idemp);
            console.log(i.fonction.libelleFct);
            this.dated = new Date(i.pkFonctionemp.dateDebutR);
            this.dated.setDate(this.dated.getDate() + 1);
            this.dated = this.datepipe.transform(this.dated, 'yyyy-MM-dd');
            console.log(i.pkFonctionemp.dateDebutR + '==>' + this.dated);
            this.datef = new Date(i.dateFinR);
            this.datef.setDate(this.datef.getDate() + 1);
            this.datef = this.datepipe.transform(this.datef, 'yyyy-MM-dd');
            console.log(i.dateFinR + '==>' + this.datef);
            this.employeeService.getEquipeByFonctionsEmployee(this.idemp,
              this.dated,
              this.datef).
              subscribe(
                data1 => {
                  this.listequipe = data1;
                  i.listeequipe = this.listequipe;
                  console.log(this.listequipe);
                  for (const j of this.listequipe) {
                    console.log(j.idEquipe);
                    this.employeequipeservice.getByEmployeeandEquipe(this.idemp, j.idEquipe).subscribe(
                      data2 => {
                        console.log(data2);
                        this.employeeEquipe = data2;
                        console.log(this.employeeEquipe.pkEmpequipe.dateDebutA);
                        j.datedebutA = this.employeeEquipe.pkEmpequipe.dateDebutA;
                        j.datefinA = this.employeeEquipe.dateFinA;
                        console.log(i);
                      });
                  }
                });
          }
        });
    });
  }

  updateEmpFonc(idemp, idfct, datedeb) {
    this.router.navigate(['updateEmployee/function/', idemp, idfct, datedeb]);
  }

  updateEmpEq(idemp, ideq, datedeb) {
    this.router.navigate(['updateEmployee/equipe/', idemp, ideq, datedeb]);
  }

  age(date: Date): number {
    let dateauj = new Date();
    if (dateauj.getMonth() < date.getMonth() && dateauj.getDay() < date.getDay()) {
      return dateauj.getFullYear() - date.getFullYear() - 1;
    }
    return dateauj.getFullYear() - date.getFullYear();
  }
}
