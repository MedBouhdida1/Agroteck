import { HttpClient, HttpParams } from "@angular/common/http";
import { airport } from "../models/airport.model";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Page } from "app/shared/models";
import { environment } from "environments/environment";


@Injectable({
  providedIn: 'root'
})
export class airportService {


  baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }



  getActiveAirports(): Observable<airport[]> {
    return this.http.get<airport[]>(this.baseUrl + '/airport/active');
  }
  getArchivedAirports(): Observable<airport[]> {
    return this.http.get<airport[]>(this.baseUrl + '/airport/archived');
  }

  save(id: string | null, airport: airport): Observable<airport> {
    if (id) {
      return this.update(id, airport);
    }
    return this.create(airport);
  }
  create(airport: airport): Observable<airport> {
    let url = this.baseUrl + '/airport';
    return this.http.post<airport>(url, airport);
  }

  update(id: string, airport: airport): Observable<airport> {
    let url = `${this.baseUrl}/airport/${id}`;
    return this.http.put<airport>(url, airport);
  }
  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl}/airport/${id}`;
    return this.http.delete<boolean>(url);
  }

  findAirportById(id: string): Observable<airport> {
    let url = `${this.baseUrl}/airport/${id}`;
    return this.http.get<airport>(url);
  }

  searchAirportByNameActive(airportName: string): Observable<airport[]> {
    const params = { airportName: airportName };
    return this.http.get<airport[]>(this.baseUrl + "/airport/searchactive", { params });
  }
  searchAirportByNameArchived(airportName: string): Observable<airport[]> {
    const params = { airportName: airportName };
    return this.http.get<airport[]>(this.baseUrl + "/airport/searcharchived", { params });
  }


  deactivateAirport(id: string): Observable<void> {
    const url = `${this.baseUrl}/airport/deactivate/${id}`;
    return this.http.patch<void>(url, null);
  }

  ActivateAirport(id: string): Observable<void> {
    const url = `${this.baseUrl}/airport/activate/${id}`;
    return this.http.patch<void>(url, null);
  }



}