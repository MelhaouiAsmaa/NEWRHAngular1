import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChargedepartementService {

  private baseUrl = 'http://localhost:8079/ChargeDepartement';
  constructor(private http: HttpClient) { }
  createChargeDepartement(charge: Object) {
    return this.http.post(`${this.baseUrl}/create`, charge);
  }
  getChargeDepartementList() {
    return this.http.get(`${this.baseUrl}/getAll`);
  }
  getChargeDepartementListArchive(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllArchive`);
  }
  archive(id: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/archive`, id);
  }
  desarchive(id: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/desarchive`, id);
  }
  getChargeDepartement(id: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/getchargedep`, id);
  }

  getReporting(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporting`);
  }
}
