import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Line } from '../../../entities/Line';
import { Article } from '../../../entities/Article';
import { Location } from '../../../entities/Location';
import { LineService } from '../../../services/line.service';
import { ArticleService } from '../../../services/article.service';
import { LocationService } from '../../../services/location.service';
import { MessageService } from 'primeng/api';

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
    // Initialisiert das Formular mit den Validatoren
    this.lineForm = this.formBuilder.group({
      lineNumber: [null, Validators.required],
      type: ['', Validators.required],
      article: [null, Validators.required],
      location: [null, Validators.required],
      quantity: [null, Validators.required]
    });

    // Lädt Standorte und Artikel beim Initialisieren der Komponente
    this.loadLocations();
    this.loadArticles();
  }

  // Lädt alle Standorte
  loadLocations() {
    this.locationService.getAllLocations().subscribe((locations) => {
      this.locations = locations;
    });
  }

  // Lädt alle Artikel
  loadArticles() {
    this.articleService.getAllArticles().subscribe((articles) => {
      this.articles = articles;
    });
  }

  // Fügt eine neue Warteschlange hinzu
  addLine(): void {
    if (this.lineForm.invalid) {
      // Markiert alle Felder als "berührt", um die Validierungsmeldungen anzuzeigen
      this.lineForm.markAllAsTouched();
      return;
    }

    const selectedArticle: Article = this.lineForm.value.article;
    const selectedQuantity: number = this.lineForm.value.quantity;

    // Überprüft, ob die ausgewählte Menge das verfügbare Kontingent des Artikels überschreitet
    if (selectedArticle && selectedQuantity > selectedArticle.stock) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Die ausgewählte Menge überschreitet das verfügbare Kontingent des Artikels!'
      });
      return;
    }

    // Erstellt ein neues Line-Objekt mit den Formularwerten
    const newLine: Line = {
      lineNumber: this.lineForm.value.lineNumber,
      type: this.lineForm.value.type,
      article: this.lineForm.value.article,
      location: this.lineForm.value.location,
      quantity: this.lineForm.value.quantity
    };

    // Fügt die neue Linie hinzu
    this.lineService.createLine(newLine).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Erfolgreich',
        detail: 'Linie wurde erfolgreich hinzugefügt!'
      });
      this.lineForm.reset();
    });
  }

  // Überprüft, ob das Formular gültig ist
  isFormValid(): boolean {
    return this.lineForm.valid;
  }
}
