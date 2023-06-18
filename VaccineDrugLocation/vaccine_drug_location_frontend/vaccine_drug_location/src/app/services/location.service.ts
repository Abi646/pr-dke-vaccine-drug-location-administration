import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../entities/Location';

@Injectable()
export class LocationService {
  private baseUrl = 'http://localhost:9194/locations';

  constructor(private http: HttpClient) {}

  createLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.baseUrl, location);
  }

  getLocationById(location_id: number): Observable<Location> {
    const url = `${this.baseUrl}/${location_id}`;
    return this.http.get<Location>(url);
  }

  updateLocation(location_id: number, updatedLocation: Location): Observable<Location> {
    const url = `${this.baseUrl}/${location_id}`;
    return this.http.put<Location>(url, updatedLocation);
  }

  deleteLocation(location_id: number): Observable<void> {
    const url = `${this.baseUrl}/${location_id}`;
    return this.http.delete<void>(url);
  }

  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.baseUrl);
  }

  searchLocationsByCounty(county: string): Observable<Location[]> {
    const url = `${this.baseUrl}/all/${county}`;
    return this.http.get<Location[]>(url);
  }

  searchLocationsWithQuantity(county: string): Observable<string[]> {
    const url = `${this.baseUrl}/stock/${county}`;
    return this.http.get<string[]>(url);
  }

  getLinesWithQuantityByLocation(locationName: string): Observable<number[]> {
    const url = `${this.baseUrl}/${locationName}/lines`;
    return this.http.get<number[]>(url);
  }

  getArticleQuantityByLocationAndLineNumberAndName(
    locationName: string,
    lineNumber: number,
    name: string
  ): Observable<number> {
    const url = `${this.baseUrl}/${locationName}/line/${lineNumber}/articles/${name}`;
    return this.http.get<number>(url);
  }

  getArticleNamesByLocationAndLineNumber(
    locationName: string,
    lineNumber: number
  ): Observable<string[]> {
    const url = `${this.baseUrl}/${locationName}/line/${lineNumber}/articles`;
    return this.http.get<string[]>(url);
  }

  getAppointmentDurationByLocationName(locationName: string): Observable<number> {
    const url = `${this.baseUrl}/${locationName}/duration`;
    return this.http.get<number>(url);
  }
}
