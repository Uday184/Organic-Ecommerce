import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/Model/product';
import { EventEmitter } from '@angular/core';
import { ApiService } from '../../../Service/api.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() public product: Product;

  private quantity: number = 0;

  @Output() productAddToCart: EventEmitter<Product> = new EventEmitter<Product>();
  @Output('prodAddOrSubtractStatus') prodAddOrSubtractStatus: EventEmitter<string> = new EventEmitter<string>();

  constructor(private apiService: ApiService) { }

  ngOnInit() {

    const userEmail: string = this.apiService.getUserNm();
    this.apiService.getProductQuantity(this.product.productid, userEmail).subscribe(res =>{
      if (res.status === "200") {
        this.quantity = res.quantity;
      } else {
        this.quantity = 0;
      }
    });

  }

  addToCart() {
    this.quantity ++;
    this.productAddToCart.emit(this.product);
  }

  prodQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  productAddOrRemovalStatus(status: string) {
    this.prodAddOrSubtractStatus.emit(status);
  }

}
