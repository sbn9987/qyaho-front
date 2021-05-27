import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../models/user";
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: "root",
})
export class EmployeesService {
  API_URL: string = "http://localhost:3000/users/test/";

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get<User[]>(this.API_URL, httpOptions);
  }

  getEmployee(id: string) {
    return this.http.get<User>(this.API_URL + `${id}`, httpOptions);
  }

  addEmployee(user: User) {
    return this.http.post<User>(this.API_URL, user, httpOptions);
  }

  editEmployee(id: string, user: User) {
    return this.http.put<User>(this.API_URL + `${id}`, user, httpOptions).subscribe();
  }

  deleteEmployee(id: string) {
    return this.http.delete<User>(this.API_URL + `${id}`, httpOptions).subscribe();
  }
}
