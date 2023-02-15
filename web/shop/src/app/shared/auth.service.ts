import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() 
  {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) { }

  login(email: string, pass: string) {
    let endpoint = 'login';
    let url = environment.apihost + endpoint;
    this.loggedIn.next(true);

    let authData = {
      email: email,
      password: pass
    };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    let httpOption = {
      headers: headers
    };
    return this.http.post<any>(url, authData, httpOption);
  }

  logout() 
  {
    let endpoint = 'logout';
    let url = environment.apihost + endpoint;
    this.loggedIn.next(false);

    let token = localStorage.getItem('token');
    
    let headers = new HttpHeaders
    ({
      'Content-Type': 'applicaton/json',
      'Authorization': 'Bearer ' + token
    });

    let httpOption = {
      headers: headers
    };
    return this.http.post<any>(url, "", httpOption);
  }
}
