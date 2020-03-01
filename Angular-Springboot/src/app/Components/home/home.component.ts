import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Product } from 'src/app/Model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItemsCount } from '../../Model/CartItemsCount';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  private auth_token: string;
  private categories: string[] = [];
  private category: string;
  private loggedType: string;
  private cartCount: number = 0;
  private userNm : string;
  private _searchTerm: string;

  constructor(private api: ApiService, private activeRoute: ActivatedRoute,
     private route: Router ) {
    this.userNm = this.api.getUserNm();
    if (this.api.getAuthType() == null) {
      this.loggedType = "home";
    } else {
      if (this.api.getAuthType() == "customer") {
        this.loggedType = "customer";
      } else if (this.api.getAuthType() == "admin") {
        this.loggedType = "admin";
      }
    }
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredProducts = this.filterProducts(value);
  }

  filterProducts(searchTerm: string): Product[] {
    return this.products.filter(product => product.productname.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

  ngOnInit() {
    if (this.api.isAuthenticated) {
      this.auth_token = this.api.getToken();
      this.getCartCount().subscribe(res => {
        res.oblist.forEach(element => {
          this.cartCount = this.cartCount + element.quantity;
        });
      });
      this.api.getProducts(this.auth_token).subscribe(
        res => {
          this.products = res.oblist;

          this.activeRoute.queryParamMap.subscribe(params => {
            this.category = params.get('category');
            
            this.filteredProducts = this.category ? 
              this.products.filter(p => p.category === this.category) : this.products;
          });

        }
      );
    }

    this.api.getAllCategories().subscribe(res => {
      if (res.status === '200') {
        this.categories = res.categories;
      }
    });
  }

  addToCart(e) {
    this.api.addCartItems(e, this.auth_token).subscribe(res => {
      this.cartCount ++;
      console.log(res);
    });
  }

  getCartCount(): Observable<any> {
    return this.api.getCartItems(this.auth_token);
  }

  productAddRemoveStatus(status: string) {
    if (status === 'add') {
      this.cartCount ++;
    } else {
      this.cartCount --;
    }
  }

  logout() {
    this.loggedType = "home";
    this.api.removeToken();
    this.route.navigate(['/login']);
  }
}
