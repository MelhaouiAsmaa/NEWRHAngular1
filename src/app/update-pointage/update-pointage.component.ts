import { Component, OnInit } from '@angular/core';
import { Pointage } from '../pointage';
import { ActivatedRoute, Router } from '@angular/router';
import { PointageService } from '../pointage.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-update-pointage',
  templateUrl: './update-pointage.component.html',
  styleUrls: ['./update-pointage.component.css']
})
export class UpdatePointageComponent implements OnInit {

  pointage: Pointage;
  submitted = false;
  id: number;
  constructor(private route: ActivatedRoute, private router: Router, private pointageservice: PointageService) {
    this.pointage = new Pointage();
    this.pointage.employee = new Employee();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.pointageservice.getById(this.id).subscribe(data => {
      console.log(data)
      this.pointage = data;
    }, error => console.log(error));

  }
  onSubmit() {
    this.submitted = true;
    this.pointageservice.UpdatePointage(this.pointage).subscribe(data => console.log(data), error => console.log(error));
    this.pointage = new Pointage();
    this.router.navigate(['listerpointage']);
  }

}
