import { Component, OnInit } from '@angular/core';
import { ShopControllerService } from './api/services/shop-controller.service';
import { CustomerDto } from './api/models/customer-dto';
import { ProductDto } from './api/models/product-dto';
import { PurchaseRequestDto } from './api/models/purchase-request-dto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'active-shoppe-ui';
  customers: CustomerDto[] = [];
  selectedCustomer: CustomerDto;
  products: ProductDto[] = [];
  displayedColumns: string[] = ['name', 'code', 'cost', 'selected'];

  constructor(private shopControllerService: ShopControllerService,
              private snackBar: MatSnackBar) {
    this.shopControllerService.rootUrl = '/momentum-active-shoppe';
  }

  ngOnInit() {
    this.shopControllerService.getAllProducts().subscribe(
      response => {
        this.products = response;
      },
      error => this.snackBar.open(error.error.message, 'Close', {duration: 2000})
    );

    this.getAllCustomers();
  }

  purchase() {
    if (!this.selectedCustomer || !this.selectedCustomer.customerId) {
      this.snackBar.open('No customer selected', 'Close', {duration: 2000});
      return;
    }

    const productCodes: string[] = [];
    this.products.forEach(product => {
      if (product.selected) {
        productCodes.push(product.code);
      }
    });
    const request: PurchaseRequestDto = {
      customerId: this.selectedCustomer.customerId,
      productCodes: productCodes
    };
    this.shopControllerService.purchaseProducts({body: request}).subscribe(
      response => {
        this.getAllCustomers();
      },
      error => this.snackBar.open(error.error.status + ' - ' + error.error.message, 'Close', {duration: 5000})
    );
  }

  getAllCustomers() {
    this.shopControllerService.getAllCustomers().subscribe(
      response => this.customers = response,
      error => this.snackBar.open(error.error.message, 'Close', {duration: 2000})
    );
  }
}
