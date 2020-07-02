import { Component, OnInit } from '@angular/core';
import {ChargeSociete} from '../ChargeSociete';
import {ChargesocieteService} from '../chargesociete.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-lister-chargesocietearchive',
  templateUrl: './lister-chargesocietearchive.component.html',
  styleUrls: ['./lister-chargesocietearchive.component.css']
})
export class ListerChargesocietearchiveComponent implements OnInit {

  charges:Observable<ChargeSociete[]>;
  constructor(private router:Router,private chargesocieteservice:ChargesocieteService) { }

  ngOnInit(): void {
    this.reloadData();

  }
reloadData(){
this.charges=this.chargesocieteservice.listerArchive();
}
desarchiver(id:Object)
{
  this.chargesocieteservice.desarchiver(id).subscribe(
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
