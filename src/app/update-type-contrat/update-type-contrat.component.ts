import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypecontratService } from '../typecontrat.service';

@Component({
  selector: 'app-update-type-contrat',
  templateUrl: './update-type-contrat.component.html',
  styleUrls: ['./update-type-contrat.component.css']
})
export class UpdateTypeContratComponent implements OnInit {
  submitted = false;
  id: number;
  typecontrat: any;
  constructor(private route: ActivatedRoute, private router: Router,
    private typecontratservice: TypecontratService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.typecontratservice.getTypeContrat(this.id).subscribe(data => {
      console.log(data)
      this.typecontrat = data;
    }, error => console.log(error));
  }

  updateTypeContrat() {
    this.typecontratservice.updateTypeContrat(this.id, this.typecontrat).subscribe(data => console.log(data), error => console.log(error));
    this.gotoList();
  }
  onSubmit() {
    this.submitted = true;
    this.updateTypeContrat();
  }
  gotoList() {
    this.router.navigate(['/listertypeContrat']);
  }
}
