import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cus_num } from "../models/cus.num";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: "root",
})
export class CustomerNumService {
  API_URL: string = "http://localhost:3000/cusnum/cus_nums/";

  constructor(private http: HttpClient) {}

  getCustomerNums() {
    return this.http.get<Cus_num[]>(this.API_URL, httpOptions);
  }

  getCustomerNum(id: string) {
    return this.http.get<Cus_num>(this.API_URL + `${id}`, httpOptions);
  }

  addCustomerNum(Cus_num: Cus_num) {
    return this.http.post<Cus_num>(this.API_URL, Cus_num, httpOptions);
  }

  editCustomerNum(id: string, Cus_num: Cus_num) {
    return this.http.put<Cus_num>(this.API_URL + `${id}`, Cus_num, httpOptions).subscribe();
  }

  deleteCustomerNum(id: string) {
    return this.http.delete<Cus_num>(this.API_URL + `${id}`, httpOptions).subscribe();
  }
}
