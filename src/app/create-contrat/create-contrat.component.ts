import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Contrat } from '../contrat';
import { Observable } from 'rxjs';
import { Employee } from '../employee';
import { Router } from '@angular/router';
import { TypecontratService } from '../typecontrat.service';
import { TypeContrat } from '../typecontrat';
import { ContratService } from '../contrat.service';
import { EmployeeService } from '../employee.service';
import { ContratId } from '../contrat-id';
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-create-contrat',
  templateUrl: './create-contrat.component.html',
  styleUrls: ['./create-contrat.component.css']
})
export class CreateContratComponent implements OnInit {

  id_contrat: number;
  id_employee: number;
  date_contrat: Date;
  date_debut: Date;
  motif: String;
  date_fin: Date; salaire: string;
  contrat1: Contrat = new Contrat();
  typescontrats: Observable<any>;
  employees: Observable<Employee[]>;
  submitted = false;
  constructor(private router: Router,
    private typecontratservice: TypecontratService,
    private contratservice: ContratService,
    private employeeservice: EmployeeService,
    public dialog: MatDialog,
    private datePipe: DatePipe) {

    this.contrat1.pkContrat = new ContratId();
    this.contrat1.pkContrat.contrat = new TypeContrat();
    this.contrat1.pkContrat.employee = new Employee();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '350px',
      data: 'Cet employé a déjà un contrat actuellement !'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Ok clicked');
        //this.router.navigate(['lsterContrat']);
      }
    });
  }

  ngOnInit(): void {

    this.typescontrats = this.typecontratservice.getTypeContratList();
    this.employees = this.employeeservice.getEmployeesList();
  }
  newContrat(): void {
    this.submitted = false;
    this.contrat1 = new Contrat();

  }
  save() {
    this.contrat1.pkContrat.contrat.id_typeC = this.id_contrat;
    this.contrat1.pkContrat.date_Contrat = this.date_contrat;
    if (!this.contrat1.pkContrat.date_Contrat) {
      this.contrat1.pkContrat.date_Contrat = new Date();
    }
    this.contrat1.pkContrat.employee.matricule = this.id_employee;
    this.contrat1.date_Debut = this.date_debut;
    if (!this.contrat1.date_Debut) {
      this.contrat1.date_Debut = new Date();
    }
    this.contrat1.date_Fin = this.date_fin;
    this.contrat1.motif = this.motif;
    if (this.contrat1.motif == null)
      this.contrat1.motif = "Pas de motif";
    if (this.contrat1.date_Fin == null)
      this.contrat1.date_Fin = new Date("2100-01-01");

    if (this.contrat1.pkContrat.date_Contrat > this.contrat1.date_Debut || this.contrat1.date_Debut > this.contrat1.date_Fin) {

      window.alert("la Date du Contrat doit etre inférieur ou égale à la date du début!!" + "la date du début doit etre inférieur ou égale à la date fin");

    }
    else {
      console.log("le salire est : " + this.salaire);

      this.contrat1.salaire_initial = parseFloat(this.salaire);

      this.contratservice.createContrat(this.contrat1).subscribe(data => console.log(data), error => console.log(error));
      console.log("le salaire est :" + this.contrat1.salaire_initial);
      this.contrat1 = new Contrat();
      this.gotoList();
    }

  }
  onSubmit() {
    this.employeeservice.getActualContrat(this.id_employee).subscribe(
      data => {
        if (!data) {
          console.log(data);
          this.submitted = true;
          this.save();
        } else {
          console.log(data);
          this.submitted = false;
          this.openDialog();
        }
      }
    )

  }
  gotoList() {
    this.router.navigate(['/listerContrat']);
  }
  getContrat(): TypeContrat {
    return this.contrat1.pkContrat.contrat;
  }
  redirect() {
    this.router.navigate(['/creerContrat']);
  }

}
