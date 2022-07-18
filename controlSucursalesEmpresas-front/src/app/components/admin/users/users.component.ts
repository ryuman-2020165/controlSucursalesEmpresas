import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/models/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  company: CompanyModel
  companies: any;
  companyGetId: any;

  constructor(private companyRest: CompanyRestService) {
    this.company = new CompanyModel('', '', '', '', '', '', '', '')
  }

  ngOnInit(): void {
    this.getUsersAdmin();
  }

  addUserAdmin(addUserForm: any) {
    this.companyRest.addUserAdmin(this.company).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.getUsersAdmin();
        addUserForm.reset();
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getUsersAdmin() {
    this.companyRest.getUsersAdmin().subscribe({
      next: (res: any) => {
        this.companies = res.companies;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getUserAdmin(id: string) {
    this.companyRest.getUserAdmin(id).subscribe({
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

  updateUserAdmin() {
    this.companyGetId.password = undefined;
    this.companyRest.updateUserAdmin(this.companyGetId, this.companyGetId._id).subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: res.message,
          });
          this.getUsersAdmin();
        },
        error: (err) => {
          Swal.fire({
            icon: 'warning',
            title: err.error.message || err.error,
          });
        },
      });
  }

  deleteUserAdmin(id: string) {
    this.companyRest.deleteUserAdmin(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.getUsersAdmin();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

}
