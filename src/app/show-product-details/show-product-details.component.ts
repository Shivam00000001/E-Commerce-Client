import { Component } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_Services/product.service';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent {

  displayedColumns: string[] = ['Id', 'Product Name', 'Product Description','Product Discounted Price', 'Product Actual Price' , 'Edit', 'Delete'];
  productDetails:Product[] = [];

  constructor(private productService:ProductService) {}

  ngOnInit() : void{
    this.getAllProducts();
  }
  public getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (response:Product[]) =>  {console.log(response);
        this.productDetails = response;
      },
      error: (err) => console.log(err),
      complete:() => console.log("Completed")
    });
  }

  deleteProduct(productId:any) {
    this.productService.deleteProduct(productId).subscribe({
      next: (response:any) =>  {this.getAllProducts();
      },
      error: (err) => console.log(err),
      complete:() => console.log("Completed")
    });
  }
}
