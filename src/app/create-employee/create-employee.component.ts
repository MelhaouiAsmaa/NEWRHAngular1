import { EmployeFonctionId } from './../employe-fonction-id';
import { EmployeeFonction } from './../employee-function';
import { FonctionService } from './../fonction.service';
import { EmployeeFonctionService } from './../employee-fonction.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { DatePipe } from '@angular/common';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
  providers: [DatePipe]
})

export class CreateEmployeeComponent implements OnInit {

  // selectedFile = null;
  myDate: any = new Date();
  employeeForm: FormGroup;
  employee: any;
  submitted = false;
  isLoggedIn = false;
  private roles: string[];
  showAdminBoard = false;
  showModeratorBoard = false;
  userinterface;

  constructor(private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private employeeService: EmployeeService,
    private router: Router,
    private datePipe: DatePipe) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
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
        this.employeeForm = this.formBuilder.group({
          nom: '',
          prenom: '',
          datenaissance: '',
          cin: '',
          adresse: '',
          telephone: '',
          annee_experience: 0,
          photo: ''
        });
      } else {
        this.userinterface = true;
        console.log(this.userinterface);
      }
    }
  }

  counter(i: number): number[] {
    return new Array(i);
  }
  // save() {
  //   this.employeeService.createEmployee(this.employee)
  //     .subscribe(data => console.log(data), error => console.log(error));
  //   this.employee = new Employee();
  //   // this.gotoList();
  // }

  // tslint:disable-next-line: align
  onSubmit() {
    // console.log(this.fctId);
    this.employee = this.employeeForm.value;
    this.employee.annee_experience = this.employeeForm.get('annee_experience').value;
    console.log(this.employee.annee_experience);
    if (this.employee.annee_experience < 5) {
      this.employee.soldeConge = 18;
    } else if (this.employee.annee_experience >= 5 && this.employee.annee_experience < 10) {
      this.employee.soldeConge = 18 * 1.5;
    } else if (this.employee.annee_experience >= 10 && this.employee.annee_experience < 15) {
      this.employee.soldeConge = (18 * 1.5) * 1.5;
    } else {
      this.employee.soldeConge = ((18 * 1.5) * 1.5) * 1.5;
    }
    console.log(this.employee);
    this.employeeService.createEmployee(this.employee).subscribe(
      data => {
        // this.employeeFonction.employeefct = data;
        // this.fonctionService.getFunctionById(this.fctId).subscribe(resp => {
        // this.employeeFonction.fonction = resp;
        // console.log(this.employeeFonction);
        // this.employeeFonctionService.createEmployeeFonction(this.employeeFonction).subscribe(res => {
        // console.log(res);
        this.employee = data;
        console.log(this.employee);
        this.gotoSecondForm(this.employee.matricule);
      });

  }

  // onSubmit1() {
  //   console.log(this.fctId);
  //   this.employee = this.employeeForm.value;
  //   this.employeeService.createEmployee(this.employee).subscribe(
  //     data => {
  // this.employeeFonction.employeefct = data;
  // this.employefonctionId.employeeId = this.employeeFonction.employeefct.matricule;
  // this.employefonctionId.dateDebutR = this.myDate;
  // this.fonctionService.getFunctionById(this.fctId).subscribe(resp => {
  //   this.employeeFonction.fonction = resp;
  //   this.employefonctionId.fonctionId = this.employeeFonction.fonction.idFct;
  //   console.log('employeeFonction: ' + this.employeeFonction);
  //   this.employeeFonction.idempfct = this.employefonctionId;
  //   this.employeeFonctionService.createEmployeeFonction(this.employeeFonction).subscribe(res => {
  // console.log('resultat' + data);
  //   });
  // });
  //   });
  // }


  gotoSecondForm(id) {
    this.router.navigate(['/employees/add/function', id]);
  }

  onFileSelected(event) {
    // console.log(event);
    // this.selectedFile = event.target.files[0];
  }
}
