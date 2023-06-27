import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Line } from '../../../entities/Line';
import { Article } from '../../../entities/Article';
import { Location } from '../../../entities/Location';
import { LineService } from '../../../services/line.service';
import { ArticleService } from '../../../services/article.service';
import { LocationService } from '../../../services/location.service';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-add-line',
  templateUrl: './add-line.component.html',
  styleUrls: ['./add-line.component.scss'],
  providers: [MessageService]
})
export class AddLineComponent implements OnInit {
  lineForm!: FormGroup;
  typeOptions: any[] = [
    { label: 'Impfstoff', value: 'vaccine' },
    { label: 'Medikament', value: 'drug' }
  ];
  line: {
    quantity: number | null;
    lineNumber: number | null;
    type: string;
    article: Article | null;
    location: Location | null;
  } = {
    lineNumber: null,
    type: '',
    article: null,
    location: null,
    quantity: null
  };

  locations: Location[] = [];
  articles: Article[] = [];

  constructor(
    private lineService: LineService,
    private locationService: LocationService,
    private articleService: ArticleService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // Initialize the form and load data
    this.lineForm = this.formBuilder.group({
      lineNumber: [null, Validators.required],
      type: ['', Validators.required],
      article: [null, Validators.required],
      location: [null, Validators.required],
      quantity: [null, Validators.required]
    });

    this.loadLocations();
    this.loadArticles();
  }

  loadLocations() {
    this.locationService.getAllLocations().subscribe((locations) => {
      this.locations = locations;
    });
  }

  loadArticles() {
    this.articleService.getAllArticles().subscribe((articles) => {
      this.articles = articles;
    });
  }

  addLine(): void {
    if (this.lineForm.invalid) {
      this.lineForm.markAllAsTouched();
      return;
    }

    const newLine: Line = {
      lineNumber: this.lineForm.value.lineNumber,
      type: this.lineForm.value.type,
      article: this.lineForm.value.article,
      location: this.lineForm.value.location,
      quantity: this.lineForm.value.quantity
    };

    this.lineService.createLine(newLine).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Linie wurde erfolgreich hinzugefügt!'
      });
      this.lineForm.reset();
    });
  }
  isFormValid(): boolean {
    return this.lineForm.valid;
  }
}
