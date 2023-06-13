import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/location.model';
import { Article } from '../models/article.model';
import { Line } from '../models/line.model';

@Injectable({
  providedIn: 'root'
})
export class LineService {
  private apiUrl = 'http://localhost:9193/line';

  constructor(private http: HttpClient) {}

  getAllLines(): Observable<Line[]> {
    return this.http.get<Line[]>(this.apiUrl);
  }

  getLineById(id: number): Observable<Line> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Line>(url);
  }

  saveLine(line: Line, locationId: number, articleId: number): Observable<Line> {
    const lineData = {
      ...line,
      location: locationId,
      dedicatedArticle: articleId
    };

    return this.http.post<Line>(this.apiUrl, lineData);
  }

  updateLine(id: number, updatedLine: Line): Observable<Line> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Line>(url, updatedLine);
  }

  deleteLine(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getAllLocations(): Observable<Location[]> {
    const url = 'http://localhost:9193/location';
    return this.http.get<Location[]>(url);
  }

  getAllArticles(): Observable<Article[]> {
    const url = 'http://localhost:9193/article';
    return this.http.get<Article[]>(url);
  }
}
