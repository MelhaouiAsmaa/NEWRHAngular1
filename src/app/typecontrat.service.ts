import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeContrat } from './typecontrat';
@Injectable({
  providedIn: 'root'
})
export class TypecontratService {
  private baseUrl = 'http://localhost:8079/TypeContrat';
  private baseUrl1 = 'http://localhost:8079/TypeContratEmployee';
  constructor(private http: HttpClient) { }
  getTypeContratList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAll`);
  }
  deleteTypeContrat(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' })
  }

  createtypecontrat(typecontrat: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/Create`, typecontrat);
  }
  getTypeContrat(id: number) {
    return this.http.get(`${this.baseUrl}/GetType/${id}`);
  }
  updateTypeContrat(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/Update`, value);
  }
  getTypeContratListArchive(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllArchive`);
  }
  getdetail(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl1}/GetdetailCE/${id}`);
  }
  desarchive(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/dessarchiver/${id}`, { responseType: 'text' });
  }
}
