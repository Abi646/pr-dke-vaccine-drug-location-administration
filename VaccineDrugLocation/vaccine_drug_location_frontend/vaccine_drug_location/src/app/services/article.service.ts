import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../entities/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:9194/articles';

  constructor(private http: HttpClient) { }

  // Erstellt einen Artikel
  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }

  // Aktualisiert einen Artikel
  updateArticle(articleId: number, updatedArticle: Article): Observable<Article> {
    const url = `${this.apiUrl}/${articleId}`;
    return this.http.put<Article>(url, updatedArticle);
  }

  // Löscht einen Artikel
  deleteArticle(articleId: number): Observable<void> {
    const url = `${this.apiUrl}/${articleId}`;
    return this.http.delete<void>(url);
  }

  // Ruft alle Artikel ab
  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  // Sucht Artikel anhand des Namens
  searchArticlesByName(name: string): Observable<Article[]> {
    const url = `${this.apiUrl}/search?name=${name}`;
    return this.http.get<Article[]>(url);
  }

  // Sucht Artikel anhand des Typs
  searchArticlesByType(type: string): Observable<Article[]> {
    const url = `${this.apiUrl}/searchByType?type=${type}`;
    return this.http.get<Article[]>(url);
  }

  // Fügt einen Artikel einer Linie hinzu
  addArticleToLine(articleId: number, lineId: number): Observable<Article> {
    const url = `${this.apiUrl}/${articleId}/lines/${lineId}`;
    return this.http.post<Article>(url, null);
  }

  // Ruft einen Artikel anhand der ID ab
  getArticleById(articleId: number): Observable<Article> {
    const url = `${this.apiUrl}/${articleId}`;
    return this.http.get<Article>(url);
  }

  // Ruft den Lagerbestand eines Artikels ab
  getArticleStock(articleId: number): Observable<number> {
    const url = `${this.apiUrl}/${articleId}/stock`;
    return this.http.get<number>(url);
  }
}
