import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Line } from '../../../entities/Line';
import { Article } from '../../../entities/Article';
import { Location } from '../../../entities/Location';
import { LineService } from '../../../services/line.service';
import { ArticleService } from '../../../services/article.service';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-edit-line',
  templateUrl: './edit-line.component.html',
  styleUrls: ['./edit-line.component.scss'],
  providers: [MessageService]
})
export class EditLineComponent implements OnInit {
  lineForm!: FormGroup;
  // @ts-ignore
  line: Line = new Line();
  typeOptions: any[] = [
    { label: 'Impfstoff', value: 'vaccine' },
    { label: 'Medikament', value: 'drug' }
  ];
  locations: Location[] = [];
  articles: Article[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private lineService: LineService,
    private articleService: ArticleService,
    private locationService: LocationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const lineId = this.route.snapshot.params['id'];
    this.initializeForm();
    this.loadLine(lineId);
    this.loadLocations();
    this.loadArticles();
  }

  initializeForm(): void {
    this.lineForm = this.formBuilder.group({
      lineNumber: [null, Validators.required],
      type: ['', Validators.required],
      article: [null, Validators.required],
      location: [null, Validators.required],
      quantity: [null, Validators.required]
    });
  }

  loadLine(lineId: number): void {
    this.lineService.getLineById(lineId).subscribe(
      (line: Line) => {
        this.line = line;
        this.populateForm();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  populateForm(): void {
    this.lineForm.patchValue({
      lineNumber: this.line.lineNumber,
      type: this.line.type,
      article: this.line.article,
      location: this.line.location,
      quantity: this.line.quantity
    });
  }

  loadLocations(): void {
    this.locationService.getAllLocations().subscribe(
      (locations: Location[]) => {
        this.locations = locations;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  loadArticles(): void {
    this.articleService.getAllArticles().subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updateLine(): void {
    if (this.lineForm.invalid) {
      this.lineForm.markAllAsTouched();
      return;
    }

    const lineId = this.line.id;

    const updatedLine: Line = {
      id: lineId,
      lineNumber: this.lineForm.value.lineNumber,
      type: this.lineForm.value.type,
      article: this.lineForm.value.article,
      location: this.lineForm.value.location,
      quantity: this.lineForm.value.quantity
    };

    // @ts-ignore
    this.lineService.updateLine(lineId, updatedLine).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Line updated successfully!'
        });
        this.router.navigate(['/list-lines']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  isFormValid(): boolean {
    return this.lineForm.valid;
  }
}
