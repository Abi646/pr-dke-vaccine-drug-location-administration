import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Line } from '../entities/Line';
import { Article } from "../entities/Article";

@Injectable({
  providedIn: 'root'
})
export class LineService {
  private apiUrl = 'http://localhost:9194/lines';

  constructor(private http: HttpClient) {}

  // Erstellt eine Linie
  createLine(line: {
    lineNumber: number,
    type: string,
    article: Article,
    quantity?: number,
    location?: Location
  }): Observable<Line> {
    return this.http.post<Line>(this.apiUrl, line);
  }

  // Ruft eine Linie anhand der ID ab
  getLineById(id: number): Observable<Line> {
    return this.http.get<Line>(`${this.apiUrl}/${id}`);
  }

  // Aktualisiert eine Linie mit einer neuen Menge
  updateLine(lineId: number, quantity: number): Observable<Line> {
    return this.http.put<Line>(`${this.apiUrl}/${lineId}`, { quantity });
  }

  // Löscht eine Linie anhand der ID
  deleteLine(lineId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${lineId}`);
  }

  // Ruft alle Linie ab
  getAllLines(): Observable<Line[]> {
    return this.http.get<Line[]>(this.apiUrl);
  }

  // Sucht Linie mit einer größeren Menge als die angegebene Menge
  searchLinesByQuantityGreaterThan(quantity: number): Observable<Line[]> {
    return this.http.get<Line[]>(`${this.apiUrl}?quantityGreaterThan=${quantity}`);
  }

  // Sucht Linie mit einer Menge von null
  searchLinesByQuantityEqualsZero(): Observable<Line[]> {
    return this.http.get<Line[]>(`${this.apiUrl}?quantityEquals=0`);
  }

  // Sucht Linie anhand des Artikeltyps
  searchLinesByArticleType(articleType: string): Observable<Line[]> {
    return this.http.get<Line[]>(`${this.apiUrl}?articleType=${articleType}`);
  }

  // Verringert die Menge einer Linie um 1
  decreaseQuantity(lineId: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${lineId}/decrease`, null);
  }

  // Erhöht die Menge einer Linie um 1
  increaseQuantity(lineId: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${lineId}/increase`, null);
  }

  // Ruft eine Linie anhand des Standortnamens und der Zeilennummer ab
  getLineByLocationNameAndLineNumber(locationName: string, lineNumber: number): Observable<Line> {
    return this.http.get<Line>(`${this.apiUrl}/search?locationName=${locationName}&lineNumber=${lineNumber}`);
  }
}
