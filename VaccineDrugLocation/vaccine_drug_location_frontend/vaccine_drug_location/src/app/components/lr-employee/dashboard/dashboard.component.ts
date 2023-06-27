import { Component, OnInit } from '@angular/core';

interface Line {
  name: string;
  appointments: number;
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
      { name: 'Linie 1', appointments: this.getRandomNumber() },
      { name: 'Linie 2', appointments: this.getRandomNumber() },
      { name: 'Linie 11', appointments: this.getRandomNumber() },
      { name: 'Linie 22', appointments: this.getRandomNumber() }
    ];

    this.lines = dummyLines;
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 100);
  }
}
