import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Line } from '../../../entities/Line';
import { Article } from '../../../entities/Article';
import { Location } from '../../../entities/Location';
import { LineService } from '../../../services/line.service';
import { ArticleService } from '../../../services/article.service';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-add-line',
  templateUrl: './add-line.component.html',
  styleUrls: ['./add-line.component.scss']
})
export class AddLineComponent implements OnInit {
  lineForm: FormGroup;
  articles: Article[] = [];
  locations: Location[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private lineService: LineService,
    private articleService: ArticleService,
    private locationService: LocationService
  ) {
    this.lineForm = this.formBuilder.group({
      lineNumber: ['', Validators.required],
      articleId: ['', Validators.required],
      quantity: ['', Validators.compose([Validators.required, Validators.min(0)])],
      locationId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadArticles();
    this.loadLocations();
  }

  loadArticles(): void {
    this.articleService.getAllArticles().subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadLocations(): void {
    this.locationService.getAllLocations().subscribe(
      (locations: Location[]) => {
        this.locations = locations;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addLine(): void {
    if (this.lineForm.valid) {
      const lineNumber = this.lineForm.get('lineNumber')?.value;
      const articleId = this.lineForm.get('articleId')?.value;
      const quantity = this.lineForm.get('quantity')?.value;
      const locationId = this.lineForm.get('locationId')?.value;

      const selectedArticle = this.articles.find(article => article.id === articleId);
      const selectedLocation = this.locations.find(location => location.id === locationId);

      if (selectedArticle && selectedLocation) {
        // @ts-ignore
        const line = new Line(lineNumber, selectedArticle, quantity, selectedLocation);

        this.lineService.createLine(line).subscribe(
          (createdLine: Line) => {
            console.log('Line created successfully:', createdLine);
            // Additional actions or navigation can be performed here
          },
          (error) => {
            console.log('Error creating line:', error);
          }
        );
      }
    }
  }
}
