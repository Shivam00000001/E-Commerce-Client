import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { ImageProcessingService } from './image-processing.service';
import { Product } from './_model/product.model';
import { ProductService } from './_Services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product> {

  constructor(private productService : ProductService, private imageProcessingService:ImageProcessingService) { }

  resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Product> {
    const id = route.paramMap.get("productId");
    if(id) {
      return this.productService.getProductDetailsById(Number(id))
      .pipe(map(p => this.imageProcessingService.createImages(p)));
    }
    else {
      return of(this.getProductDetails());
    }
  }

  getProductDetails() {
    return {
      productId:0,
      productName:"",
    productDescription:"",
    productDiscountedPrice:0,
    productActualPrice:0,
    productImages : []
    };
  }

}
