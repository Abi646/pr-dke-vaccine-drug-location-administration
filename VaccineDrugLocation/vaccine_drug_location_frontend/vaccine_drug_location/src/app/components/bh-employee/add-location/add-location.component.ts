import { Component, OnInit } from '@angular/core';
import { Location } from "../../../entities/Location";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LocationService } from "../../../services/location.service";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
  providers: [MessageService]
})
export class AddLocationComponent implements OnInit {
  locationForm!: FormGroup;
  // @ts-ignore
  location: Location = new Location();
  typeOptions: any[] = [
    { label: 'Impfstandort', value: 'vaccination' },
    { label: 'Medikamentenstandort', value: 'medication' }
  ];
  countyOptions: any[] = [
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
    private locationService: LocationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.locationForm = this.formBuilder.group({
      name: ['', Validators.required],
      county: ['', Validators.required],
      address: ['', Validators.required],
      type: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  saveLocation(): void {
    if (this.locationForm.invalid) {
      this.locationForm.markAllAsTouched();
      return;
    }

    this.location = { ...this.location, ...this.locationForm.value };

    this.locationService.createLocation(this.location)
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Standort wurde erfolgreich erstellt.' });
        this.locationForm.reset();
      });
  }

  isFormValid(): boolean {
    return this.locationForm.valid;
  }
}
