import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { seaport } from "../models/seaport.model";


@Injectable({
  providedIn: 'root'
})
export class seaportService {


  baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }



  getActiveSeaports(): Observable<seaport[]> {
    return this.http.get<seaport[]>(this.baseUrl + '/seaport/active');
  }
  getArchivedSeaports(): Observable<seaport[]> {
    return this.http.get<seaport[]>(this.baseUrl + '/seaport/archived');
  }

  save(id: string | null, seaport: seaport): Observable<seaport> {
    if (id) {
      return this.update(id, seaport);
    }
    return this.create(seaport);
  }
  create(seaport: seaport): Observable<seaport> {
    let url = this.baseUrl + '/seaport';
    return this.http.post<seaport>(url, seaport);
  }

  update(id: string, seaport: seaport): Observable<seaport> {
    let url = `${this.baseUrl}/seaport/${id}`;
    return this.http.put<seaport>(url, seaport);
  }
  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl}/seaport/${id}`;
    return this.http.delete<boolean>(url);
  }

  findSeaportById(id: string): Observable<seaport> {
    let url = `${this.baseUrl}/seaport/${id}`;
    return this.http.get<seaport>(url);
  }

  searchSeaportByNameActive(seaPortName: string): Observable<seaport[]> {
    const params = { seaPortName: seaPortName };
    return this.http.get<seaport[]>(this.baseUrl + "/seaport/searchactive", { params });
  }
  searchSeaportByNameArchived(seaPortName: string): Observable<seaport[]> {
    const params = { seaPortName: seaPortName };
    return this.http.get<seaport[]>(this.baseUrl + "/seaport/searcharchived", { params });
  }

  deactivateSeaport(id: string): Observable<void> {
    const url = `${this.baseUrl}/seaport/deactivate/${id}`;
    return this.http.patch<void>(url, null);
  }

  ActivateSeaport(id: string): Observable<void> {
    const url = `${this.baseUrl}/seaport/activate/${id}`;
    return this.http.patch<void>(url, null);
  }



}