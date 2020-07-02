import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocieteService {
  private baseUrl = 'http://localhost:8079/Societe';
  constructor(private http: HttpClient) { }
  createtypecontrat(societe: Object): Observable<Object> {
    console.log("ccc:" + societe);
    return this.http.post(`${this.baseUrl}/save`, societe);
  }
  getSocieteList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/lister`);
  }
  getSocieteListArchive(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listerarchive`);
  }
  archive(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/archive/${id}`, { responseType: 'text' });
  }
  desarchive(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/desarchive/${id}`, { responseType: 'text' });
  }
  getsociete(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getsociete/${id}`);
  }
  update(societe: Object): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, societe);
  }
}
