import { DepartementService } from './../departement.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-update-departement',
  templateUrl: './update-departement.component.html',
  styleUrls: ['./update-departement.component.css']
})
export class UpdateDepartementComponent implements OnInit {

  depForm: FormGroup;
  dep: any;
  iddep;
  constructor(private formbuilder: FormBuilder,
              private depService: DepartementService,
              private activatedroute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedroute.params.subscribe((param: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.iddep = param['id'];
      console.log(this.iddep);
      // this.depService.getDepById(this.iddep).subscribe(
      // data => {
      // this.dep = data;
      // console.log(data);
      // this.depForm = this.formbuilder.group({
      //   nomDepartement: this.dep.nomDepartement
      // });
      // });
  });
    this.depService.getDepartement(this.iddep).subscribe(data => {
    this.dep = data;
    console.log(this.dep);
    this.depForm = this.formbuilder.group({
        nomDepartement: this.dep.nomDepartement
      });
  });
  }

  onSubmit() {
    this.dep = this.depForm.value;
    this.dep.idDepartement = this.iddep;
    console.log(this.dep);
    this.depService.updateDepartement(this.dep).subscribe(
      data => {
        this.dep = data;
        console.log(data);
      });
    this.gotoList();

  }

  gotoList() {
    this.router.navigate(['departement']);
  }

}
