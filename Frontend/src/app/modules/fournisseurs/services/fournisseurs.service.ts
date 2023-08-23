import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Fournisseur } from "../models/fournisseur.model";
import { Page } from "app/shared/models";
import { airport } from "app/modules/airport/models/airport.model";

@Injectable({
  providedIn: "root",
})
export class FournisseursService {
  constructor(private http: HttpClient) { }

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, fournisseur: Fournisseur): Observable<Fournisseur> {
    if (id) {
      return this.update(id, fournisseur);
    }
    return this.create(fournisseur);
  }

  create(fournisseur: Fournisseur): Observable<Fournisseur> {
    let url = this.baseUrl() + '/fournisseur';
    return this.http.post<Fournisseur>(url, fournisseur);
  }

  update(id: string, fournisseur: Fournisseur): Observable<Fournisseur> {
    let url = `${this.baseUrl()}/fournisseur/${id}`;
    return this.http.put<Fournisseur>(url, fournisseur);
  }

  importCSV(formData: FormData): Observable<void> {
    let url = this.baseUrl() + "/fournisseur/import";

    let headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    const options = { headers };

    return this.http.post<void>(url, formData, options);
  }

  findById(id: string): Observable<Fournisseur> {
    let url = `${this.baseUrl()}/fournisseur/${id}`;
    return this.http.get<Fournisseur>(url);
  }

  findAll(): Observable<Array<Fournisseur>> {
    let url = this.baseUrl() + '/fournisseur';
    return this.http.get<Array<Fournisseur>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Fournisseur>> {
    let url = this.baseUrl() + "/fournisseur/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Fournisseur>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/fournisseur/${id}`;
    return this.http.delete<boolean>(url);
  }

  downloadCSVTemplate(): Observable<any> {
    let url = `${this.baseUrl()}/fournisseur/csv-template`;
    return this.http.get(url, { responseType: "blob" });
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/fournisseur/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/fournisseur/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Fournisseur>> {
    let url = this.baseUrl() + "/fournisseur/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Fournisseur>>(url, { params });
  }
}
