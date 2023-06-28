import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../entities/Location';

@Injectable()
export class LocationService {
  private baseUrl = 'http://localhost:9194/locations';

  constructor(private http: HttpClient) {}

  // Erstellt einen Standort
  createLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.baseUrl, location);
  }

  // Ruft einen Standort anhand der ID ab
  getLocationById(location_id: number): Observable<Location> {
    const url = `${this.baseUrl}/${location_id}`;
    return this.http.get<Location>(url);
  }

  // Aktualisiert einen Standort
  updateLocation(location_id: number, updatedLocation: Location): Observable<Location> {
    const url = `${this.baseUrl}/${location_id}`;
    return this.http.put<Location>(url, updatedLocation);
  }

  // Löscht einen Standort
  deleteLocation(location_id: number): Observable<void> {
    const url = `${this.baseUrl}/${location_id}`;
    return this.http.delete<void>(url);
  }

  // Ruft alle Standorte ab
  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.baseUrl);
  }

  // Sucht Standorte anhand des Landkreises
  searchLocationsByCounty(county: string): Observable<Location[]> {
    const url = `${this.baseUrl}/all/${county}`;
    return this.http.get<Location[]>(url);
  }

  // Sucht Standorte mit einer Menge größer als 0 für einen bestimmten Landkreis und gibt nur die Namen zurück
  searchLocationsWithQuantity(county: string): Observable<string[]> {
    const url = `${this.baseUrl}/stock/${county}`;
    return this.http.get<string[]>(url);
  }

  // Ruft die Zeilennummern von Linien ab, die eine Menge größer als 0 haben, für einen bestimmten Standortnamen
  getLinesWithQuantityByLocation(locationName: string): Observable<number[]> {
    const url = `${this.baseUrl}/${locationName}/lines`;
    return this.http.get<number[]>(url);
  }

  // Ruft die Menge eines Artikels anhand des Standortnamens, der Zeilennummer und des Artikelnamens ab
  getArticleQuantityByLocationAndLineNumberAndName(
    locationName: string,
    lineNumber: number,
    name: string
  ): Observable<number> {
    const url = `${this.baseUrl}/${locationName}/line/${lineNumber}/articles/${name}`;
    return this.http.get<number>(url);
  }

  // Ruft die Artikelnamen ab, die einer bestimmten Zeilennummer eines Standorts zugeordnet sind
  getArticleNamesByLocationAndLineNumber(
    locationName: string,
    lineNumber: number
  ): Observable<string[]> {
    const url = `${this.baseUrl}/${locationName}/line/${lineNumber}/articles`;
    return this.http.get<string[]>(url);
  }

  // Ruft die Dauer eines Termins anhand des Standortnamens ab
  getAppointmentDurationByLocationName(locationName: string): Observable<number> {
    const url = `${this.baseUrl}/${locationName}/duration`;
    return this.http.get<number>(url);
  }
}
