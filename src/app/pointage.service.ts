import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointageService {

  private baseUrl = 'http://localhost:8079/Pointage';
  constructor(private http: HttpClient) { }
  createPointage(pointage: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create`, pointage);
  }
  getallpointage(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAll`);
  }
  getallpointagearchive(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllArchive`);
  }
  archivepointage(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/archive/${id}`);
  }
  desarchiver(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/desarchive/${id}`);
  }
  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getbyid/${id}`);
  }
  UpdatePointage(value: Object): Observable<any> {
    return this.http.put(`${this.baseUrl}/updatePointage`, value);
  }
}
