import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Employee Application';
  private roles: string[];
  admin = false;
  mod = false;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  booltemp = false;
  username: string;
  employee;
  prenom;
  nom;
  matricule;

  constructor(private tokenStorageService: TokenStorageService,
    private employeeservice: EmployeeService,
    private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      if ((this.showAdminBoard || this.showModeratorBoard) && !this.booltemp) {
        console.log('bool' + this.booltemp);
        this.admin = true;
      } else {
        this.booltemp = true;
      }
      if (this.showModeratorBoard) {
        this.mod = true;
      }
      this.username = user.username;
      console.log(user.id);
      this.employeeservice.getEmployeeUser(user.id).subscribe(
        data => {
          console.log(data);
          this.employee = data;
          this.prenom = this.employee.prenom;
          this.nom = this.employee.nom;
          this.matricule = this.employee.matricule;

          console.log(this.nom + ' ' + this.prenom)
        });
    }
    console.log('LoggedIn: ' + this.isLoggedIn);
    console.log('admin: ' + this.admin);
  }

  logout() {
    this.tokenStorageService.signOut();
    // window.location.reload();
    this.router.navigate(['login']);
  }

  Addconge(id) {
    this.router.navigate(['conge/add/', id]);
  }

  onUser() {
    this.admin = false;
    console.log('ad' + this.admin);
    this.booltemp = true;
    console.log(this.booltemp);
    // this.ngOnInit();
  }

  EmployeeConge(id) {
    this.router.navigate(['employees/conge/', id]);
  }

}
