import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyRestService } from '../services/companyRest/company-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private companyRest: CompanyRestService, public router: Router) { }

  canActivate() {
    if (this.companyRest.getIdentity().role === 'ADMIN') {
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }

}
