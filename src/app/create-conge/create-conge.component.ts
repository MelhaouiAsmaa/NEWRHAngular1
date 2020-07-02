import { EmployeeService } from './../employee.service';
import { DatePipe } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { CongeServiceService } from './../conge.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-conge',
  templateUrl: './create-conge.component.html',
  styleUrls: ['./create-conge.component.css']
})
export class CreateCongeComponent implements OnInit {

  congeForm: FormGroup;
  justifie: boolean;
  conge: any;
  matricule: any;
  employee: any;
  causes: any[] = ['Congé annuel payé', 'Maladie', 'Naissance', 'Mariage', 'Décès', 'Maternité'];
  types: any[] = ['justifié', 'non justifié'];
  selectedFile: any;

  constructor(private formBuilder: FormBuilder,
              private congeservice: CongeServiceService,
              private activatedroute: ActivatedRoute,
              private employeeService: EmployeeService,
              private datePipe: DatePipe,
              private router: Router) { }

  ngOnInit() {
    this.congeForm = this.formBuilder.group({
      dateDepart: null,
      dateRetours: null,
      cause: this.causes[0],
      type: this.types[1],
      certificat: '',
      dateDemande: null,
      etat: '',
      matricule: null,
    });
  }

  // onSelect(value) {
  //   console.log(value);
  //   if (value === 'non justifié') {
  //     this.justifie = false;
  //     console.log('inside if: ' + this.justifie);
  //   } else {
  //     this.justifie = true;
  //     console.log('inside else: ' + this.justifie);
  //   }
  // }

  // onFileSelected(event) {
  //   console.log(event);
  //   this.selectedFile = event.target.files[0];
  //   console.log(this.selectedFile);
  // }

  onSubmit() {
    this.activatedroute.params.subscribe((param: Params) => {
      this.matricule = param['id'];
      this.employeeService.getEmployee(this.matricule).subscribe(
        data => {
          console.log(data);
          this.employee = data;
          this.conge = this.congeForm.value;
          this.conge.dateDemande = new Date();
          this.conge.dateDemande = this.datePipe.transform(this.conge.dateDemande, "yyyy-MM-dd'T'HH:mm:ss");
          this.conge.cause = this.congeForm.get('cause').value;
          this.conge.dateDepart = this.datePipe.transform(this.conge.dateDepart, "yyyy-MM-dd'T'HH:mm:ss");
          this.conge.dateRetours = this.datePipe.transform(this.conge.dateRetours, "yyyy-MM-dd'T'HH:mm:ss");
          this.conge.etat = 'En attente';
          this.conge.employee = this.employee;
          console.log(this.conge);
          this.congeservice.createConge(this.conge).subscribe(
            data2 => {
              console.log(data2);
            }, error => {
              console.log(error);
            });
        });
    });
  }
}
