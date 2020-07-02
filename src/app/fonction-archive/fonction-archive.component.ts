import { Component, OnInit } from '@angular/core';
import { FonctionService } from '../fonction.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-fonction-archive',
  templateUrl: './fonction-archive.component.html',
  styleUrls: ['./fonction-archive.component.css']
})
export class FonctionArchiveComponent implements OnInit {

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
      data: 'Êtes-vous sûr de vouloir désarchiver cette fonction ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        // DO SOMETHING
        this.deleteFonction(id);
      }
    });
  }

  ngOnInit() {
    this.fctService.getAllArchivedfcts().subscribe(
      data => {
        this.fonctions = data;
        for (let fc of this.fonctions) {
          this.fctService.getEmployeestotalNumber(fc.idFct).subscribe(
            // tslint:disable-next-line: no-shadowed-variable
            data => {
              console.log(fc.idFct + ' ' + fc.libelleFct);
              // this.numb = data;
              // console.log(this.numb + '==> ' + fc.idFct);
              // this.listeEmpNb.push(this.numb);
              // console.log(this.listeEmpNb);
              if (data) {
                fc.emp = data;
              } else {
                fc.emp = 0;
              }
            });

        }
      });
  }


  deleteFonction(id) {
    console.log(id);
    this.fctService.desarchiverFct(id).subscribe(
      () => {
        this.ngOnInit();
      },
      error => console.log(error));
  }

  detailsFonction(id) {
    this.router.navigate(['/detailsFonction', id]);
  }
}
