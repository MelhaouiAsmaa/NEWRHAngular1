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

  dep: any;
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
    // console.log(this.departement.nomDepartement);
    this.departementService.createDepartement(this.departement).subscribe(
      data => {
        //  console.log(this.departement.nomDepartement);

      },
      error => {
        console.log(error);
      });
    // console.log(this.departement.nomDepartement);

  }

  onSubmit() {
    this.submitted = true;
    this.save();
    this.gotoList();
    // this.departementService.getDepByName(this.departement.nomDepartement).subscribe(
    //   data1 => {
    //     console.log(data1);
    //     this.dep = data1;
    //     this.gotoList(this.dep.idDepartement);
    //   })
  }

  gotoList() {
    this.router.navigate(['/departement']);
  }

}
