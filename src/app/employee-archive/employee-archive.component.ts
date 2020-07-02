import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { MatDialog } from '@angular/material';
import { TokenStorageService } from '../_services/token-storage.service';
import { DepartementService } from '../departement.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-employee-archive',
  templateUrl: './employee-archive.component.html',
  styleUrls: ['./employee-archive.component.css']
})
export class EmployeeArchiveComponent implements OnInit {

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
      data: 'Êtes-vous sûr de vouloir desarchiver cet employé ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        // DO SOMETHING
        this.employeeService.desarchiverEmployee(id).subscribe(
          data1 => {
            console.log(data1);
            this.ngOnInit();
          });
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
        this.employeeService.getArchivedEmployeesList().subscribe(data => {
          this.employees = data;
          console.log(data);
          for (const emp of this.employees) {

            this.employeeService.getActualDepartment(emp.matricule).subscribe(
              data4 => {
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


  employeeDetails(id: number) {
    this.router.navigate(['/details', id]);
  }


  CongeList(id) {
    this.router.navigate(['/employees/conge', id]);
  }

  chargeList(id) {
    this.router.navigate(['chargesalariale', id]);
  }

}
