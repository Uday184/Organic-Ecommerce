import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/Model/product';
import { EventEmitter } from '@angular/core';
import { ApiService } from '../../Service/api.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit{

  @Input('product') product: Product;
  private auth: string;
  @Input('nbrOfItems') nbrOfItems : number;
  @Output('productQuantity') productQuantity: EventEmitter<number> = new EventEmitter<number>();
  @Output('addSubtractStatus') productAddOrSubtract: EventEmitter<string> = new EventEmitter<string>();

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.auth = this.api.getToken();
  }

  addToCart() {
    this.productAddOrSubtract.emit('add');
    this.nbrOfItems = this.nbrOfItems + 1;
    this.productQuantity.emit(this.nbrOfItems);
    this.api.updateCartWithProductId(this.auth, this.product.productid, this.nbrOfItems).subscribe();
  }

  removeFromCart() {
    this.productAddOrSubtract.emit('subtract');
    this.nbrOfItems = this.nbrOfItems - 1;
    this.productQuantity.emit(this.nbrOfItems);
    if (this.nbrOfItems === 0) {
      this.api.deleteUserCartWithProdId(this.auth, this.product.productid).subscribe();
    } else {
      this.api.updateCartWithProductId(this.auth, this.product.productid, this.nbrOfItems).subscribe();
    }
  }

}
