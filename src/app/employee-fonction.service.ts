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
export class EmployeeFonctionService {

  private baseUrl = 'http://localhost:8079/api/Employeefonction';
  constructor(private http: HttpClient) { }

  createEmployeeFonction(empfct): Observable<any> {
    return this.http.post(this.baseUrl + '/save', empfct);
  }
  updateEmployeeFonction(empfct) {
    return this.http.put(this.baseUrl + '/update', empfct);
  }

  getEmployeeFonction(id) {
    return this.http.post(this.baseUrl + '/getEmployeeFonction', id);
  }

  deleteEmployeeFonction(id) {
    return this.http.post(this.baseUrl + '/delete', id);
  }


}
