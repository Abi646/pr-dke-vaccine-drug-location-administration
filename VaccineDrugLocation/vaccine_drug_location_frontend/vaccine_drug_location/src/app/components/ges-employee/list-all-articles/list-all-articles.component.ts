import { Component, OnInit } from '@angular/core';
import { Article } from '../../../entities/Article';
import { ArticleService} from "../../../services/article.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-all-articles',
  templateUrl: './list-all-articles.component.html',
  styleUrls: ['./list-all-articles.component.scss']
})
export class ListAllArticlesComponent implements OnInit {
  articles: Article[] = [];
  deletingArticleId?: number;
  searchName: string = '';


  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit(): void {
    this.getAllArticles();
  }

  getAllArticles(): void {
    this.articleService.getAllArticles().subscribe(
      (response: Article[]) => {
        console.log(response);
        this.articles = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  searchArticlesByName(): void {
    if (this.searchName.trim() !== '') {
      this.articleService.searchArticlesByName(this.searchName).subscribe(
        (articles: Article[]) => {
          this.articles = articles;
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      this.getAllArticles();
    }
  }


  deleteArticle(articleId: number): void {
    this.deletingArticleId = articleId;
  }

  confirmDeleteArticle(): void {
    this.articleService.deleteArticle(this.deletingArticleId!).subscribe(
      () => {
        this.articles = this.articles.filter(article => article.id !== this.deletingArticleId);
        this.deletingArticleId = undefined;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  editArticle(article: Article): void {
    if (article.id) {
      this.router.navigate(['articles', article.id]);
    }
  }
}
