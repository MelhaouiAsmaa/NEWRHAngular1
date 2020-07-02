import { DepartementService } from './../departement.service';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  // employees: Employee[];
  mod = false;
  employeconn;
  userinterface;
  employees: any;
  valeur;
  searchText: any[] = [{ name: 'departement' }, { name: 'nom' }];
  isLoggedIn = false;
  private roles: string[];
  showAdminBoard = false;
  showModeratorBoard = false;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private tokenStorageService: TokenStorageService,
    private depService: DepartementService,
    private router: Router) { }

  openDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Êtes-vous sûr de vouloir archiver cet employé ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        // DO SOMETHING
        this.deleteEmployee(id);
      }
    });
  }

  onSelect(value) {
    console.log(value);
    if (value === 'nom') {
      // console.log('inside if: ' + value);
      this.valeur = 'nom';
      // console.log('after assigning nom: ' + value + '==>' + this.valeur);
    } else if (value === 'departement') {
      // console.log('inside else: ' + value);
      this.valeur = 'nomdep';
      // console.log('after assigning nomdep: ' + value + '==>' + this.valeur);
    }
    // console.log('out of if');
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
        this.userinterface = false;
        console.log(this.tokenStorageService.getUser().roles);
        console.log(this.userinterface);
        if (this.showModeratorBoard) {
          this.mod = true;
          console.log(this.mod);
          this.employeeService.getEmployeeUser(user.id).subscribe(
            data7 => {
              this.employeconn = data7;
              this.employeeService.getActualDepartment(this.employeconn.matricule).subscribe(
                data6 => {
                  if (data6 == null) {
                    this.employeconn.nomdep = null;
                    console.log(this.employeconn.matricule + '==>' + this.employeconn.nomdep);
                  } else {
                    this.depService.getDepartement(<number>data6).subscribe(
                      data5 => {
                        this.employeconn.nomdep = data5;
                        this.employeconn.nomdep = this.employeconn.nomdep.nomDepartement;
                        console.log(this.employeconn.matricule + '==>' + this.employeconn.nomdep);
                      });
                  }
                });
            });
        }
        this.employeeService.getEmployeesList().subscribe(data => {
          this.employees = data;
          console.log(data);
          // this.employees.forEach(element => {

          // });
          for (const emp of this.employees) {
            // console.log('inside if');
            this.employeeService.getActualEquipe(emp.matricule).subscribe(
              data2 => {
                if (data2 == null) {
                  emp.actualeq = false;
                } else {
                  console.log(emp.nom + '==>' + data2);
                  emp.actualeq = true;
                }
                // console.log(emp.actualeq);
              });
            this.employeeService.getActualFunction(emp.matricule).subscribe(
              data3 => {
                if (data3 == null) {
                  emp.actualfct = false;
                } else {
                  emp.actualfct = true;
                }
                // console.log(emp.actualfct);
              });
            this.employeeService.getActualDepartment(emp.matricule).subscribe(
              data4 => {
                // console.log(data4);
                if (data4 == null) {
                  emp.nomdep = null;

                  console.log(emp.matricule + '==>' + emp.nomdep);
                } else {
                  this.depService.getDepartement(<number>data4).subscribe(
                    data5 => {
                      emp.nomdep = data5;
                      emp.nomdep = emp.nomdep.nomDepartement;
                      console.log(emp.matricule + '==>' + emp.nomdep);
                    });
                }
              }, error => {
                console.log(error);
              });
          }
        });
      } else {
        this.userinterface = true;
        console.log(this.userinterface);
      }
    }
  }


  // reloadData() {
  //   this.employees = this.employeeService.getEmployeesList();
  // }

  deleteEmployee(id) {
    console.log(id);
    this.employeeService.deleteEmployee(id).subscribe(
      data => {
        console.log(data);
        this.ngOnInit();
      },
      error => console.log(error));
  }

  updateEmployee(id) {
    this.router.navigate(['/updateEmployee', id]);
  }

  employeeDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

  addequipe(id) {
    this.router.navigate(['/employees/add/equipe', id]);
  }

  addfonction(id) {
    this.router.navigate(['/employees/add/function', id]);
  }

  CongeList(id) {
    this.router.navigate(['/employees/conge', id]);
  }

  chargeList(id) {
    this.router.navigate(['chargesalariale', id]);
  }
}