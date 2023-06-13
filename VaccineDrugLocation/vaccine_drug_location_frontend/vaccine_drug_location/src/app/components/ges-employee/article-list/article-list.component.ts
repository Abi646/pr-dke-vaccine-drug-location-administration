import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../../../models/article.model';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];

  constructor(private router: Router, private articleService: ArticleService) { }

  ngOnInit(): void {
    this.getAllArticles();
  }

  getAllArticles(): void {
    this.articleService.getAllArticles().subscribe(
      (articles) => {
        this.articles = articles;
      },
      (error) => {
        console.error('Failed to retrieve articles:', error);
      }
    );
  }

  editArticle(id?: number): void {
    if (id) {
      this.router.navigate(['/edit-article', id]);
    }
  }

  deleteArticle(id?: number): void {
    if (id) {
      if (confirm('Are you sure you want to delete this article?')) {
        this.articleService.deleteArticle(id).subscribe(
          () => {
            console.log('Article deleted successfully');
            // Aktualisiere die Artikel-Liste
            this.getAllArticles();
          },
          (error) => {
            console.error('Failed to delete article:', error);
          }
        );
      }
    }
  }
}
