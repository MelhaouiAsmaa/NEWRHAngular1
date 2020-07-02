import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const corsHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:8079'
});
@Injectable({
  providedIn: 'root'
})
export class EmployeeChargeService {
  private baseUrl = 'http://localhost:8079/api/emloyeecharge';

  constructor(private http: HttpClient) { }

  createEmployeeCharge(empcharge) {
    console.log(empcharge);
    return this.http.post(this.baseUrl + '/save', empcharge);
  }

  updateEmployeeCharge(empcharge) {
    return this.http.put(this.baseUrl + '/update', empcharge);
  }

  getEmployeeCharge(empchargeid) {
    return this.http.post(this.baseUrl + '/getChargeEmployee', empchargeid);
  }

  deleteemployeeCharge(idempcharge) {
    return this.http.post(this.baseUrl + '/delete', idempcharge);
  }

  getReporting(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporting`);
  }
}
