import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { JourFerieService } from './../jour-ferie.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TokenStorageService } from '../_services/token-storage.service';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-jour-ferie',
  templateUrl: './jour-ferie.component.html',
  styleUrls: ['./jour-ferie.component.css']
})
export class JourFerieComponent implements OnInit {

  submitted = false;
  admin = false;
  jourferie;
  jour;
  mydebdate;
  myfindate;
  jourferieForm;
  StoredJourFerie;
  currentDate = new Date();
  JourFerie: any[] = new Array; // = {
  isLoggedIn = false;
  private roles: string[];
  showAdminBoard = false;
  showModeratorBoard = false;
  //   nouvelAn: new Date(this.currentDate.getFullYear(), 1, 1),
  //   IndependanceManifest: new Date(this.currentDate.getFullYear(), 1, 11),
  //   feteTravail: new Date(this.currentDate.getFullYear(), 5, 1),
  //   AidAlFitr: [new Date(this.currentDate.getFullYear(), 5, 24), 
  //   new Date(this.currentDate.getFullYear(), 5, 26)],
  //   FeteTrone: new Date(this.currentDate.getFullYear(), 7, 30),
  //   AidAdha: [new Date(this.currentDate.getFullYear(), 7, 31), 
  // new Date(this.currentDate.getFullYear(), 8, 1)],
  //   OuedDeheb: new Date(this.currentDate.getFullYear(), 8, 14),
  //   IslamicNewYear: [new Date(this.currentDate.getFullYear(), 8, 19), 
  // new Date(this.currentDate.getFullYear(), 8, 20)],
  //   FeteJeunesse: new Date(this.currentDate.getFullYear(), 8, 21),
  //   AidMaoulidNabawi: new Date(this.currentDate.getFullYear(), 10, 29),
  //   MarcheVerte: new Date(this.currentDate.getFullYear(), 11, 6),
  //   FeteIndependance: new Date(this.currentDate.getFullYear(), 11, 18)
  // };
  constructor(
    private formBuilder: FormBuilder,
    private jourferieService: JourFerieService,
    private router: Router,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private tokenStorageService: TokenStorageService) { }

  openDialog(id): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '350px',
      data: 'Etes vous sûr de vouloir supprimer définitivement ce jour férié ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Ok clicked');
        this.onSupprimer(id);
      }
    });
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      if (this.showAdminBoard || this.showModeratorBoard) {
        this.admin = true;
      }
      this.jourferieService.getAlljourferies().subscribe(
        data1 => {
          this.JourFerie = data1;
          console.log(this.JourFerie);
          for (const jr of this.JourFerie) {
            this.mydebdate = new Date(jr.dateDebut);
            this.myfindate = new Date(jr.dateFin);
            if (this.mydebdate.getFullYear() !== this.currentDate.getFullYear()) {
              this.mydebdate.setFullYear(this.currentDate.getFullYear());
              console.log(this.mydebdate);
              jr.dateDebut = this.datePipe.transform(this.mydebdate, 'yyyy-MM-dd');
            }
            if (this.myfindate.getFullYear() !== this.currentDate.getFullYear()) {
              this.myfindate.setFullYear(this.currentDate.getFullYear());
              console.log(this.myfindate);
              jr.dateFin = this.datePipe.transform(this.myfindate, 'yyyy-MM-dd');
            }
            this.jourferieService.updatejourferie(jr).subscribe(
              data2 => { console.log(data2); });
          }
        }
      );
      this.jourferieForm = this.formBuilder.group({
        libelleJourFerie: [null, Validators.required],
        dateDebut: [null, Validators.required],
        dateFin: null
      });
    }
  }

  get f() { return this.jourferieForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.jourferieForm.invalid) {
      return;
    }
    this.jour = this.jourferieForm.get('libelleJourFerie').value;
    this.mydebdate = this.datePipe.transform(this.jourferieForm.get('dateDebut').value, 'yyyy-MM-dd');
    this.myfindate = this.datePipe.transform(this.jourferieForm.get('dateFin').value, 'yyyy-MM-dd');
    console.log(this.jour + this.mydebdate + this.myfindate);
    if (this.myfindate === null) {
      this.myfindate = this.mydebdate;
    }
    this.StoredJourFerie = this.jourferieForm.value;
    this.StoredJourFerie.dateDebut = this.mydebdate;
    this.StoredJourFerie.dateFin = this.myfindate;
    if (this.jourferie) {
      this.StoredJourFerie.idJourFerie = this.jourferie.idJourFerie;
      console.log(this.StoredJourFerie);
      this.jourferieService.updatejourferie(this.StoredJourFerie).subscribe(
        data4 => {
          console.log(data4);
          this.submitted = false;
          this.ngOnInit();
        });
    } else {
      this.jourferieService.createJourFerie(this.StoredJourFerie).subscribe(
        data5 => {
          console.log(data5);
          this.submitted = false;
          this.ngOnInit();
        }
      )
    }
  }

  onModifier(id) {
    console.log(id);
    this.jourferieService.getJourFerieById(id).subscribe(
      data2 => {
        this.jourferie = data2;

        this.jourferieForm = this.formBuilder.group({
          libelleJourFerie: [this.jourferie.libelleJourFerie, Validators.required],
          dateDebut: [this.jourferie.dateDebut, Validators.required],
          dateFin: this.jourferie.dateFin
        });
      }
    );
  }

  onSupprimer(id) {
    console.log(id);
    this.jourferieService.deleteJourFerie(id).subscribe(
      data3 => {
        this.ngOnInit();
      });
  }


}
