import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { manufacturer } from "../Models/manufacturer.model";


@Injectable({
    providedIn: 'root'
})
export class manufacturerService {


    baseUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }



    getActiveManufacturers(): Observable<manufacturer[]> {
        return this.http.get<manufacturer[]>(this.baseUrl + '/manufacturer/active');
    }
    getArchivedManufacturers(): Observable<manufacturer[]> {
        return this.http.get<manufacturer[]>(this.baseUrl + '/manufacturer/archived');
    }

    save(id: string | null, manufacturer: manufacturer): Observable<manufacturer> {
        if (id) {
            return this.update(id, manufacturer);
        }
        return this.create(manufacturer);
    }
    create(manufacturer: manufacturer): Observable<manufacturer> {
        let url = this.baseUrl + '/manufacturer';
        return this.http.post<manufacturer>(url, manufacturer);
    }

    update(id: string, manufacturer: manufacturer): Observable<manufacturer> {
        let url = `${this.baseUrl}/manufacturer/${id}`;
        return this.http.put<manufacturer>(url, manufacturer);
    }
    delete(id: string): Observable<boolean> {
        let url = `${this.baseUrl}/manufacturer/${id}`;
        return this.http.delete<boolean>(url);
    }

    findManufacturerById(id: string): Observable<manufacturer> {
        let url = `${this.baseUrl}/manufacturer/${id}`;
        return this.http.get<manufacturer>(url);
    }

    searchManufacturerByNameActive(manufacturerName: string): Observable<manufacturer[]> {
        const params = { manufacturerName: manufacturerName };
        return this.http.get<manufacturer[]>(this.baseUrl + "/manufacturer/searchactive", { params });
    }
    searchManufacturerByNameArchived(manufacturerName: string): Observable<manufacturer[]> {
        const params = { manufacturerName: manufacturerName };
        return this.http.get<manufacturer[]>(this.baseUrl + "/manufacturer/searcharchived", { params });
    }

    deactivateManufacturer(id: string): Observable<void> {
        const url = `${this.baseUrl}/manufacturer/deactivate/${id}`;
        return this.http.patch<void>(url, null);
    }

    ActivateManufacturer(id: string): Observable<void> {
        const url = `${this.baseUrl}/manufacturer/activate/${id}`;
        return this.http.patch<void>(url, null);
    }



}