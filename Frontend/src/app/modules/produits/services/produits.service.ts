import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Produit } from "../models/produit.model";
import { Page } from "app/shared/models";

@Injectable({
  providedIn: "root",
})
export class ProduitsService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, produit: Produit): Observable<Produit> {
    if (id) {
      return this.update(id, produit);
    }
    return this.create(produit);
  }

  create(produit: Produit): Observable<Produit> {
    let url = this.baseUrl()+'/produit';
    return this.http.post<Produit>(url, produit);
  }

  update(id: string, produit: Produit): Observable<Produit> {
    let url = `${this.baseUrl()}/produit/${id}`;
    return this.http.put<Produit>(url, produit);
  }

  importCSV(formData: FormData): Observable<void> {
    let url = this.baseUrl() + "/produit/import";

    let headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    const options = { headers };

    return this.http.post<void>(url, formData, options);
  }

  findById(id: string): Observable<Produit> {
    let url = `${this.baseUrl()}/produit/${id}`;
    return this.http.get<Produit>(url);
  }

  findAll(): Observable<Array<Produit>> {
    let url = this.baseUrl()+'/produit';
    return this.http.get<Array<Produit>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Produit>> {
    let url = this.baseUrl() + "/produit/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Produit>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/produit/${id}`;
    return this.http.delete<boolean>(url);
  }

  downloadCSVTemplate(): Observable<any> {
    let url = `${this.baseUrl()}/produit/csv-template`;
    return this.http.get(url, { responseType: "blob" });
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/produit/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/produit/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Produit>> {
    let url = this.baseUrl() + "/produit/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Produit>>(url, { params });
  }
}
