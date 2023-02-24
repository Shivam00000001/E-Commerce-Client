import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { ImageProcessingService } from '../image-processing.service';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { Product } from '../_model/product.model';
import { ProductService } from '../_Services/product.service';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent {

  displayedColumns: string[] = ['Id', 'Product Name', 'Product Description','Product Discounted Price', 'Product Actual Price' ,'Images', 'Edit', 'Delete'];
  productDetails:Product[] = [];

  constructor(private productService:ProductService,
    public imagesDialog:MatDialog,
    private imageProcessingService:ImageProcessingService) {}

  ngOnInit() : void{
    this.getAllProducts();
  }
  public getAllProducts() {
    this.productService.getAllProducts().
    pipe(
      map((x : Product[],i) => x.map((product:Product) => this.imageProcessingService.createImages(product))
        )).
    subscribe({
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
  showImages(product:Product){
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },
      height:'500px',
      width: '800px'
    });
  }
}   
