import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { Article, ArticleType } from '../../../models/article.model';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
  article: Article = {
    name: '',
    type: ArticleType.Vaccine,
    minAge: 0,
    maxAge: 0
  };

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== undefined) {
      this.loadArticle(Number(id));
    }
  }

  loadArticle(id: number | undefined) {
    if (id !== undefined) {
      this.articleService.getArticleById(id).subscribe(
        (article) => {
          this.article = article;
        },
        (error) => {
          console.error('Failed to retrieve article:', error);
        }
      );
    }
  }

  saveArticle() {
    if (this.article) {
      this.articleService.updateArticle(this.article.id, this.article).subscribe(
        (updatedArticle) => {
          console.log('Article updated successfully:', updatedArticle);
        },
        (error) => {
          console.error('Failed to update article:', error);
        }
      );
    }
  }

  protected readonly ArticleType = ArticleType;
}
