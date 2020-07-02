import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const corsHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:8079'
});
@Injectable({
  providedIn: 'root'
})
export class EmployeeEquipeService {
  private baseUrl = 'http://localhost:8079/api/emloyeeequipe';

  constructor(private http: HttpClient) { }

  createEmployeeEquipe(empeq) {
    console.log(empeq);
    return this.http.post(this.baseUrl + '/save', empeq);
  }

  updateEmployeeEquipe(empeq) {
    return this.http.put(this.baseUrl + '/update', empeq);
  }

  getEmployeeEquipe(empeqid) {
    return this.http.post(this.baseUrl + '/getEmployeeEquipe', empeqid);
  }

  getByEmployeeandEquipe(idemp, ideq) {
    return this.http.get(this.baseUrl + '/findByEmployeeandEquipe/' + idemp + '/' + ideq);
  }

  deleteemployeeequipe(idempeq) {
    return this.http.post(this.baseUrl + '/delete', idempeq);
  }
}
