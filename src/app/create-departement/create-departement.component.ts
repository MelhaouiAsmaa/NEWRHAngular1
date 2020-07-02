import { Router } from '@angular/router';
import { Departement } from './../departement';
import { Component, OnInit } from '@angular/core';
import { DepartementService } from '../departement.service';

@Component({
  selector: 'app-create-departement',
  templateUrl: './create-departement.component.html',
  styleUrls: ['./create-departement.component.css']
})
export class CreateDepartementComponent implements OnInit {

  departement: Departement = new Departement();
  submitted = false;

  constructor(private departementService: DepartementService,
              private router: Router) { }

  ngOnInit() {
  }

  newDepartement(): void {
    this.submitted = false;
    this.departement = new Departement();
  }

  save() {
    this.departementService.createDepartement(this.departement)
    .subscribe(data => console.log(data), error => console.log(error));
    this.departement = new Departement();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/departement']);
  }

}
