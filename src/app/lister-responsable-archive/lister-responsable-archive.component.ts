import { Component, OnInit } from '@angular/core';
import { Responsable } from '../responsable';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ResponsableService } from '../responsable.service';
import { ResponsableId } from '../responsable-id';
@Component({
  selector: 'app-lister-responsable-archive',
  templateUrl: './lister-responsable-archive.component.html',
  styleUrls: ['./lister-responsable-archive.component.css']
})
export class ListerResponsableArchiveComponent implements OnInit {

  responsables: Observable<Responsable[]>;
  constructor(private router: Router, private responsableservice: ResponsableService) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.responsables = this.responsableservice.getAllArchive();
  }
  desarchiver(respo: ResponsableId) {
    this.responsableservice.desarchive(respo).subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
  }
}
