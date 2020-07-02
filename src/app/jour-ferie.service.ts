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
export class JourFerieService {

  private baseUrl = 'http://localhost:8079/api/JourFerie';
  constructor(private http: HttpClient) { }

  createJourFerie(jourferie) {
    return this.http.post(this.baseUrl + '/save', jourferie);
  }
  getJourFerieById(jourferieId): Observable<any> {
    return this.http.get(this.baseUrl + '/getJourFerie/' + jourferieId);
  }
  getAlljourferies(): Observable<any> {
    return this.http.get(this.baseUrl + '/getAll');
  }
  updatejourferie(jourferie) {
    return this.http.put(this.baseUrl + '/update', jourferie);
  }
  deleteJourFerie(id) {
    return this.http.put(this.baseUrl + '/delete', id);
  }
}
