import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '../../../models/location.model';
import { LocationService } from '../../../services/location.service';
import { LineService } from '../../../services/line.service';
import { Line } from '../../../models/line.model';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../models/article.model';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss']
})
export class EditLocationComponent implements OnInit {
  @ViewChild('locationForm', { static: false })
  location: Location = {
    name: '',
    district: '',
    address: '',
    postalCode: ''
  };
  lines: Line[] = [];
  locationId: number | undefined;
  selectedArticleId: number | undefined; // Die ID des ausgewählten Artikels für die neue Linie
  articles: Article[] = []; // Eine Liste aller Artikel

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    private lineService: LineService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.locationId = params['id'];
      this.loadLocation();
      this.loadLines();
      this.loadArticles(); // Laden Sie die Artikel, wenn die Komponente initialisiert wird
    });
  }

  loadLocation(): void {
    this.locationService.getLocationById(this.locationId).subscribe(
      (location) => {
        this.location = location;
      },
      (error) => {
        console.error('Failed to load location:', error);
      }
    );
  }

  loadLines(): void {
    this.lineService.getAllLines().subscribe(
      (lines) => {
        this.lines = lines.filter(line => line.location.id === this.locationId);
      },
      (error) => {
        console.error('Failed to load lines:', error);
      }
    );
  }

  loadArticles(): void {
    this.articleService.getAllArticles().subscribe(
      (articles) => {
        this.articles = articles;
      },
      (error) => {
        console.error('Failed to load articles:', error);
      }
    );
  }

  saveLocation(): void {
    this.locationService.updateLocation(this.locationId, this.location).subscribe(
      (updatedLocation) => {
        console.log('Location updated successfully:', updatedLocation);
        this.router.navigate(['/list-location']);
      },
      (error) => {
        console.error('Failed to update location:', error);
      }
    );
  }

  addLine(): void {
    if (this.locationId !== undefined && this.selectedArticleId !== undefined) { // Prüfen, ob beide IDs definiert sind
      const newLine: Line = { location: this.location, dedicatedArticle: {id: this.selectedArticleId} as any };
      this.lineService.saveLine(newLine, this.locationId, this.selectedArticleId).subscribe(
        (line) => {
          console.log('Line added successfully:', line);
          this.lines.push(line);
        },
        (error) => {
          console.error('Failed to add line:', error);
        }
      );
    } else {
      console.error('Location ID or Article ID is undefined');
    }
  }

  removeLine(lineId: number | undefined): void {
    if (lineId !== undefined) { // Prüfen, ob lineId definiert ist
      this.lineService.deleteLine(lineId).subscribe(
        () => {
          console.log('Line removed successfully');
          this.lines = this.lines.filter(line => line.id !== lineId);
        },
        (error) => {
          console.error('Failed to remove line:', error);
        }
      );
    } else {
      console.error('Line ID is undefined');
    }
  }
}
