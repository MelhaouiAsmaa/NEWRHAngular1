import { Component, OnInit } from '@angular/core';
import { EquipeService } from '../equipe.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { DepartementService } from '../departement.service';
import { EmployeeService } from '../employee.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-equipe-archive',
  templateUrl: './equipe-archive.component.html',
  styleUrls: ['./equipe-archive.component.css']
})
export class EquipeArchiveComponent implements OnInit {

  equipes: any[] = [];
  idEq;
  isLoggedIn = false;
  private roles: string[];
  showAdminBoard = false;
  showModeratorBoard = false;
  mod = false;
  employeconn;
  userinterface;
  constructor(private eqService: EquipeService,
    public dialog: MatDialog,
    private servicedeps: DepartementService,
    private employeeService: EmployeeService,
    private tokenStorageService: TokenStorageService,
    private router: Router) { }

  // needs to be the first method on this page
  openDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Êtes-vous sûr de vouloir désarchiver cette equipe ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        // DO SOMETHING
        this.eqService.desarchiverequipe(id).subscribe(
          data => {
            console.log(data);
            this.ngOnInit();
          });
      }
    });
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
        if (this.showModeratorBoard) {
          this.mod = true;
          console.log(this.mod);
          this.employeeService.getEmployeeUser(user.id).subscribe(
            data7 => {
              this.employeconn = data7;
              this.employeeService.getActualDepartment(this.employeconn.matricule).subscribe(
                data6 => {
                  if (data6 == null) {
                    window.alert('vous n\'avez aucun département');
                    this.router.navigate(['equipe']);
                  } else {
                    this.servicedeps.getDepartement(<number>data6).subscribe(
                      data5 => {
                        this.eqService.getAllArchivedequipes().subscribe(
                          data => {
                            for (let d of data) {
                              console.log(d);
                              if (d.departement.idDepartement === data5.idDepartement) {
                                this.equipes.push(d);
                              }
                            }
                            //this.equipes = data;
                            console.log(this.equipes);
                            for (let eq of this.equipes) {
                              this.eqService.getDepartmentNameByEquipe(eq.idEquipe).subscribe(
                                data1 => {
                                  console.log(eq.idEquipe + '=>' + data1);
                                  eq.departement = data1;
                                  this.eqService.getRespoEquipe(eq.idEquipe).subscribe(
                                    data2 => {
                                      console.log(data2);
                                      eq.responsable = data2;
                                    });
                                });
                            }
                          });
                      });
                  }
                });
            });
        } else {
          this.eqService.getAllArchivedequipes().subscribe(
            data => {
              this.equipes = data;
              console.log(this.equipes);
              for (let eq of this.equipes) {
                this.eqService.getDepartmentNameByEquipe(eq.idEquipe).subscribe(
                  data => {
                    console.log(eq.idEquipe + '=>' + data);
                    eq.departement = data;
                    this.eqService.getRespoEquipe(eq.idEquipe).subscribe(
                      data => {
                        console.log(data);
                        eq.responsable = data;
                      });
                  });
              }
            });
        }
      }
    }
  }

  detailsEquipe(id) {
    this.router.navigate(['detailsEquipe', id]);
  }


}
