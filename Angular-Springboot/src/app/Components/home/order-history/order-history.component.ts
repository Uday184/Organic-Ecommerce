import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../Service/api.service';
import { OrderHistory } from '../../../Model/OrderHistory';
import { PlacedOrder } from '../../../Model/PlacedOrder';

@Component({
  selector: 'order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  private orderHistoryMap: Map<number, OrderHistory[]> = new Map<number, OrderHistory[]>();
  private authToken: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.authToken = this.apiService.getToken();
    this.apiService.getUserOrderHistory(this.authToken)
              .subscribe(res => {
                console.log(res);
                if (res.status === "200") {
                  // console.log(this.orderHistoryDetails);
                  this.orderHistoryMap = res.orderDetails;
                  // console.log(this.orderHistoryMap.keys();
                }
              });
  }

}
