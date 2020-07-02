import { logging } from 'protractor';
import { JourFerieService } from './../jour-ferie.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-conge-employee',
  templateUrl: './conge-employee.component.html',
  styleUrls: ['./conge-employee.component.css']
})
export class CongeEmployeeComponent implements OnInit {

  jourferies;
  matricule;
  employee;
  conges;
  totalconge = 0;
  currentYear;
  currentMonth;
  currentDay;
  lastdate;
  firstdate: Date;
  mydebdate;
  myfindate;
  constructor(
    private activatedroute: ActivatedRoute,
    private empService: EmployeeService,
    private jourFerieService: JourFerieService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.jourFerieService.getAlljourferies().subscribe(
      data8 => {
        console.log(data8);
        this.jourferies = data8;
      });
    this.activatedroute.params.subscribe((param: Params) => {
      this.matricule = param['id'];
      this.empService.getEmployee(this.matricule).subscribe(
        data1 => {
          console.log(data1);
          this.employee = data1;

          this.empService.getCongeByEmployee(this.matricule).subscribe(
            data2 => {
              // console.log(data2);
              this.conges = data2;
              for (const cg of this.conges) {
                if (cg.employee) {
                  // console.log(cg.employee.nom);
                }
                cg.dateRetours = new Date(cg.dateRetours);
                console.log(cg.dateRetours);
                cg.dateDepart = new Date(cg.dateDepart);
                console.log(cg.dateDepart);
                cg.nbJours = Math.floor((Date.UTC(cg.dateRetours.getFullYear(), cg.dateRetours.getMonth(), cg.dateRetours.getDate())
                  - Date.UTC(cg.dateDepart.getFullYear(), cg.dateDepart.getMonth(), cg.dateDepart.getDate())) / (1000 * 60 * 60 * 24));
                cg.dateDemande = this.datePipe.transform(cg.dateDemande, 'yyyy-MM-dd');

                this.currentYear = new Date().getFullYear();
                this.lastdate = new Date('2020-12-31');
                this.firstdate = new Date('2020-01-01');
                this.mydebdate = cg.dateDepart;
                this.myfindate = cg.dateRetours;
                if (cg.etat === 'Validé' && cg.cause === 'Congé annuel payé') {
                  if ((this.currentYear === cg.dateRetours.getFullYear()) && (this.currentYear === cg.dateDepart.getFullYear())) {
                    this.totalconge += cg.nbJours;
                  } else if (this.currentYear === cg.dateDepart.getFullYear()) {
                    this.totalconge +=
                      Math.floor((Date.UTC(this.currentYear, this.lastdate.getMonth(), this.lastdate.getDate() + 1)
                        - Date.UTC(cg.dateDepart.getFullYear(), cg.dateDepart.getMonth(), cg.dateDepart.getDate()))
                        / (1000 * 60 * 60 * 24));
                    this.myfindate = new Date(this.currentYear, this.lastdate.getMonth(), this.lastdate.getDate());
                  } else if (this.currentYear === cg.dateRetours.getFullYear()) {
                    this.totalconge +=
                      Math.floor((Date.UTC(cg.dateRetours.getFullYear(), cg.dateRetours.getMonth(), cg.dateRetours.getDate() + 1)
                        - Date.UTC(this.currentYear, this.firstdate.getMonth(), this.firstdate.getDate()))
                        / (1000 * 60 * 60 * 24));
                    this.mydebdate = new Date(this.currentYear, this.firstdate.getMonth(), this.firstdate.getDate());
                  }
                  console.log('conge ' + cg.id_Conge);
                  console.log('before ' + this.totalconge);
                  for (const d = new Date(this.mydebdate); d <= new Date(this.myfindate); d.setDate(d.getDate() + 1)) {
                    // const dt = new Date(d);
                    console.log(d);
                    if (d.getDay() === 6) {
                      this.totalconge -= 1;
                      console.log(this.totalconge);
                    } else if (d.getDay() === 0) {
                      this.totalconge -= 1;
                      console.log(this.totalconge);
                    } else {
                      console.log('after ' + this.totalconge);
                      for (const jf of this.jourferies) {
                        const fd = new Date(jf.dateDebut);
                        const ld = new Date(jf.dateFin);
                        console.log(fd + ' ' + ld);
                        if (fd.getTime() === ld.getTime()) {
                          if (d.getDate() === fd.getDate() && d.getMonth() === fd.getMonth() && d.getFullYear() === fd.getFullYear()) {
                            if (d.getDay() !== 0 && d.getDay() !== 6) {
                              this.totalconge -= 1;
                            }
                          }
                        } else {
                          for (const b = fd; b <= ld; b.setDate(b.getDate() + 1)) {
                            if (d.getDate() === b.getDate() && d.getMonth() === b.getMonth() && d.getFullYear() === b.getFullYear()) {
                              if (d.getDay() !== 0 && d.getDay() !== 6) {
                                this.totalconge -= 1;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                cg.dateDepart = this.datePipe.transform(cg.dateDepart, 'yyyy-MM-dd');
                cg.dateRetours = this.datePipe.transform(cg.dateRetours, 'yyyy-MM-dd');
              }
              // adding only leave days of the current year
              this.employee.totalconge = this.totalconge;
              console.log('total conge: ' + this.employee.totalconge);
            });
        });
    });
  }

}
