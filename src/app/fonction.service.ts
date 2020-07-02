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
export class FonctionService {

  private baseUrl = 'http://localhost:8079/api/fonction';
  constructor(private http: HttpClient) { }

  createFonction(fct) {
    return this.http.post(this.baseUrl + '/save', fct);
  }
  getFunctionById(fctId): Observable<any> {
    return this.http.get(this.baseUrl + '/getFonction/' + fctId);
  }
  getAllfcts(): Observable<any> {
    return this.http.get(this.baseUrl + '/getAll');
  }

  getAllArchivedfcts(): Observable<any> {
    return this.http.get(this.baseUrl + '/getArchived');
  }

  updateFct(fct) {
    return this.http.put(this.baseUrl + '/update', fct);
  }
  deleteFct(id) {
    return this.http.put(this.baseUrl + '/delete', id);
  }

  desarchiverFct(id) {
    return this.http.put(this.baseUrl + '/desarchiver', id);
  }

  getEmployeesNumbers(id) {
    return this.http.get(this.baseUrl + '/getEmployeesNumb/' + id);
  }

  getEmployeestotalNumber(id) {
    return this.http.get(this.baseUrl + '/getEmployeesNumbtotal/' + id);
  }

  getEmployeesByFunction(id) {
    return this.http.get(this.baseUrl + '/getListEmployees/' + id);
  }
}
