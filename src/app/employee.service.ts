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

export class EmployeeService {
  private baseUrl = 'http://localhost:8079/api/employee';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: ban-types
  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(this.baseUrl + '/save', employee);
  }

  getEmployeesList(): Observable<any> {
    return this.http.get(this.baseUrl + '/getAll');
  }

  getArchivedEmployeesList(): Observable<any> {
    return this.http.get(this.baseUrl + '/getArchived');
  }

  // tslint:disable-next-line: ban-types
  updateEmployee(employee) {

    return this.http.put(this.baseUrl + '/update', employee);
  }

  deleteEmployee(id) {
    return this.http.put(this.baseUrl + '/delete', id);
  }

  desarchiverEmployee(id) {
    return this.http.put(this.baseUrl + '/desarchiver', id);
  }

  getEmployee(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/getEmployee/' + id);
  }

  getLatestEmployee(): Observable<any> {
    return this.http.get(this.baseUrl + '/getLatestEmployee');
  }
  getAllEmployee(): Observable<any> {
    return this.http.get(this.baseUrl + '/getAll');
  }

  getActualFunction(id) {
    return this.http.get(this.baseUrl + '/getActualFonctionEmployee/' + id);
  }

  getActualEquipe(id) {
    return this.http.get(this.baseUrl + '/getActualEquipeEmployee/' + id);
  }

  getEmployeeFonctions(id) {
    return this.http.get(this.baseUrl + '/getFonctionsByEmploye/' + id);
  }

  getEquipeByFonctionsEmployee(id: number, datedeb, datefin) {
    return this.http.get(this.baseUrl + '/getEquipeByFonctionsEmployee/' + id + '/' + datedeb + '/' + datefin);
  }

  getActualDepartment(id) {
    return this.http.get(this.baseUrl + '/getActualDepEmployee/' + id);
  }

  getCongeByEmployee(id) {
    return this.http.get(this.baseUrl + '/getCongeByEmployee/' + id);
  }

  getChargeByEmployee(id) {
    return this.http.get(this.baseUrl + '/getChargeByEmployee/' + id);
  }
  getEmployeeUser(id) {
    return this.http.get(this.baseUrl + '/getEmployeeUser/' + id);
  }
  getActualContrat(id) {
    return this.http.get(this.baseUrl + '/getActualContrat/' + id);
  }
}

// export class EmployeeService {
//   private baseUrl = 'http://localhost:8120/api/v1/employees';

//   constructor(private http: HttpClient) { }

//   getEmployee(id: number): Observable<any> {
//     return this.http.get(`${this.baseUrl}/${id}` , { responseType: 'text' });
//   }

//   // tslint:disable-next-line: ban-types
//   createEmployee(employee: Object): Observable<Object> {
//     return this.http.post(`${this.baseUrl}`, employee , { responseType: 'text' });
//   }

//   // tslint:disable-next-line: ban-types
  // updateEmployee(id: number, value: any): Observable<Object> {
  //   return this.http.put(`${this.baseUrl}/${id}`, value , { responseType: 'text' });
  // }

  // deleteEmployee(id: number): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  // }

//   getEmployeesList(): Observable<any> {
//     return this.http.get(this.baseUrl);
//   }
// }
