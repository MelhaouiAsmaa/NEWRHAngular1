import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ChargeSociete} from '../ChargeSociete';
import {ChargesocieteService} from '../chargesociete.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lister-chargesociete',
  templateUrl: './lister-chargesociete.component.html',
  styleUrls: ['./lister-chargesociete.component.css']
})
export class ListerChargesocieteComponent implements OnInit {

  charges:Observable<ChargeSociete[]>;
  constructor(private router:Router,private chargesocieteservice:ChargesocieteService) { }

  ngOnInit(): void {
    this.reloadData();

  }
reloadData(){
this.charges=this.chargesocieteservice.lister();
}
archiver(id:Object)
{
  this.chargesocieteservice.archiver(id).subscribe(
    data => {
      console.log(data);
      this.reloadData();
    },
    error => console.log(error));
}
modifier(id1:number,id2:number,id3:Date)
{
  
  this.router.navigate(['modifierchargesociete'],{ queryParams: {id: id1,id1: id2,id2: id3}});
}
}
