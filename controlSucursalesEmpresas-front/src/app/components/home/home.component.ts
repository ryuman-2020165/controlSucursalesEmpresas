import { Component, OnInit } from '@angular/core';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token: any;
  companyData: any;

  constructor(private companyRest: CompanyRestService) {
  }

  ngOnInit(): void {
    this.token = this.companyRest.getToken();
    this.companyData = this.companyRest.getIdentity();
  }
}
