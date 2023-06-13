import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private inventoryUrl = 'http://localhost:9193/inventory'; // Change to your API endpoint

  constructor(private http: HttpClient) { }

  getAllInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.inventoryUrl);
  }

  getInventoryById(id: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.inventoryUrl}/${id}`);
  }

  createInventory(inventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.inventoryUrl, inventory);
  }

  updateInventory(id: number, inventory: Inventory): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.inventoryUrl}/${id}`, inventory);
  }

  deleteInventory(id: number): Observable<any> {
    return this.http.delete(`${this.inventoryUrl}/${id}`);
  }
}
