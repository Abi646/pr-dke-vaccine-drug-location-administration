import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticleService } from '../../../services/article.service';
import { Article, ArticleType } from '../../../models/article.model';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent {
  @ViewChild('articleForm', { static: false })
  articleForm!: NgForm;

  article: Article = {
    name: '',
    type: ArticleType.Vaccine,
    minAge: 0,
    maxAge: 120
  };

  constructor(private articleService: ArticleService) { }

  saveArticle() {
    this.articleService.saveArticle(this.article).subscribe(
      (savedArticle) => {
        console.log('Article added successfully:', savedArticle);
        // Reset the form
        this.articleForm.resetForm();
      },
      error => {
        console.error('Failed to add article:', error);
      }
    );
  }

  protected readonly ArticleType = ArticleType;

}
