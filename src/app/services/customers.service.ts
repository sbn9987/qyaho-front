import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../models/User";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: "root",
})
export class CustomersService {
  API_URL: string = "http://localhost:3000/users/cus_list/";

  constructor(private http: HttpClient) {}

  getCustomers() {
    return this.http.get<User[]>(this.API_URL, httpOptions);
  }

  getCustomer(id: string) {
    return this.http.get<User>(this.API_URL + `${id}`, httpOptions);
  }

  addCustomer(user: User) {
    return this.http.post<User>(this.API_URL, user, httpOptions);
  }

  editCustomer(id: string, user: User) {
    return this.http.put<User>(this.API_URL + `${id}`, user, httpOptions).subscribe();
  }

  deleteCustomer(id: string) {
    return this.http.delete<User>(this.API_URL + `${id}`, httpOptions).subscribe();
  }
}
