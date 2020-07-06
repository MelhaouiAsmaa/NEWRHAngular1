import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departement } from './departement';

const corsHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:8079'
});
@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  private baseUrl = 'http://localhost:8079/api/departement';
  private baseUrl1 = 'http://localhost:8079/api/equipe';
  private baseUrl2 = 'http://localhost:8079/api/responsable';
  constructor(private http: HttpClient) { }

  getDepartement(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getDepartement/${id}`);
  }

  createDepartement(employee: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/save`, employee);
  }

  updateDepartement(value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update`, value);
  }

  deleteDepartement(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }
  getEquipeDepartement(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl1}/getEquipeDepartement/${id}`);

  }
  getDepartementsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAll`);
  }
  getDepartementsArchiveList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllDeptArchive`);
  }
  desarchive(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/dessarchiver/${id}`, { responseType: 'text' });
  }
  getResponsableDepartement(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl2}/getResponsableDepartement/${id}`);

  }
  getEmployeesByDep(id): Observable<any> {
    return this.http.get(this.baseUrl + '/getEmpolyeesByDep/' + id);
  }
  getDepByName(name) {
    return this.http.get(this.baseUrl + '/getDepByName/' + name);
  }
}
