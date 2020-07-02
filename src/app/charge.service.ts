import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const corsHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:8079'
});

@Injectable({
  providedIn: 'root'
})
export class ChargeService {

  private baseUrl = 'http://localhost:8079/api/charge';
  constructor(private http: HttpClient) { }


  getChargeById(chargeId): Observable<any> {
    return this.http.get(this.baseUrl + '/getCharge/' + chargeId);
  }
  getAllcharges() {
    return this.http.get(this.baseUrl + '/getAll');
  }
  updatecharge(charge) {
    return this.http.put(this.baseUrl + '/update', charge);
  }
  getChargesArchive(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllArchive`);
  }
  archive(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/archive/${id}`);
  }

  desarchive(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/desarchive/${id}`);
  }
  createCharge(charge: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create`, charge);
  }
  getCharges(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAll`);
  }
  getCharge(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getcharge/${id}`);
  }
  updateCharge(value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update`, value);
  }
}
