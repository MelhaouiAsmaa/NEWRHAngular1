import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContratId } from './contrat-id';
@Injectable({
  providedIn: 'root'
})
export class ContratService {
  private baseUrl = 'http://localhost:8079/TypeContratEmployee';

  constructor(private http: HttpClient) { }
  getContratList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAll`);
  }
  createContrat(contrat: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create`, contrat);
  }
  deleteContrat(value: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/delete`, value);
  }
  essai(id: ContratId): Observable<any> {
    return this.http.delete(`${this.baseUrl}/essai/${id}`, { responseType: 'text' });

  }
  getContratArchiveList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAllArchive`);
  }
  updateContratEmployee(value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/Update`, value);
  }
  getContrat(id: any): Observable<any> {
    // console.log(id.contrat.id_typeC + id.employee.matricule +"" + id.date_Contrat);
    return this.http.post(`${this.baseUrl}/Getcontrat`, id);

  }

  desarchive(id: Object): Observable<any> {
    return this.http.put(`${this.baseUrl}/dessarchiver`, id);
  }

}
