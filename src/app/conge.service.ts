import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// tslint:disable-next-line: max-line-length
const corsHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:8079'
});
@Injectable({
  providedIn: 'root'
})

export class CongeServiceService {

  private baseUrl = 'http://localhost:8079/api/conge';
  constructor(private http: HttpClient) { }

  createConge(conge) {
    return this.http.post(this.baseUrl + '/save', conge);
  }

  updateConge(conge) {
    return this.http.put(this.baseUrl + '/update', conge);
  }

  getCongeList() {
    return this.http.get(this.baseUrl + '/getAll');
  }

  getCongeById(id) {
    return this.http.get(this.baseUrl + '/getConge' + id);
  }
}
