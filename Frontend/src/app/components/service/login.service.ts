import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(
    private http: HttpClient,
  ) { }
  baseUrl = 'http://localhost:8080';;


  requestHeader = new HttpHeaders({ 'No-Auth': 'True' })


  public signin(loginData: any) {
    return this.http.post(this.baseUrl + "/authenticate", loginData, { headers: this.requestHeader });
  }


}
