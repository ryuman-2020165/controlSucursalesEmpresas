import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CompanyRestService } from '../companyRest/company-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ProductRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.companyRest.getToken(),
  });

  constructor(private http: HttpClient, private companyRest: CompanyRestService) { }

  addProduct(params: {}) {
    return this.http.post(environment.baseUrl + 'product/addProduct', params, {
      headers: this.httpOptions,
    });
  }

  getProducts() {
    return this.http.get(environment.baseUrl + 'product/getProducts', {
      headers: this.httpOptions,
    });
  }

  getProduct(id: string) {
    return this.http.get(environment.baseUrl + 'product/getProduct/' + id, {
      headers: this.httpOptions,
    });
  }

  updateProduct(params: {}, id: string) {
    return this.http.put(
      environment.baseUrl + 'product/updateProduct/' + id,
      params,
      { headers: this.httpOptions }
    );
  }

  deleteProduct(id: string) {
    return this.http.delete(environment.baseUrl + 'product/deleteProduct/' + id, {
      headers: this.httpOptions,
    });
  }

  getProducts_OrderByStockAsc() {
    return this.http.get(environment.baseUrl + 'product/getProducts_OrderByStockAsc', {
      headers: this.httpOptions,
    });
  }
  
  getProducts_OrderByStockDesc() {
    return this.http.get(environment.baseUrl + 'product/getProducts_OrderByStockDesc', {
      headers: this.httpOptions,
    });
  }

  getProducts_OrderByProductNameAsc() {
    return this.http.get(environment.baseUrl + 'product/getProducts_OrderByProductNameAsc', {
      headers: this.httpOptions,
    });
  }

  getProducts_OrderByProductNameDesc() {
    return this.http.get(environment.baseUrl + 'product/getProducts_OrderByProductNameDesc', {
      headers: this.httpOptions,
    });
  }

  getProducts_OrderByProductProviderAsc() {
    return this.http.get(environment.baseUrl + 'product/getProducts_OrderByProductProviderAsc', {
      headers: this.httpOptions,
    });
  }

  getProducts_OrderByProductProviderDesc() {
    return this.http.get(environment.baseUrl + 'product/getProducts_OrderByProductProviderDesc', {
      headers: this.httpOptions,
    });
  }
}
