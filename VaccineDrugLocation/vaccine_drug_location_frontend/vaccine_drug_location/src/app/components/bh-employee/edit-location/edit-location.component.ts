import { Component, OnInit } from '@angular/core';
import { Location } from "../../../entities/Location";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {MessageService} from "primeng/api";
import {LocationService} from "../../../services/location.service";

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss'],
  providers: [MessageService]
})
export class EditLocationComponent implements OnInit {
  locationForm!: FormGroup;
  // @ts-ignore
  location: Location = new Location();
  typeOptions: any[] = [
    { label: 'Impfstandort', value: 'vaccination' },
    { label: 'Medikamentenstandort', value: 'medication' }
  ];countyOptions: any[] = [
    { label: 'Braunau', value: 'Braunau' },
    { label: 'Eferding', value: 'Eferding' },
    { label: 'Freistadt', value: 'Freistadt' },
    { label: 'Gmunden', value: 'Gmunden' },
    { label: 'Grieskirchen', value: 'Grieskirchen' },
    { label: 'Kirchdorf', value: 'Kirchdorf' },
    { label: 'Linz-Land', value: 'Linz-Land' },
    { label: 'Perg', value: 'Perg' },
    { label: 'Ried', value: 'Ried' },
    { label: 'Rohrbach', value: 'Rohrbach' },
    { label: 'Schärding', value: 'Schärding' },
    { label: 'Steyr-Land', value: 'Steyr-Land' },
    { label: 'Urfahr-Umgebung', value: 'Urfahr-Umgebung' },
    { label: 'Vöcklabruck', value: 'Vöcklabruck' },
    { label: 'Wels-Land', value: 'Wels-Land' },
    { label: 'Wels-Stadt', value: 'Wels-Stadt' },
    { label: 'Steyr-Stadt', value: 'Steyr-Stadt' },
    { label: 'Linz-Stadt', value: 'Linz-Stadt' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.location.id = +id;
      this.getLocation(this.location.id);
    }
  }
  getLocation(articleId: number): void {
    this.locationService.getLocationById(articleId).subscribe(
      (response: Location) => {
        this.location = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updateLocation(): void {
    if (this.location.id) {
      const updatedLocation: Location = { ...this.location }; // Create a copy of the article object

      this.locationService.updateLocation(this.location.id, updatedLocation).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Artikel wurde erfolgreich bearbeitet.' });
          this.router.navigate(['/articles']);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  isFormValid(): boolean {
    return (
      !!this.location.name &&
      !!this.location.address &&
      !!this.location.county &&
      !!this.location.type &&
      !!this.location.duration
    );
  }
}
