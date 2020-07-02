import { Router } from '@angular/router';
import { FonctionService } from './../fonction.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-create-fonction',
  templateUrl: './create-fonction.component.html',
  styleUrls: ['./create-fonction.component.css']
})
export class CreateFonctionComponent implements OnInit {

  fonctionForm: FormGroup;
  fonction: any;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
              private fctService: FonctionService,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.fonctionForm = this.formBuilder.group({
      libelleFct: ['', [Validators.required, Validators.pattern('^[a-z]+$')]]
    });
  }

  get f() { return this.fonctionForm.controls; }
  

  onSubmit() {
      this.submitted = true;
      if (this.fonctionForm.invalid) {
      return;
      }
      this.fonction = this.fonctionForm.value;
      this.fctService.createFonction(this.fonction).subscribe(
      data => {
        this.fonction = data;
        console.log(data);
        this.gotoList();
      }
      , error => {
        console.log(error),
        // fonction existe deja
        this.openDialog();
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
    width: '350px',
    data: 'Ne peut pas créer, cette fonction existe déjà !'
    });
    dialogRef.afterClosed().subscribe(result => {
    if (result) {
    console.log('Ok clicked');
    // DO SOMETHING
    }
    });
    }

  // validateAllFormFields(formGroup: FormGroup) {
  // Object.keys(formGroup.controls).forEach(field => {
  //   const control = formGroup.get(field);
  //   control.markAsTouched({ onlySelf: true });
  // });
//}

  // isFieldValid(field: string) {
  //   return !this.fonctionForm.get(field).valid && this.fonctionForm.get(field).touched;
  // }

  // displayFieldCss(field: string) {
  //   return {
  //     'has-error': this.isFieldValid(field),
  //     'has-feedback': this.isFieldValid(field)
  //   };
  // }
  gotoList() {
    this.router.navigate(['/fonction']);
  }
}
