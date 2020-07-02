import { Router } from '@angular/router';
import { FonctionService } from './../fonction.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-fonction-list',
  templateUrl: './fonction-list.component.html',
  styleUrls: ['./fonction-list.component.css']
})
export class FonctionListComponent implements OnInit {

  listeEmpNb: any[] = [];
  fonctions: any[];
  numb: any;
  constructor(private fctService: FonctionService,
              public dialog: MatDialog,
              private router: Router) { }

  // needs to be the first method on this page
  openDialog(id): void {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  width: '350px',
  data: 'Êtes-vous sûr de vouloir archiver cette fonction ?'
  });
  dialogRef.afterClosed().subscribe(result => {
  if(result) {
  console.log('Yes clicked');
  // DO SOMETHING
  this.deleteFonction(id);
  }
  });
  }

  ngOnInit() {
    this.fctService.getAllfcts().subscribe(
      data => {
        this.fonctions = data;
        for (let fc of this.fonctions)
        {
          this.fctService.getEmployeesNumbers(fc.idFct).subscribe(
            // tslint:disable-next-line: no-shadowed-variable
            data => {
              console.log(fc.idFct + ' ' + fc.libelleFct);
              // this.numb = data;
              // console.log(this.numb + '==> ' + fc.idFct);
              // this.listeEmpNb.push(this.numb);
              // console.log(this.listeEmpNb);
              fc.emp = data;
            });

        }
      });
  }


  deleteFonction(id) {
    console.log(id);
    this.fctService.deleteFct(id).subscribe(
      data => {
        console.log(id);
        console.log(data);
        this.ngOnInit();
      },
      error => console.log(error));
  }

  updateFonction(id) {
    this.router.navigate(['updateFonction', id]);
  }

  detailsFonction(id) {
    this.router.navigate(['/detailsFonction', id]);
  }
}
