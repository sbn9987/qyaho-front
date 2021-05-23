import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Login, UserNoPW } from '../models/User';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user:User
 
  
  constructor(private http: HttpClient) { }

  registerUser(user):Observable<any> {
    const registerUrl = 'http://localhost:3000/users/register';
    return this.http.post(registerUrl, user, httpOptions);
  }

  authenticateUser(login): Observable<any> {
    const loginUrl = 'http://localhost:3000/users/authenticate';
    return this.http.post<Login>(loginUrl, login, httpOptions);
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    
  }

}
