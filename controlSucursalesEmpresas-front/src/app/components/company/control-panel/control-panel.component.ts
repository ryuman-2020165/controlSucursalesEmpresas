import { Component, OnInit } from '@angular/core';
import { ProductRestService } from 'src/app/services/productRest/product-rest.service';
import { BranchOfficeRestService } from 'src/app/services/branchOfficeRest/branch-office-rest.service';
import { BranchProductRestService } from 'src/app/services/branchProductRest/branch-product-rest.service';
import { ProductModel } from 'src/app/models/product.model';
import { BranchOfficeModel } from 'src/app/models/branchOffice.model'
import { BranchProductModel } from 'src/app/models/branchProduct.model';
import { Chart } from 'node_modules/chart.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  product: ProductModel;
  products: any;
  productGetId: any;

  branchOffice: BranchOfficeModel
  branchOffices: any;
  branchOfficeGetId: any;

  branchProduct: BranchProductModel
  branchProducts: any;
  branchProductGetId: any;

  constructor(private productRest: ProductRestService, private branchOfficeRest: BranchOfficeRestService, private branchProductRest: BranchProductRestService) {
    this.product = new ProductModel('', '', '', 0)
    this.branchOffice = new BranchOfficeModel('', '', '')
    this.branchProduct = new BranchProductModel('', '', '', 0)
  }

  ngOnInit(): void {
    this.getProducts();
    this.getBranchOffices();
  }

  //---------------------------------- Productos ----------------------------------

  addProduct(addProductForm: any) {
    this.productRest.addProduct(this.product).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.getProducts();
        addProductForm.reset();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getProduct(id: string) {
    this.productRest.getProduct(id).subscribe({
      next: (res: any) => {
        this.productGetId = res.checkProduct;
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getProducts() {
    this.productRest.getProducts().subscribe({
      next: (res: any) => {
        this.products = res.products;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  updateProduct() {
    this.productRest.updateProduct(this.productGetId, this.productGetId._id).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.getProducts();
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  deleteProduct(id: string) {
    this.productRest.deleteProduct(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message + res.productDeleted.name
        })
        this.getProducts();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getProducts_OrderByProductNameAsc() {
    this.productRest.getProducts_OrderByProductNameAsc().subscribe({
      next: (res: any) => {
        this.products = res.products;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getProducts_OrderByProductNameDesc() {
    this.productRest.getProducts_OrderByProductNameDesc().subscribe({
      next: (res: any) => {
        this.products = res.products;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getProducts_OrderByProductProviderAsc() {
    this.productRest.getProducts_OrderByProductProviderAsc().subscribe({
      next: (res: any) => {
        this.products = res.products;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getProducts_OrderByProductProviderDesc() {
    this.productRest.getProducts_OrderByProductProviderDesc().subscribe({
      next: (res: any) => {
        this.products = res.products;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getProducts_OrderByStockAsc() {
    this.productRest.getProducts_OrderByStockAsc().subscribe({
      next: (res: any) => {
        this.products = res.products;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getProducts_OrderByStockDesc() {
    this.productRest.getProducts_OrderByStockDesc().subscribe({
      next: (res: any) => {
        this.products = res.products;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  //---------------------------------- Sucursales ----------------------------------

  addBranchOffice(addBranchOfficeForm: any) {
    this.branchOfficeRest.addBranchOffice(this.branchOffice).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.getBranchOffices();
        addBranchOfficeForm.reset();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getBranchOffice(id: string) {
    this.branchOfficeRest.getBranchOffice(id).subscribe({
      next: (res: any) => {
        this.branchOfficeGetId = res.branchOffice;
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getBranchOffices() {
    this.branchOfficeRest.getBranchOffices().subscribe({
      next: (res: any) => {
        this.branchOffices = res.branchOffices;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  updateBranchOffice() {
    this.branchOfficeGetId.company = undefined;
    this.branchOfficeGetId.branchProducts = undefined;
    this.branchOfficeRest.updateBranchOffice(this.branchOfficeGetId, this.branchOfficeGetId._id).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.getBranchOffices();
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  deleteBranchOffice(id: string) {
    this.branchOfficeRest.deleteBranchOffice(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message
        })
        this.getBranchOffices();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  //---------------------------------- Productos de una sucursal ----------------------------------

  addBranchProduct(addBranchProductForm: any) {
    this.branchProductRest.addBranchProduct(this.branchProduct).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message
        })
        this.getBranchOffices();
        this.getProducts();
        addBranchProductForm.reset();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getBranchProducts(idBranchOffice: string) {
    this.branchProductRest.getBranchProducts(idBranchOffice).subscribe({
      next: (res: any) => {
        this.branchOfficeGetId = idBranchOffice;
        this.branchProducts = res.branchProducts;
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getBranchProducts_OrderBySales() {
    this.branchProductRest.getBranchProducts_OrderBySales(this.branchOfficeGetId).subscribe({
      next: (res: any) => {
        console.log(res)
        this.branchProducts = res.branchProducts;
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getBranchProduct(branchProductId: string) {
    this.branchProductRest.getBranchProduct(this.branchOfficeGetId, branchProductId).subscribe({
      next: (res: any) => {
        this.branchProductGetId = res.branchProduct;
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  amount: any;

  sellBranchProduct(sellBranchProductForm: any) {
    let params = {
      amount: this.amount,
      branchOfficeId: this.branchOfficeGetId,
      branchProductId: this.branchProductGetId._id
    }
    this.branchProductRest.sellBranchProduct(params).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message
        })
        this.getBranchOffices();
        this.getProducts();
        this.getBranchProducts(this.branchOfficeGetId)
        sellBranchProductForm.reset();
      },
      error: (err: any) => {
        console.log(err)
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }
}

//---------------------------------- Gráfica productos mas vendidos ----------------------------------

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];

const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {}
};