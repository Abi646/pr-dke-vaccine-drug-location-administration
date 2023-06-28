import { Component, OnInit } from '@angular/core';

interface Line {
  name: string;
  anzahlTermine: number;
  auslastung: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lines: Line[] = [];

  constructor() { }

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    const dummyLines: Line[] = [
      { name: 'Messe-Gmunden Linie 9', anzahlTermine: this.getRandomNumber(), auslastung: this.getCapacity() },
      { name: 'Messe-Gmunden Linie 10', anzahlTermine: this.getRandomNumber(), auslastung: this.getCapacity() },
      { name: 'Hauptplatz Linie 11', anzahlTermine: this.getRandomNumber(), auslastung: this.getCapacity() },
      { name: 'Hauptplatz Linie 12', anzahlTermine: this.getRandomNumber(), auslastung: this.getCapacity() }
    ];

    this.lines = dummyLines;
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 86) + 15; // Generates random number between 15 and 100 (86 + 15)
  }

  getCapacity(): string {
    const randomNumber = this.getRandomNumber();
    const capacity = randomNumber / 100; // Divide by 100 to get the decimal representation
    const capacityPercentage = (capacity * 100); // Calculate percentage and round to 2 decimal places
    return `${capacityPercentage}%`;
  }
}
