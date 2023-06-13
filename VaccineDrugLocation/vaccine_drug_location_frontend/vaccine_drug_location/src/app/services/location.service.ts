import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:9193/location';

  constructor(private http: HttpClient) { }

  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl);
  }

  getLocationById(id: number | undefined): Observable<Location> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Location>(url);
  }

  saveLocation(location: Location): Observable<Location> {
    const combinedName = `${location.name}, ${location.address}, ${location.postalCode}`;
    location.name = combinedName;

    return this.http.post<Location>(this.apiUrl, location);
  }

  updateLocation(id: number | undefined, updatedLocation: Location): Observable<Location> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Location>(url, updatedLocation);
  }

  deleteLocation(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
