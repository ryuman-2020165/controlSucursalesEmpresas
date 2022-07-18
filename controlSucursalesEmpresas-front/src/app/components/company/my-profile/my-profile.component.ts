import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/models/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  companyGetId: any;
  company: any;

  constructor(private companyRest: CompanyRestService) { }

  ngOnInit(): void {
    this.myCompany();
  }

  myCompany() {
    this.companyRest.myCompany().subscribe({
      next: (res: any) => {
        this.companyGetId = res.company;
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getCompany() {
    this.companyRest.myCompany().subscribe({
      next: (res: any) => {
        this.company = res.company;
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  updateProfile() {
    this.companyRest.updateProfile(this.company).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.myCompany();
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  deleteProfile() {
    this.companyRest.deleteProfile().subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
    localStorage.clear();
  }

}
