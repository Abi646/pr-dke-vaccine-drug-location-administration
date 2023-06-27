import { Component, OnInit } from '@angular/core';
import { Line } from '../../../entities/Line';
import { LineService } from '../../../services/line.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-lines',
  templateUrl: './list-lines.component.html',
  styleUrls: ['./list-lines.component.scss']
})
export class ListLinesComponent implements OnInit {
  lines: Line[] = [];
  deletingLineId?: number;
  searchLineNumber: string = '';

  constructor(private lineService: LineService, private router: Router) {}

  ngOnInit(): void {
    this.getAllLines();
  }

  getAllLines(): void {
    this.lineService.getAllLines().subscribe(
      (lines: Line[]) => {
        this.lines = lines;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteLine(id: number): void {
    this.deletingLineId = id;
  }

  confirmDeleteLine(): void {
    this.lineService.deleteLine(this.deletingLineId!).subscribe(
      () => {
        this.lines = this.lines.filter(line => line.id !== this.deletingLineId);
        this.deletingLineId = undefined;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getLineById(lineId: number): void {
    if (lineId) {
      this.lineService.getLineById(lineId).subscribe(
        (line: Line) => {
          this.lines = line ? [line] : [];
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      this.getAllLines();
    }
  }

  editLine(line: Line): void {
    if (line.id) {
      this.router.navigate(['lines', line.id]);
    }
  }
}
