import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Line } from '../entities/Line';
import {Article} from "../entities/Article";

@Injectable({
  providedIn: 'root'
})
export class LineService {
  private apiUrl = 'http://localhost:9194/lines';

  constructor(private http: HttpClient) {}

  createLine(line: {
    lineNumber: number,
    type: string,
    article: Article,
    quantity?: number,
    location?: Location
  }): Observable<Line> {
    return this.http.post<Line>(this.apiUrl, line);
  }


  getLineById(id: number): Observable<Line> {
    return this.http.get<Line>(`${this.apiUrl}/${id}`);
  }

  updateLine(lineId: number, quantity: number): Observable<Line> {
    return this.http.put<Line>(`${this.apiUrl}/${lineId}`, { quantity });
  }

  deleteLine(lineId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${lineId}`);
  }

  getAllLines(): Observable<Line[]> {
    return this.http.get<Line[]>(this.apiUrl);
  }

  searchLinesByQuantityGreaterThan(quantity: number): Observable<Line[]> {
    return this.http.get<Line[]>(`${this.apiUrl}?quantityGreaterThan=${quantity}`);
  }

  searchLinesByQuantityEqualsZero(): Observable<Line[]> {
    return this.http.get<Line[]>(`${this.apiUrl}?quantityEquals=0`);
  }

  searchLinesByArticleType(articleType: string): Observable<Line[]> {
    return this.http.get<Line[]>(`${this.apiUrl}?articleType=${articleType}`);
  }

  decreaseQuantity(lineId: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${lineId}/decrease`, null);
  }

  increaseQuantity(lineId: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${lineId}/increase`, null);
  }

  getLineByLocationNameAndLineNumber(locationName: string, lineNumber: number): Observable<Line> {
    return this.http.get<Line>(`${this.apiUrl}/search?locationName=${locationName}&lineNumber=${lineNumber}`);
  }
}
