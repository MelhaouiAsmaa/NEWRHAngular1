import { EmployeeService } from './../employee.service';
import { ChargeDepartement } from './../charge-departement';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement } from '../departement';
import { Router } from '@angular/router';
import { DepartementService } from '../departement.service';
import { ChargeService } from '../charge.service';
import { ChargedepartementId } from '../chargedepartement-id';
import { ChargedepartementService } from '../chargedepartement.service';
import { Charge } from '../charge';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-create-charge-departement',
  templateUrl: './create-charge-departement.component.html',
  styleUrls: ['./create-charge-departement.component.css']
})
export class CreateChargeDepartementComponent implements OnInit {

  submitted = false;
  departements: Departement[];
  charges: any;
  chargedepartement: ChargeDepartement;
  isLoggedIn = false;
  private roles: string[];
  showAdminBoard = false;
  showModeratorBoard = false;
  mod = false;
  employeconn;
  userinterface;
  constructor(private router: Router,
    private departementservice: DepartementService,
    private tokenStorageService: TokenStorageService,
    private employeeService: EmployeeService,
    private chargeservice: ChargeService,
    private chargedepartementservice: ChargedepartementService) {
    this.chargedepartement = new ChargeDepartement();
    this.chargedepartement.pk_chargedep = new ChargedepartementId();
    this.chargedepartement.pk_chargedep.departement = new Departement();
    this.chargedepartement.pk_chargedep.charge = new Charge();
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log('hihihi' + this.isLoggedIn);
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      if (this.showAdminBoard || this.showModeratorBoard) {
        this.userinterface = false;
        this.chargeservice.getAllcharges().subscribe(
          data1 => {
            this.charges = data1;
          });
        console.log(this.charges);
        if (this.showModeratorBoard) {
          this.mod = true;
          console.log(this.mod);
          // get employee of the user
          this.employeeService.getEmployeeUser(user.id).subscribe(
            data7 => {
              this.employeconn = data7;
              // get department of this user
              this.employeeService.getActualDepartment(this.employeconn.matricule).subscribe(
                data6 => {
                  if (data6 == null) {
                    window.alert('vous n\'avez aucun département');
                    this.router.navigate(['employees']);
                  } else {
                    this.departementservice.getDepartement(<number>data6).subscribe(
                      data5 => {
                        this.chargedepartement.pk_chargedep.departement = data5;
                      });
                  }
                });
            });
        } else {
          this.departementservice.getDepartementsList().subscribe(
            data2 => {
              this.departements = data2;
            });
        }

      }
    }
  }
  newChargeDepartement(): void {
    this.submitted = false;
  }
  save() {
    if (this.chargedepartement.date_Fin < this.chargedepartement.pk_chargedep.date_Debut) {
      window.alert("Attention Date Fin est Supérieur à La Date Début!!");
    }
    else {
      console.log(this.chargedepartement);
      this.chargedepartementservice.createChargeDepartement(this.chargedepartement).subscribe(data => console.log(data), error => console.log(error));
    }
  }
  onSubmit() {
    this.submitted = true;
    this.save();

  }
  gotoList() {
    this.router.navigate(['listerChargeDepartementcourant']);
  }

}
