import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Societe} from '../societe';
import {SocieteService} from '../societe.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-lister-societe-archive',
  templateUrl: './lister-societe-archive.component.html',
  styleUrls: ['./lister-societe-archive.component.css']
})
export class ListerSocieteArchiveComponent implements OnInit {

  societes:Observable<Societe[]>;
  constructor(private router:Router,private societeservice:SocieteService) { }

  ngOnInit(): void {
    this.reloadData();
  }
reloadData()
{
  this.societes=this.societeservice.getSocieteListArchive();
}
archive(id:number)
{
  this.societeservice.desarchive(id).subscribe(
    data => {
      console.log(data);
      this.reloadData();
    },
    error => console.log(error));
}
update(id:number)
{
  this.router.navigate(['modifiersociete',id]);
}
}
