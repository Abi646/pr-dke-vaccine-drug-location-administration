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

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }

  updateArticle(articleId: number, updatedArticle: Article): Observable<Article> {
    const url = `${this.apiUrl}/${articleId}`;
    return this.http.put<Article>(url, updatedArticle);
  }

  deleteArticle(articleId: number): Observable<void> {
    const url = `${this.apiUrl}/${articleId}`;
    return this.http.delete<void>(url);
  }

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  searchArticlesByName(name: string): Observable<Article[]> {
    const url = `${this.apiUrl}/search?name=${name}`;
    return this.http.get<Article[]>(url);
  }

  searchArticlesByType(type: string): Observable<Article[]> {
    const url = `${this.apiUrl}/searchByType?type=${type}`;
    return this.http.get<Article[]>(url);
  }

  addArticleToLine(articleId: number, lineId: number): Observable<Article> {
    const url = `${this.apiUrl}/${articleId}/lines/${lineId}`;
    return this.http.post<Article>(url, null);
  }

  getArticleById(articleId: number): Observable<Article> {
    const url = `${this.apiUrl}/${articleId}`;
    return this.http.get<Article>(url);
  }


}
