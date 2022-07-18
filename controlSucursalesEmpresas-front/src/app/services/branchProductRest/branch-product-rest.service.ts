import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CompanyRestService } from '../companyRest/company-rest.service';

@Injectable({
  providedIn: 'root'
})
export class BranchProductRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.companyRest.getToken(),
  });

  constructor(private http: HttpClient, private companyRest: CompanyRestService) { }

  addBranchProduct(params: {}) {
    return this.http.post(environment.baseUrl + 'branchProduct/addBranchProducts', params, {
      headers: this.httpOptions,
    });
  }

  sellBranchProduct(params: {}) {
    return this.http.post(environment.baseUrl + 'branchProduct/sellProduct', params, {
      headers: this.httpOptions,
    });
  }

  getBranchProducts(branchOfficeId: string) {
    return this.http.get(environment.baseUrl + 'branchProduct/getBranchProducts/' + branchOfficeId, {
      headers: this.httpOptions,
    });
  }

  getBranchProducts_OrderBySales(branchId: string) {
    return this.http.get(environment.baseUrl + 'branchProduct/getBranchProducts_OrderBySales/' + branchId, {
      headers: this.httpOptions,
    });
  }

  getBranchProduct(branchOfficeId: string, branchProductId: string) {
    return this.http.get(environment.baseUrl + 'branchProduct/getBranchProduct/' + branchOfficeId + '/' + branchProductId, {
      headers: this.httpOptions,
    });
  }
}
