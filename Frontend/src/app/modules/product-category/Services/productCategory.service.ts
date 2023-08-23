import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { productCategory } from "../Models/productCategory.model";


@Injectable({
    providedIn: 'root'
})
export class productCategoryService {


    baseUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }



    getActiveProductCategories(): Observable<productCategory[]> {
        return this.http.get<productCategory[]>(this.baseUrl + '/productCategory/active');
    }
    getArchivedProductCategories(): Observable<productCategory[]> {
        return this.http.get<productCategory[]>(this.baseUrl + '/productCategory/archived');
    }

    save(id: string | null, productCategory: productCategory): Observable<productCategory> {
        if (id) {
            return this.update(id, productCategory);
        }
        return this.create(productCategory);
    }
    create(productCategory: productCategory): Observable<productCategory> {
        let url = this.baseUrl + '/productCategory';
        return this.http.post<productCategory>(url, productCategory);
    }

    update(id: string, productCategory: productCategory): Observable<productCategory> {
        let url = `${this.baseUrl}/productCategory/${id}`;
        return this.http.put<productCategory>(url, productCategory);
    }
    delete(id: string): Observable<boolean> {
        let url = `${this.baseUrl}/productCategory/${id}`;
        return this.http.delete<boolean>(url);
    }

    findProductCategoryById(id: string): Observable<productCategory> {
        let url = `${this.baseUrl}/productCategory/${id}`;
        return this.http.get<productCategory>(url);
    }

    searchProductCategoryByNameActive(productCategoryName: string): Observable<productCategory[]> {
        const params = { productCategoryName: productCategoryName };
        return this.http.get<productCategory[]>(this.baseUrl + "/productCategory/searchactive", { params });
    }
    searchProductCategoryByNameArchived(productCategoryName: string): Observable<productCategory[]> {
        const params = { productCategoryName: productCategoryName };
        return this.http.get<productCategory[]>(this.baseUrl + "/productCategory/searcharchived", { params });
    }


    deactivateProductCategory(id: string): Observable<void> {
        const url = `${this.baseUrl}/productCategory/deactivate/${id}`;
        return this.http.patch<void>(url, null);
    }

    ActivateProductCategory(id: string): Observable<void> {
        const url = `${this.baseUrl}/productCategory/activate/${id}`;
        return this.http.patch<void>(url, null);
    }



}