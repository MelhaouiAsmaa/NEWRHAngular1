import { MatDialog } from '@angular/material';
import { DepartementService } from './../departement.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EquipeService } from '../equipe.service';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { EmployeeService } from '../employee.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-update-equipe',
  templateUrl: './update-equipe.component.html',
  styleUrls: ['./update-equipe.component.css']
})
export class UpdateEquipeComponent implements OnInit {

  equipeForm: FormGroup;
  equipe: any;
  idequipe;
  deps: any[] = [];
  depobj: any;
  submitted = false;
  depart;
  isLoggedIn = false;
  private roles: string[];
  showAdminBoard = false;
  showModeratorBoard = false;
  mod = false;
  employeconn;
  userinterface;
  constructor(private formbuilder: FormBuilder,
    private equipeService: EquipeService,
    public dialog: MatDialog,
    private activatedroute: ActivatedRoute,
    private depService: DepartementService,
    private employeeService: EmployeeService,
    private tokenStorageService: TokenStorageService,
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
        this.activatedroute.params.subscribe((param: Params) => {
          this.idequipe = param['id'];
        });
        this.equipeService.getEquipeById(this.idequipe).subscribe(
          data => {
            console.log(data);
            this.equipe = data;
            this.depart = this.equipe.departement;
            console.log(this.depart);
            this.equipeForm = this.formbuilder.group({
              nomEquipe: [this.equipe.nomEquipe, [Validators.required, Validators.pattern('^[A-Z]+$')]],
              departement: null
            });
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
                    this.depService.getDepartement(<number>data6).subscribe(
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
    return this.depService.getDepartementsList();
  }


  onSubmit() {
    this.submitted = true;
    if (this.equipeForm.invalid) {
      return;
    }
    this.equipe = this.equipeForm.value;
    this.equipe.id_equipe = this.idequipe;
    console.log(this.equipe);
    this.equipeService.updateEquipe(this.equipe).subscribe(
      data => {
        this.equipe = data;
        console.log(data);
        this.gotoList();
      },
      error => {
        console.log(error);
        this.openDialog();
      });


  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '350px',
      data: 'Ne peut pas modifier, cette equipe existe déjà !'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Ok clicked');
        // DO SOMETHING
      }
    });
  }

  gotoList() {
    this.router.navigate(['/equipe']);
  }

  compareFn(a, b) {
    return a && b && a.nomDepartement === b.nomDepartement;
  }

}
