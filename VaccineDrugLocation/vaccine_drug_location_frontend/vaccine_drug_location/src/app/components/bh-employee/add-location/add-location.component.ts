import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocationService } from '../../../services/location.service';
import { District, Location } from '../../../models/location.model';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent {
  @ViewChild('locationForm', { static: false })
  locationForm!: NgForm;
  location: Location = {
    name: '',
    address: '',
    postalCode: '',
    district: District.WELS_STADT
  };

  districts: District[] = [
    District.BRAUNAU,
    District.EFERDING,
    District.FREISTADT,
    District.GMUNDEN,
    District.GRIESKIRCHEN,
    District.KIRCHDORF,
    District.LINZ_LAND,
    District.PERG,
    District.RIED,
    District.ROHRBACH,
    District.SCHÄRDING,
    District.STEYR_LAND,
    District.URFAHR_UMGEBUNG,
    District.VÖCKLABRUCK,
    District.WELS_LAND,
    District.WELS_STADT,
    District.STEYR_STADT,
    District.LINZ_STADT
  ];

  constructor(private locationService: LocationService) {}

  saveLocation(): void {
    this.locationService.saveLocation(this.location).subscribe(
      (savedLocation) => {
        console.log('Location saved successfully:', savedLocation);
        this.locationForm.resetForm();
        this.location = {
          name: '',
          address: '',
          postalCode: '',
          district: District.WELS_STADT
        };
      },
      (error) => {
        console.error('Failed to save location:', error);
      }
    );
  }
}
