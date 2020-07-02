import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FonctionService } from './../fonction.service';
import { Component, OnInit } from '@angular/core';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-update-fonction',
  templateUrl: './update-fonction.component.html',
  styleUrls: ['./update-fonction.component.css']
})
export class UpdateFonctionComponent implements OnInit {


  fonctionForm: FormGroup;
  fonction: any;
  idfct;
  submitted = false;
  constructor(private formbuilder: FormBuilder,
              private servicefct: FonctionService,
              private activatedroute: ActivatedRoute,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {

    this.activatedroute.params.subscribe((param: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.idfct = param['id'];
      console.log(this.idfct);
      this.servicefct.getFunctionById(this.idfct).subscribe(
      data => {
      this.fonction = data;
      console.log(data);
      this.fonctionForm = this.formbuilder.group({
        libelleFct: [this.fonction.libelleFct, [Validators.required, Validators.pattern('^[a-z]+$')]]
      });
      });
  });
  }

  get f() { return this.fonctionForm.controls; }

    onSubmit() {
      this.submitted = true;
      if (this.fonctionForm.invalid) {
      return;
      }
      this.fonction = this.fonctionForm.value;
      this.fonction.idFct = this.idfct;
      console.log(this.fonction);
      this.servicefct.updateFct(this.fonction).subscribe(
        data => {
          this.fonction = data;
          console.log(data);
          this.gotoList();
        },
        error => {
          console.log(error);
          this.openDialog();
        }
        );
      

}

  openDialog(): void {
  const dialogRef = this.dialog.open(AlertDialogComponent, {
  width: '350px',
  data: 'Ne peut pas modifier, cette fonction existe déjà !'
  });
  dialogRef.afterClosed().subscribe(result => {
  if (result) {
  console.log('Ok clicked');
  // DO SOMETHING
  }
  });
  }

    gotoList() {
      this.router.navigate(['/fonction']);
    }

}