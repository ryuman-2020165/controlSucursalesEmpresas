import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CompanyRestService } from '../companyRest/company-rest.service';

@Injectable({
  providedIn: 'root'
})
export class BranchOfficeRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.companyRest.getToken(),
  });

  constructor(private http: HttpClient, private companyRest: CompanyRestService) { }

  addBranchOffice(params: {}) {
    return this.http.post(environment.baseUrl + 'branchOffice/addBranchOffice', params, {
      headers: this.httpOptions,
    });
  }

  getBranchOffices() {
    return this.http.get(environment.baseUrl + 'branchOffice/getBranchOffices', {
      headers: this.httpOptions,
    });
  }

  getBranchOffice(id: string) {
    return this.http.get(environment.baseUrl + 'branchOffice/getBranchOffice/' + id, {
      headers: this.httpOptions,
    });
  }

  updateBranchOffice(params: {}, id: string) {
    return this.http.put(
      environment.baseUrl + 'branchOffice/updateBranchOffice/' + id,
      params,
      { headers: this.httpOptions }
    );
  }

  deleteBranchOffice(id: string) {
    return this.http.delete(environment.baseUrl + 'branchOffice/deleteBranchOffice/' + id, {
      headers: this.httpOptions,
    });
  }
}
