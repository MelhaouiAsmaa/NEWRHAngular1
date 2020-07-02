import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Societe} from '../societe';
import {SocieteService} from '../societe.service';
@Component({
  selector: 'app-create-societe',
  templateUrl: './create-societe.component.html',
  styleUrls: ['./create-societe.component.css']
})
export class CreateSocieteComponent implements OnInit {

  submitted=false;
  societe:Societe=new Societe();
  constructor(private router:Router,private societeservice:SocieteService) { }

  ngOnInit(): void {
  }
newSociete():void{
  this.submitted=false;
  this.societe=new Societe();
}
save()
{
  this.societeservice.createtypecontrat(this.societe).subscribe(data => console.log(data), error => console.log(error));
this.societe=new Societe();
this.gotoList();
}
onSubmit()
{
  this.submitted=true;
  this.save();
}

gotoList()
{
  this.router.navigate(['/listerChargeArchive'])
}

}
