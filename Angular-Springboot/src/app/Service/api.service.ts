import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Model/product';
import { User } from '../Model/user';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { Address } from '../Model/address';
import { CartItemsCount } from '../Model/CartItemsCount';
import { OrderHistory } from '../Model/OrderHistory';
import { OrderHistoryDetails } from '../Model/OrderHistoryDetails';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private REG_API = "http://localhost:8087/user/signup";
  private LOGU_API = "http://localhost:8087/user/verify";
  private LOGA_API = "http://localhost:8087/admin/verify";
  private PRDLST_API = "http://localhost:8087/user/getProducts";
  private ADD_CART_API = "http://localhost:8087/user/addToCart?productId=";
  private VW_CART_API = "http://localhost:8087/user/viewCart";
  private UP_CART_API = "http://localhost:8087/user/updateCart";
  private DEL_CART_API = "http://localhost:8087/user/delCart";
  private PLC_ORD_API = "http://localhost:8087/user/placeOrder";
  private ADR_API = "http://localhost:8087/user/addAddress";
  private GT_ADR_API = "http://localhost:8087/user/getAddress";
  private ADD_PRD_API = "http://localhost:8087/admin/addProduct";
  private DEL_PRD_API = "http://localhost:8087/admin/delProduct";
  private UPD_PRD_API = "http://localhost:8087/admin/updateProducts";
  private ORD_API = "http://localhost:8087/admin/viewOrders";
  private UPD_ORD_API = "http://localhost:8087/admin/updateOrder";
  private USR_CART_QTY_OF_PRODUCTS = "http://localhost:8087/user/getCartQuantity";
  private UPDT_USR_CART_WITH_PRODUCT_ID = "http://localhost:8087/user/updateCartWithProdId";
  private DEL_USR_CART_WITH_PRODUCT_ID = "http://localhost:8087/user/delCartWithProdId";
  private ALL_CATEGORIES = "http://localhost:8087/user/getAllCategories";
  private CLEAR_USER_CART = "http://localhost:8087/user/clearUserCart";
  private CART_ITEMS_CNT = "http://localhost:8087/user/totalCartItemsCount";
  private USER_ORDER_HISTORY = "http://localhost:8087/user/userOrderDetails";

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private http: HttpClient) {

  }
  // Registering the users to the database
  register(user: User): Observable<any> {
    return this.http.post(this.REG_API,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }
  // validating user credentials
  userLogin(user: User): Observable<any> {
    this.storage.set("userNm", user.email);
    return this.http.post(this.LOGU_API,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }

  // validating admin credentials
  adminLogin(user: User): Observable<any> {
    this.storage.set("userNm", user.email.substring(0, user.email.indexOf('@')));
    return this.http.post(this.LOGA_API,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }
  // Fetching all the products from the database
  getProducts(auth: string): Observable<any> {

    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.post<any>(this.PRDLST_API, null, { headers: myheader });

  }

  // Add Products to the user Cart
  addCartItems(product: Product, auth: string): Observable<any> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.ADD_CART_API + product.productid, { headers: myheader });
  }

  getAllCategories(): Observable<any> {
    return this.http.get(this.ALL_CATEGORIES);
  }

  // View Cart Items for the logged User

  getCartItems(auth: string): Observable<any> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.VW_CART_API, { headers: myheader });
  }

  getUserOrderHistory(auth: string): Observable<OrderHistoryDetails> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<OrderHistoryDetails>(this.USER_ORDER_HISTORY, { headers: myheader });
  }

  async getTotalCartItemsCount(auth: string): Promise<Observable<CartItemsCount>> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<CartItemsCount>(this.CART_ITEMS_CNT, { headers: myheader });
  }

  // add items to cart for the logged User
  updateCart(auth: string, prodid: number, quant: number): Observable<any> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.UP_CART_API + "?bufcartid=" + prodid + "&quantity=" + quant, { headers: myheader });
  }

  updateCartWithProductId(auth: string, productId: number, quantity: number): Observable<any> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.UPDT_USR_CART_WITH_PRODUCT_ID + 
               "?productId=" + productId + "&quantity=" + quantity, { headers: myheader });
  }

  // delete cart Item from logged User's Cart item
  delCart(auth: string, bufdid: number): Observable<any> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.DEL_CART_API + "?bufcartid=" + bufdid, { headers: myheader });
  }

  deleteUserCartWithProdId(auth: string, productId: number): Observable<any> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.DEL_USR_CART_WITH_PRODUCT_ID + "?productId=" + productId, { headers: myheader });
  }

  // place the order of logged User
  place(auth: string): Observable<any> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.PLC_ORD_API, { headers: myheader });
  }

  // update Address of logged User
  upAddress(auth: string, adr: Address): Observable<any> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.post<any>(this.ADR_API, adr, { headers: myheader });
  }

  // fetch address of logged user
  getAddress(auth: string): Observable<any> {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.post<any>(this.GT_ADR_API, null, { headers: myheader });
  }


  // Add product for Logged AdminUser

  addProduct(auth: string, desc: string,
    quan: string, price: string, prodname: string, category: string, image: File): Observable<any> {

    const formData: FormData = new FormData();
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("productname", prodname);
    formData.append("quantity", quan);
    formData.append("category", category);
    formData.append("file", image);

    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.post<any>(this.ADD_PRD_API, formData, { headers: myheader });

  }

  // delete Product for Logged Admin User
  delProduct(auth: string, prodid: number) {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.DEL_PRD_API + "?productId=" + prodid, { headers: myheader })
  }

  clearUserCart(auth: string) {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.CLEAR_USER_CART, { headers: myheader })
  }

  //get individual product quantity per user
  getProductQuantity(productId: number, email: string): Observable<any> {
    return this.http.get<any>(this.USR_CART_QTY_OF_PRODUCTS + "?productId=" + productId 
                + "&email=" + email);
  }

  // delete Product for Logged Admin User
  getOrders(auth: string) {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.ORD_API, { headers: myheader })
  }

  update(auth: string, order: any) {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    const formData: FormData = new FormData();
    formData.append("orderId", order.orderId);
    formData.append("orderStatus", order.orderStatus);
    return this.http.post<any>(this.UPD_ORD_API, formData, { headers: myheader })
  }

  // delete Product for Logged Admin User
  upOrders(auth: string, prodid: number) {
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.DEL_PRD_API + "?productid=" + prodid, { headers: myheader })
  }

  // update Product for Logged Admin User
  updateProduct(auth: string, desc: string,
    quan: string, price: string, prodname: string, image: File, productid: any, category: string): Observable<any> {

    const formData: FormData = new FormData();
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("productname", prodname);
    formData.append("quantity", quan);
    formData.append("file", image);
    formData.append("productId", productid);
    formData.append("category", category);

    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.post<any>(this.UPD_PRD_API, formData, { headers: myheader });

  }

  // Authentication Methods 

  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  storeToken(token: string, auth_type: string) {
    this.storage.set("auth_token", token);
    this.storage.set("auth_type", auth_type);
  }

  getAuthType(): string {
    if (this.storage.get("auth_type") !== null) {
      return this.storage.get("auth_type");
    }
    return null;
  }


  getToken() {
    return this.storage.get("auth_token");
  }

  getUserNm() {
    return this.storage.get("userNm");
  }

  removeToken() {
    this.storage.remove("auth_type");
    return this.storage.remove("auth_token");
  }

}
