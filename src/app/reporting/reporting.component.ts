import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import {ChargedepartementService} from '../chargedepartement.service';

import {ReportingDept} from '../reportingdept';
import{Observable} from  'rxjs';
import { ChargesocieteService } from '../chargesociete.service';
import { EmployeeCharge } from '../employee-charge';
import { EmployeeChargeService } from '../employee-charge.service';


@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',

  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
reportingdept:Observable<ReportingDept[]>;
reportingsociete:Observable<ReportingDept[]>;
  constructor(private chargedepartementservice:ChargedepartementService,private chargesocieteservice: ChargesocieteService,private Chargeemployee:EmployeeChargeService) { }

  ngOnInit(): void {
   
    let datap=[];
  let y=0;
  let x=0;
  let label;
   this.chargedepartementservice.getReporting().subscribe(
    data => {
      
      for(let i of  data)
  {
    y=i.montant;
    label=i.mois;
    datap.push({label,y});

  }
    }
   )
 
 
  
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Charges Départements"
      },
      axisY: {
        title: "MAD",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC"
      },
      axisX: {
        title: "MOIS",
        titleFontColor: "#C0504E",
		lineColor: "#C0504E",
		labelFontColor: "#C0504E",
		tickColor: "#C0504E"
      },
      data: [{
        type: "column",
        dataPoints: datap
      }]
    });
      
    chart.render();
    let datap2=[];

this.chargesocieteservice.getReporting().subscribe(
  data => {
    
    for(let i of  data)
{
  y=i.montant;
  label=i.mois;
  datap2.push({label,y});

}
  }
 )


    let chart2 = new CanvasJS.Chart("chartContainer1", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Charges Sociétés"
      },
      axisY: {
        title: "MAD",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC"
      },
      axisX: {
        title: "MOIS",
        titleFontColor: "#C0504E",
		lineColor: "#C0504E",
		labelFontColor: "#C0504E",
		tickColor: "#C0504E"
      },
      data: [{
        type: "column",
        dataPoints :datap2
      }]
    });
      
    chart2.render();
    let datap3=[];

    this.Chargeemployee.getReporting().subscribe(
      data => {
        
        for(let i of  data)
    {
      y=i.montant;
      label=i.mois;
      datap3.push({label,y});
    
    }
      }
     )
    
    
        let chart3 = new CanvasJS.Chart("chartContainer2", {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "Charges Employés"
          },
          axisY: {
            title: "MAD",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC"
          },
          axisX: {
            title: "MOIS",
            titleFontColor: "#C0504E",
        lineColor: "#C0504E",
        labelFontColor: "#C0504E",
        tickColor: "#C0504E"
          },
          data: [{
            type: "column",
            dataPoints :datap3
          }]
        });
          
        chart3.render();
      
  }
  
  

}
