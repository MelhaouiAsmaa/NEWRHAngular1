import { TypeContrat } from './../typecontrat';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypecontratService } from '../typecontrat.service';

@Component({
  selector: 'app-create-typecontrat',
  templateUrl: './create-typecontrat.component.html',
  styleUrls: ['./create-typecontrat.component.css']
})
export class CreateTypecontratComponent implements OnInit {

  typecontrat: TypeContrat = new TypeContrat();
  submitted = false;

  constructor(private router: Router, private typecontratservice: TypecontratService) { }

  ngOnInit(): void {
  }
  newTypeContrat(): void {
    this.submitted = false;
    this.typecontrat = new TypeContrat();
  }


  save() {
    this.typecontratservice.createtypecontrat(this.typecontrat)
      .subscribe(data => console.log(data), error => console.log(error));
    this.typecontrat = new TypeContrat();
    this.gotoList();
  }
  onSubmit() {
    this.submitted = true;
    this.save();
  }
  gotoList() {
    this.router.navigate(['listertypeContrat'])
  }

}
