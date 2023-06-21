import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Article} from "../../../entities/Article";
import {ArticleService} from "../../../services/article.service";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
  providers: [MessageService]

})
export class EditArticleComponent implements OnInit {
  articleId: number = 0;
  typeOptions: any[] = [
    { label: 'Vaccine', value: 'vaccine' },
    { label: 'Drug', value: 'drug' }
  ];
  article: Article = {
    id: 0,
    name: '',
    minAge: 0,
    maxAge: 0,
    type: '',
    stock: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articleId = +id;
      this.getArticle(this.articleId);
    }
  }

  getArticle(articleId: number): void {
    this.articleService.getArticleById(articleId).subscribe(
      (response: Article) => {
        this.article = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updateArticle(): void {
    if (this.article.id) {
      const updatedArticle: Article = { ...this.article }; // Create a copy of the article object

      this.articleService.updateArticle(this.article.id, updatedArticle).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Artikel wurde erfolgreich bearbeitet.' });
          this.router.navigate(['/articles']);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  isFormValid(): boolean {
    return (
      !!this.article.name &&
      !!this.article.minAge &&
      !!this.article.maxAge &&
      !!this.article.stock
    );
  }
}
