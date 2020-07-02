import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Societe} from '../societe';
import {SocieteService} from '../societe.service';
@Component({
  selector: 'app-update-societe',
  templateUrl: './update-societe.component.html',
  styleUrls: ['./update-societe.component.css']
})
export class UpdateSocieteComponent implements OnInit {
id:number;
societe:Societe;
submitted=false;

  constructor(private route:ActivatedRoute,private router:Router,private societeservice:SocieteService) { }

  ngOnInit(): void {
    this.societe=new Societe();
    this.id=this.route.snapshot.params['id'];
    this.societeservice.getsociete(this.id).subscribe(data => {
      console.log(data)
      this.societe = data;
    }, error => console.log(error));
    
  }
  update(){
  
    this.societeservice.update(this.societe).subscribe(data => console.log(data), error => console.log(error));
    this.societe=new Societe();
    this.gotoList();
  }
  onSubmit()
{
  this.submitted=true;
  this.update();
}

gotoList()
{
  this.router.navigate['listerDepartement']
}
}
