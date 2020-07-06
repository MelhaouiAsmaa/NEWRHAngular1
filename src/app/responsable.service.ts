import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ResponsableService {
  private baseUrl = 'http://localhost:8079/api/responsable';
  constructor(private http: HttpClient) { }
  createresponsable(responsable: Object): Observable<Object> {

    return this.http.post(`${this.baseUrl}/save`, responsable);
  }

  getAll(): Observable<any> {

    return this.http.get(`${this.baseUrl}/getAll`,)
  }
  getAllArchive(): Observable<any> {

    return this.http.get(`${this.baseUrl}/getAllArchive`,)
  }
  archive(respo: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/archiver`, respo);
  }

  desarchive(respo: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/desarchiver`, respo);
  }
  updateResponsable(value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update`, value);
  }
  getresponsable(id: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/getResponsable`, id);
  }
}
