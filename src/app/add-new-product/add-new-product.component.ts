import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../_model/product.mode';
import { ProductService } from '../_Services/product.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent {
  product:Product = {
    productName:"",
    productDescription:"",
    productDiscountedPrice:0,
    productActualPrice:0
  }

  constructor(private productService:ProductService){}

  addProduct(productForm:NgForm){
    this.productService.addProduct(this.product).subscribe({
      next: (response:any) => {
        productForm.reset();
      },
      error: (err) => console.log(err),
      complete:() => console.log("Completed")
    });
  }

}
