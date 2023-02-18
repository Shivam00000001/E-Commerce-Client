import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle.model';
import { Product } from '../_model/product.model';
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
    productActualPrice:0,
    productImages : []
  }

  constructor(private productService:ProductService, private sanitizer: DomSanitizer){}

  addProduct(productForm:NgForm){
    const productFormData = this.prepareFormData(this.product);
    this.productService.addProduct(productFormData).subscribe({
      next: (response:any) => {
        productForm.reset();
      },
      error: (err) => console.log(err),
      complete:() => console.log("Completed")
    });
  }
  prepareFormData(product : Product) : FormData {
    const formData = new FormData();
    formData.append('product',
    new Blob([JSON.stringify(product)], {type:'application/json'})
    );
    for (var i = 0; i < product.productImages.length; i++) {
      formData.append('imageFile',
      product.productImages[i].file, product.productImages[i].file.name
      );
    }
    return formData;
  }

  onFileSelected(event:any){
    if(event.target.files) {
      const file = event.target.files[0];

      const fileHandle:FileHandle = {
        file:file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }
      this.product.productImages.push(fileHandle);
    }
  }
  removeImage(i:number){
    this.product.productImages.splice(i, 1);
  }
}
