import { TokenStorageService } from './../../../../angular8-springboot-client1/src/app/_services/token-storage.service';
import { EmployeeEquipeService } from './../employee-equipe.service';
import { EmployeeEquipeId } from './../employee-equipe-id';
import { EmployeeEquipe } from './../employee-equipe';
import { EquipeService } from './../equipe.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { DepartementService } from '../departement.service';

@Component({
  selector: 'app-employee-equipe',
  templateUrl: './employee-equipe.component.html',
  styleUrls: ['./employee-equipe.component.css']
})
export class EmployeeEquipeComponent implements OnInit {

  equipe: any[] = [];
  equipeEmployeeForm: FormGroup;
  idemp;
  eq;
  myDebDate: any;
  myFinDate: any;
  empEq: EmployeeEquipe = new EmployeeEquipe();
  empEqId: EmployeeEquipeId = new EmployeeEquipeId();
  eqId: any;
  submitted = false;
  responsable;
  emp;
  isLoggedIn = false;
  private roles: string[];
  showAdminBoard = false;
  showModeratorBoard = false;
  mod = false;
  employeconn;
  userinterface;
  eqtemp;

  constructor(private equipeService: EquipeService,
    private router: Router,
    private formbuilder: FormBuilder,
    private employeeequipeService: EmployeeEquipeService,
    private employeeService: EmployeeService,
    private activatedroute: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private depService: DepartementService,
    public dialog: MatDialog,
    private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log('hihihi' + this.isLoggedIn);
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      if (this.showAdminBoard || this.showModeratorBoard) {
        this.activatedroute.params.subscribe((param: Params) => {
          this.idemp = param['id'];
        });
        this.equipeEmployeeForm = this.formbuilder.group({
          equipes: [null, Validators.required],
          dateDebutA: null,
          dateFinA: null,
          responsable: [null, Validators.required]
        });
        this.userinterface = false;
        if (this.showModeratorBoard) {
          this.mod = true;
          console.log(this.mod);
          this.employeeService.getEmployeeUser(user.id).subscribe(
            data7 => {
              this.employeconn = data7;
              this.employeeService.getActualDepartment(this.employeconn.matricule).subscribe(
                data6 => {
                  if (data6 == null) {
                    this.eqtemp = null;
                  } else {
                    this.depService.getDepartement(<number>data6).subscribe(
                      data5 => {
                        this.equipeService.getEquipesList().subscribe(
                          data => {
                            for (let d of data) {
                              if (d.departement.idDepartement === data5.idDepartement) {
                                this.equipe.push(d);
                                console.log(this.equipe);
                                console.log(this.equipe);
                                this.equipeEmployeeForm.get("equipes").setValue(this.equipe);
                              }
                            }
                          });
                      });
                  }
                });
            });
        } else {
          this.equipeService.getEquipesList().subscribe(
            data => {
              this.equipe = data;
              console.log(this.equipe);
              this.equipeEmployeeForm.get("equipes").setValue(this.equipe);
            });
        }
      } else {
        this.userinterface = true;
        console.log(this.userinterface);
      }
    }
  }

  get f() { return this.equipeEmployeeForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.equipeEmployeeForm.invalid) {
      return;
    }
    // tslint:disable-next-line: quotemark
    this.myDebDate = this.datePipe.transform(this.equipeEmployeeForm.get("dateDebutA").value, "yyyy-MM-dd'T'HH:mm:ss");
    if (this.myDebDate == null) {
      this.myDebDate = new Date();
      // tslint:disable-next-line: quotemark
      this.myDebDate = this.datePipe.transform(this.myDebDate, "yyyy-MM-dd'T'HH:mm:ss");
      console.log('value:', this.myDebDate);
    }
    // tslint:disable-next-line: quotemark
    this.myFinDate = this.datePipe.transform(this.equipeEmployeeForm.get("dateFinA").value, "yyyy-MM-dd'T'HH:mm:ss");
    if (this.myFinDate == null) {
      this.myFinDate = new Date('2999-12-31');
      this.myFinDate = this.datePipe.transform(this.myFinDate, "yyyy-MM-dd'T'HH:mm:ss");
    }
    console.log('myFinDate' + this.myFinDate);
    if (this.myFinDate < this.myDebDate) {
      window.alert('date de fin inférieur à date de début!');
    } else {
      this.eq = this.equipeEmployeeForm.value;
      console.log(this.eq.equipes);
      console.log(this.idemp);
      this.empEqId.empId = this.idemp;
      this.empEqId.equipeId = this.eq.equipes;
      this.empEqId.dateDebutA = this.myDebDate;
      this.empEq.pkEmpequipe = this.empEqId;
      // console.log(this.equipeEmployeeForm.get('equipes').value);
      this.equipeService.getEquipeById(this.eq.equipes).subscribe(
        data => {
          console.log(data);
          this.empEq.equipe = data;
          this.employeeService.getEmployee(this.idemp).subscribe(
            data2 => {
              this.empEq.employee = data2;
              this.empEq.dateFinA = this.myFinDate;
              if (this.equipeEmployeeForm.get('responsable').value === '1') {
                this.equipeService.getRespoEquipe(this.eq.equipes).subscribe(
                  data4 => {
                    if (!data4) {
                      this.empEq.responsable = true;
                      console.log(data4);
                    } else {
                      this.openDialog1(this.idemp);
                      console.log(this.empEq.responsable);
                    }
                    console.log(this.empEq);
                  });
              }
              this.employeeService.getActualEquipe(this.idemp).subscribe(
                data5 => {
                  this.emp = data2;
                  if (data5 == null) {
                    this.employeeequipeService.createEmployeeEquipe(this.empEq).subscribe(
                      data3 => {
                        console.log(this.empEq);
                        console.log(data3);
                        if (this.emp.user) {
                          this.router.navigate(['employees']);
                        } else {
                          this.gotoList(this.idemp);
                        }
                      });
                  } else {
                    this.openDialog2();
                    if (this.emp.user) {
                      this.router.navigate(['employees']);
                    } else {
                      this.gotoList(this.idemp);
                    }
                  }
                });
            });
        },
        error => {
          console.log(error);
          this.openDialog();
        });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '350px',
      data: 'Veuillez choisir une equipe !'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Ok clicked');
        location.reload();
      }
    });
  }

  openDialog1(id): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '350px',
      data: 'Cette equipe a deja un responsable !'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Ok clicked');
      }
    });
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '350px',
      data: 'Cet employé a déja une equipe actuellement !'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Ok clicked');
      }
    });
  }

  gotoList(id) {
    this.router.navigate(['register', id]);
    // this.router.navigate(['employees']);
  }

}
