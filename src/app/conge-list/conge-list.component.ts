import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CongeServiceService } from './../conge.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { EmployeeService } from '../employee.service';
import { DepartementService } from '../departement.service';

@Component({
  selector: 'app-conge-list',
  templateUrl: './conge-list.component.html',
  styleUrls: ['./conge-list.component.css']
})
export class CongeListComponent implements OnInit {

  congees: any[] = [];
  mod = false;
  employeconn;
  userinterface;
  conges: any;
  conge: any;
  isLoggedIn = false;
  private roles: string[];
  showAdminBoard = false;
  showModeratorBoard = false;
  constructor(private congeService: CongeServiceService,
    private depService: DepartementService,
    private employeeService: EmployeeService,
    private tokenStorageService: TokenStorageService,
    private datePipe: DatePipe,
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
                        this.employeconn.iddep = this.employeconn.nomdep.idDepartement;
                        console.log(this.employeconn.matricule + '==>' + this.employeconn.iddep);
                        this.congeService.getCongeList().subscribe(
                          data => {
                            this.conges = data;
                            for (let cg of this.conges) {
                              console.log(cg);
                              this.employeeService.getActualDepartment(cg.employee.matricule).subscribe(
                                data2 => {
                                  if (!data2) {
                                    window.alert('vous n\'avez aucun departement');
                                    this.router.navigate(['employees']);
                                  } else {
                                    this.depService.getDepartement(<number>data2).subscribe(
                                      data3 => {
                                        if (data3.idDepartement === this.employeconn.iddep) {
                                          this.congees.push(cg);
                                          cg.dateRetours = new Date(cg.dateRetours);
                                          console.log(cg.dateRetours);
                                          cg.dateDepart = new Date(cg.dateDepart);
                                          console.log(cg.dateDepart);
                                          cg.nbJours = Math.floor((Date.UTC(cg.dateRetours.getFullYear(), cg.dateRetours.getMonth(), cg.dateRetours.getDate())
                                            - Date.UTC(cg.dateDepart.getFullYear(), cg.dateDepart.getMonth(), cg.dateDepart.getDate())) / (1000 * 60 * 60 * 24));
                                          cg.dateDepart = this.datePipe.transform(cg.dateDepart, 'yyyy-MM-dd');
                                          cg.dateRetours = this.datePipe.transform(cg.dateRetours, 'yyyy-MM-dd');
                                          cg.dateDemande = this.datePipe.transform(cg.dateDemande, 'yyyy-MM-dd');
                                        }
                                      });
                                  }
                                });
                            }
                          });
                      });
                  }
                });
            });
        } else {
          this.congeService.getCongeList().subscribe(
            data => {
              this.congees = <any>data;
              console.log(data);
              for (const cg of this.congees) {
                if (cg.employee) {
                  console.log(cg.employee.nom);
                }
                cg.dateRetours = new Date(cg.dateRetours);
                console.log(cg.dateRetours);
                cg.dateDepart = new Date(cg.dateDepart);
                console.log(cg.dateDepart);
                cg.nbJours = Math.floor((Date.UTC(cg.dateRetours.getFullYear(), cg.dateRetours.getMonth(), cg.dateRetours.getDate())
                  - Date.UTC(cg.dateDepart.getFullYear(), cg.dateDepart.getMonth(), cg.dateDepart.getDate())) / (1000 * 60 * 60 * 24));
                cg.dateDepart = this.datePipe.transform(cg.dateDepart, 'yyyy-MM-dd');
                cg.dateRetours = this.datePipe.transform(cg.dateRetours, 'yyyy-MM-dd');
                cg.dateDemande = this.datePipe.transform(cg.dateDemande, 'yyyy-MM-dd');
              }
              console.log(this.congees);
            });
        }
      }
    }
  }

  onValidate(congeObj) {
    this.conge = congeObj;
    this.conge.etat = 'Validé';
    this.congeService.updateConge(this.conge).subscribe(
      data => {
        console.log(data);
        this.gotoList();
      });
  }

  onRefuse(congeObj) {
    this.conge = congeObj;
    this.conge.etat = 'Non Validé';
    this.congeService.updateConge(this.conge).subscribe(
      data => {
        console.log(data);
        this.gotoList();
      });
  }

  // calculateDiff(date1: Date, date2: Date) {
  //   // tslint:disable-next-line: max-line-length
  //   return Math.floor((Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())
  //  - Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()) ) / (1000 * 60 * 60 * 24));
  // }

  gotoList() {
    this.router.navigate(['conge']);
  }
}
