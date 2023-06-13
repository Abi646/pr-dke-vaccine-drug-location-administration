import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:9193/article';

  constructor(private http: HttpClient) { }

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  getArticleById(id: number): Observable<Article> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Article>(url);
  }

  saveArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }

  updateArticle(id: number | undefined, article: Article): Observable<Article> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Article>(url, article);
  }

  deleteArticle(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  editArticle(id: number, updatedArticle: Article): Observable<Article> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Article>(url, updatedArticle);
  }
}
