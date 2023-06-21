import { Component, OnInit } from '@angular/core';
import { Location } from '../../../entities/Location';
import { LocationService } from '../../../services/location.service';
import {Router} from "@angular/router";
import {Article} from "../../../entities/Article";

@Component({
  selector: 'app-list-locations',
  templateUrl: './list-locations.component.html',
  styleUrls: ['./list-locations.component.scss']
})
export class ListLocationsComponent implements OnInit {
  locations: Location[] = [];
  deletingLocationId?: number;
  searchCounty: string = '';

  constructor(private locationService: LocationService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations(): void {
    this.locationService.getAllLocations().subscribe(
      (locations: Location[]) => {
        this.locations = locations;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteLocation(id: number): void {
    this.deletingLocationId = id;
  }

  confirmDeleteLocation(): void {
    this.locationService.deleteLocation(this.deletingLocationId!).subscribe(
      () => {
        this.locations = this.locations.filter(location => location.id !== this.deletingLocationId);
        this.deletingLocationId = undefined;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  searchByCounty(): void {
    if (this.searchCounty.trim() !== '') {
      this.locationService.searchLocationsByCounty(this.searchCounty).subscribe(
        (locations: Location[]) => {
          this.locations = locations;
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      this.getAllLocations();
    }
  }

  editLocation(location: Location): void {
    if (location.id) {
      this.router.navigate(['locations', location.id]);
    }
  }

}
