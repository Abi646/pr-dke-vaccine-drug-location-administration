import { Component } from '@angular/core';
import {Article} from "../../../entities/Article";
import {ArticleService} from "../../../services/article.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
  providers: [MessageService]
})
export class AddArticleComponent {
  // @ts-ignore
  article: Article = new Article();
  typeOptions: any[] = [
    { label: 'Impfstoff', value: 'vaccine' },
    { label: 'Medikament', value: 'drug' }
  ];
  minAgeError = false;
  typeError = false;

  constructor(
    private articleService: ArticleService,
    private messageService: MessageService
  ) {}

  saveArticle(): void {
    this.minAgeError = false;
    this.typeError = false;

    if (this.article.minAge >= this.article.maxAge) {
      this.minAgeError = true;
      return;
    }

    if (!this.typeOptions.some((option) => option.value === this.article.type)) {
      this.typeError = true;
      return;
    }

    this.articleService.createArticle(this.article)
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Artikel wurde erfolgreich erstellt.' });
        // @ts-ignore
        this.article = new Article();
      });
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
