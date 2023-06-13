import { Component, OnInit } from '@angular/core';
import { LineService } from '../../../services/line.service';
import { Location } from '../../../models/location.model';
import { Article, ArticleType } from '../../../models/article.model';
import { Line } from '../../../models/line.model';

@Component({
  selector: 'app-add-line',
  templateUrl: './add-line.component.html',
  styleUrls: ['./add-line.component.scss']
})
export class AddLineComponent implements OnInit {
  line: Line = {
    location: { name: '', district: '', address:'', postalCode:''},
    dedicatedArticle: { name: '', type: ArticleType.Drug, minAge: 0, maxAge: 120 }
  };

  locations: Location[] = [];
  articles: Article[] = [];

  constructor(private lineService: LineService) {}

  ngOnInit(): void {
    this.loadLocations();
    this.loadArticles();
  }

  saveLine(): void {
    const selectedLocationId = this.line.location.id!;
    const selectedArticleId = this.line.dedicatedArticle.id!;

    this.lineService.saveLine(this.line, selectedLocationId, selectedArticleId).subscribe(
      (savedLine) => {
        console.log('Line saved successfully:', savedLine);
        this.resetForm();
      },
      (error) => {
        console.error('Failed to save line:', error);
      }
    );
  }


  loadLocations(): void {
    this.lineService.getAllLocations().subscribe(
      (locations: Location[]) => {
        this.locations = locations;
      },
      (error: any) => {
        console.error('Failed to load locations:', error);
      }
    );
  }

  loadArticles(): void {
    this.lineService.getAllArticles().subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      },
      (error: any) => {
        console.error('Failed to load articles:', error);
      }
    );
  }

  resetForm(): void {
    this.line = {
      location: { name: '', district: '' , address: '', postalCode: ''},
      dedicatedArticle: { name: '', type: ArticleType.Drug, minAge: 0, maxAge: 120 }
    };
  }
}
