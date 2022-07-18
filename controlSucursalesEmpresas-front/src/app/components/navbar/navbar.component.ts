import { Component, OnInit } from '@angular/core';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token: any;
  companyData: any;

  constructor(private companyRest: CompanyRestService) {
  }

  ngOnInit(): void {
    this.token = this.companyRest.getToken();
    this.companyData = this.companyRest.getIdentity();
  }

  logOut() {
    localStorage.clear();
  }

}
