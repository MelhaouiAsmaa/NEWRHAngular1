import { Component, OnInit } from '@angular/core';
import { Responsable } from '../responsable';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ResponsableService } from '../responsable.service';
import { ResponsableId } from '../responsable-id';
@Component({
  selector: 'app-lister-responsable',
  templateUrl: './lister-responsable.component.html',
  styleUrls: ['./lister-responsable.component.css']
})
export class ListerResponsableComponent implements OnInit {
  responsables: Observable<Responsable[]>;
  constructor(private router: Router, private responsableservice: ResponsableService) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.responsables = this.responsableservice.getAll();
  }
  delete(respo: ResponsableId) {
    this.responsableservice.archive(respo).subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
  }
  update(id: number, id1: number, id3: Date) {
    console.log("la date est: " + id3);
    this.router.navigate(['modifierresponsabledepartement'], { queryParams: { id: id, id1: id1, id2: id3 } });

  }
}
