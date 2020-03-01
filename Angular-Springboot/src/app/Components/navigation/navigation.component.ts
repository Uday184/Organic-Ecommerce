import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItemsCount } from '../../Model/CartItemsCount';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  private loggedType: string;
  private cart$: Observable<CartItemsCount>;
  private userNm : string;

  constructor(private api: ApiService, private route: Router) {
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

  async ngOnInit() {
    const auth = this.api.getToken();
    this.cart$ = await this.api.getTotalCartItemsCount(auth);
  }

  logout() {
    this.loggedType = "home";
    this.api.removeToken();
    this.route.navigate(['/login']);
  }

}
