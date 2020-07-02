import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  idemp: any;
  employee;
  constructor(private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private employeeService: EmployeeService,
    private activatedroute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedroute.params.subscribe((param: Params) => {
      this.idemp = param['id'];
      this.employeeService.getEmployee(this.idemp).subscribe(
        data => {
          console.log(data);
          this.employee = data;
        }
      );
    });
  }

  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.employee.user = data;
        console.log(this.employee);
        this.employeeService.updateEmployee(this.employee).subscribe(
          data1 => {
            console.log(data1);
          }
        );
        this.router.navigate(['employees']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}