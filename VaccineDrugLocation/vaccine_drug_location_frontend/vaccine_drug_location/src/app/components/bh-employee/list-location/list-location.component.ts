import { Component, OnInit } from '@angular/core';
import { Location } from '../../../models/location.model';
import { LocationService } from '../../../services/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.scss']
})
export class ListLocationComponent implements OnInit {
  locations: Location[] = [];

  constructor(private locationService: LocationService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(): void {
    this.locationService.getAllLocations().subscribe(
      (locations: Location[]) => {
        this.locations = locations;
      },
      (error: any) => {
        console.error('Failed to load locations:', error);
      }
    );
  }

  editLocation(id?: number): void {
    if (id) {
      this.router.navigate(['/edit-location', id]);
    }
  }

  deleteLocation(id?: number): void {
    if (id) {
      if (confirm('Are you sure you want to delete this location?')) {
        this.locationService.deleteLocation(id).subscribe(
          () => {
            console.log('Location deleted successfully');
            // Aktualisiere die Standorte-Liste
            this.loadLocations();
          },
          (error) => {
            console.error('Failed to delete location:', error);
          }
        );
      }
    }
  }
}
