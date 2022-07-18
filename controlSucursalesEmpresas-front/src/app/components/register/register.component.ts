import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CompanyModel } from 'src/app/models/company.model'
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  company: CompanyModel;
  repeatPass: String = '';
  timer: any = 0;

  constructor(private companyRest: CompanyRestService, private router: Router) {
    this.company = new CompanyModel('', '', '', '', '', '', '', '');
  }

  ngOnInit(): void { }

  async checkPassword() {
    clearTimeout(this.timer);
    this.timer = await setTimeout(() => {
      if (this.repeatPass != this.company.password) {
        Swal.fire({
          icon: 'warning',
          title: 'Las contraseñas no coinciden',
        });
        clearTimeout(this.timer);
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Las contraseñas coinciden',
        });
        clearTimeout(this.timer);
      }
    }, 1500);
  }

  register() {
    this.companyRest.register(this.company).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message + ', ya puedes iniciar sesión',
        });
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

}
