import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly urlNumberofAppointments = 'http://localhost:9193/number-of-appointments-loc';

  constructor(private http: HttpClient) { }

  // Ruft die Anzahl der Termine anhand des Standorts ab
  public getNumberofAppointmentsByLocation(location: string[]): Observable<number> | null {
    if (!location || location.length === 0) {
      return null;
    }

    const headers = new HttpHeaders();
    const options = { headers: headers, params: { location: location } };

    return this.http.get<number>(this.urlNumberofAppointments, options);
  }
}
