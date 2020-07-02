import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number;
  employee: any;
  employeeForm: FormGroup;
  dn;
  isLoggedIn = false;
  private roles: string[];
  showAdminBoard = false;
  showModeratorBoard = false;
  userinterface;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private datepipe: DatePipe) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      if (this.showAdminBoard || this.showModeratorBoard) {
        this.userinterface = false;
        this.employee = new Employee();
        this.id = this.route.snapshot.params['id'];
        this.employeeService.getEmployee(this.id).subscribe(
          data => {
            console.log(data);
            this.employee = data;
            console.log(this.employee.datenaissance);
            this.employeeForm = this.formBuilder.group({
              nom: this.employee.nom,
              prenom: this.employee.prenom,
              datenaissance: new Date(this.employee.datenaissance),
              cin: this.employee.cin,
              adresse: this.employee.adresse,
              telephone: this.employee.telephone,
              annee_experience: this.employee.annee_experience
              // photo: this.employee.photo
            });
          }, error => console.log(error)
        );
      } else {
        this.userinterface = true;
        console.log(this.userinterface);
      }
    }
  }

  OnupdateEmployee() {
    this.employee = this.employeeForm.value;
    this.employee.matricule = this.id;
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
    this.employeeService.updateEmployee(this.employee).subscribe(
      data => {
        this.employee = data;
        console.log(data);
        this.gotoList(this.employee.matricule);
      },
      error => console.log(error)
    );
  }

  counter(i: number): number[] {
    return new Array(i);
  }

  onSubmit() {
    this.OnupdateEmployee();
  }

  gotoList(id) {
    // this.router.navigate(['updateEmployee/function', id]);
    this.router.navigate(['employees']);
  }

  getMMDDYYYY(date) {
    let d;
    let m;
    const today = new Date(date);
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) {
      d = '0' + dd;
    }
    if (mm < 10) {
      m = '0' + mm;
    }
    return m + '/' + d + '/' + yyyy;
  }
}