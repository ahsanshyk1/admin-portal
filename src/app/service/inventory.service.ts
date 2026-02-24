import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  httpSvc = inject(HttpService)

  getProducts() {
    return this.httpSvc.get('products')
  }

  deleteProduct(id: string) {
    return this.httpSvc.delete(`products/${id}`)
  }
}
