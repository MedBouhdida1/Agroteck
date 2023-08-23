import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { reason } from "../models/reason.model";

@Injectable({
    providedIn: 'root'
})
export class reasonService {


    baseUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }



    getActiveReasons(): Observable<reason[]> {
        return this.http.get<reason[]>(this.baseUrl + '/reason/active');
    }
    getArchivedReasons(): Observable<reason[]> {
        return this.http.get<reason[]>(this.baseUrl + '/reason/archived');
    }

    save(id: string | null, reason: reason): Observable<reason> {
        if (id) {
            return this.update(id, reason);
        }
        return this.create(reason);
    }
    create(reason: reason): Observable<reason> {
        let url = this.baseUrl + '/reason';
        return this.http.post<reason>(url, reason);
    }

    update(id: string, reason: reason): Observable<reason> {
        let url = `${this.baseUrl}/reason/${id}`;
        return this.http.put<reason>(url, reason);
    }
    delete(id: string): Observable<boolean> {
        let url = `${this.baseUrl}/reason/${id}`;
        return this.http.delete<boolean>(url);
    }

    findReasonById(id: string): Observable<reason> {
        let url = `${this.baseUrl}/reason/${id}`;
        return this.http.get<reason>(url);
    }

    searchReasonByNameActive(reasonName: string): Observable<reason[]> {
        const params = { reasonName: reasonName };
        return this.http.get<reason[]>(this.baseUrl + "/reason/searchactive", { params });
    }
    searchReasonByNameArchived(reasonName: string): Observable<reason[]> {
        const params = { reasonName: reasonName };
        return this.http.get<reason[]>(this.baseUrl + "/reason/searcharchived", { params });
    }


    deactivateReason(id: string): Observable<void> {
        const url = `${this.baseUrl}/reason/deactivate/${id}`;
        return this.http.patch<void>(url, null);
    }

    ActivateReason(id: string): Observable<void> {
        const url = `${this.baseUrl}/reason/activate/${id}`;
        return this.http.patch<void>(url, null);
    }
}