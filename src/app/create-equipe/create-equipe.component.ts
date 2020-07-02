
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DepartementService } from './../departement.service';
import { EquipeService } from './../equipe.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Departement } from '../departement';
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { EmployeeService } from '../employee.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-create-equipe',
  templateUrl: './create-equipe.component.html',
  styleUrls: ['./create-equipe.component.css']
})
export class CreateEquipeComponent implements OnInit {

  equipeForm: FormGroup;
  equipe: any;
  deps: any[] = [];
  submitted = false;
  isLoggedIn = false;
  private roles: string[];
  showAdminBoard = false;
  showModeratorBoard = false;
  mod = false;
  employeconn;
  userinterface;
  constructor(private formBuilder: FormBuilder, private serviceq: EquipeService,
    private servicedeps: DepartementService,
    private employeeService: EmployeeService,
    private tokenStorageService: TokenStorageService,
    public dialog: MatDialog,
    private router: Router) { }

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
        this.equipeForm = this.formBuilder.group({
          nomEquipe: ['', [Validators.required, Validators.pattern('^[A-Z]+$')]],
          departement: null,
        });
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
                        this.equipeForm.get("departement").setValue(data5);
                      });
                  }
                });
            });


        } else {
          this.getlistdeps().subscribe(
            (data: any[]) => {
              this.deps = data;
            });
        }
      }
    }
  }

  get f() { return this.equipeForm.controls; }

  getlistdeps() {
    return this.servicedeps.getDepartementsList();
  }

  onSubmit() {
    this.submitted = true;
    if (this.equipeForm.invalid) {
      return;
    }
    this.equipe = this.equipeForm.value;
    console.log(this.equipe);
    this.serviceq.createEquipe(this.equipe).subscribe(
      data => {
        this.equipe = data;
        console.log(this.equipe);
        this.router.navigate(['/equipe']);
      },
      error => {
        console.log(error),
          // equipe existe deja
          this.openDialog();
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '350px',
      data: 'Ne peut pas créer, cette equipe existe déjà !'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Ok clicked');
        // DO SOMETHING
      }
    });
  }

}
