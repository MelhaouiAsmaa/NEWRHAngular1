import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChargeSocieteId } from './ChargeSocieteId';
@Injectable({
  providedIn: 'root'
})
export class ChargesocieteService {
  private baseUrl = 'http://localhost:8079/ChargeSociete';
  constructor(private http: HttpClient) { }
  createChargeSociete(charge: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create`, charge);
  }
  lister(): Observable<any> {
    return this.http.get(`${this.baseUrl}/lister`);
  }
  listerArchive(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listerarchive`);
  }
  archiver(id: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/archiver`, id);
  }


  desarchiver(id: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/desarchiver`, id);
  }

  get(id: any): Observable<any> {
    // console.log(id.contrat.id_typeC + id.employee.matricule +"" + id.date_Contrat);
    return this.http.post(`${this.baseUrl}/get`, id);

  }

  modifier(id: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/modifier`, id);
  }
  getReporting(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporting`);
  }
}
