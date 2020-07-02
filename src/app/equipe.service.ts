import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const corsHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:8079'
});
@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  private baseUrl = 'http://localhost:8079/api/equipe';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: ban-types
  createEquipe(eq) {
    return this.http.post(this.baseUrl + '/save', eq);
  }

  getEquipesList(): Observable<any> {
    return this.http.get(this.baseUrl + '/getAll');
  }

  getAllArchivedequipes(): Observable<any> {
    return this.http.get(this.baseUrl + '/getArchived');
  }

  desarchiverequipe(id) {
    return this.http.put(this.baseUrl + '/desarchiver', id);
  }

  deleteEquipe(id) {
    return this.http.put(this.baseUrl + '/delete', id);
  }

  updateEquipe(eq) {
    return this.http.put(this.baseUrl + '/update', eq);
  }

  getEquipeById(id): Observable<any> {
    return this.http.get(this.baseUrl + '/getEquipe/' + id);
  }

  getDepartmentNameByEquipe(id) {
    return this.http.get(this.baseUrl + '/getDepNameByEquipe/' + id, { responseType: 'text' });
  }

  getRespoEquipe(id) {
    return this.http.get(this.baseUrl + '/getResponsableEquipe/' + id, { responseType: 'text' });
  }

  getEmployeesEquipe(id) {
    return this.http.get(this.baseUrl + '/getEmployeesEquipe/' + id);
  }
}
