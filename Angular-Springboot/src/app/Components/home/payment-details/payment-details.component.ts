import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../Service/api.service';

@Component({
  selector: 'payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent{

  private auth: string;

  constructor(private api: ApiService, private route: Router) { 
    this.auth = api.getToken();
  }

  pay() {
    this.api.clearUserCart(this.auth).subscribe(res => {
      this.route.navigate(['/home/success-order']);
    });
  }

}
