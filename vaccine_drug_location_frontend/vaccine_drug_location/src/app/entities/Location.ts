import {Line} from "./Line";

export class Location {
  id: number;
  name: string;
  county: string;
  address: string;
  type: string;
  duration: number;
  lines: Line[];

  constructor(
    id: number,
    name: string,
    county: string,
    address: string,
    type: string,
    duration: number,
    lines: Line[] = []
  ) {
    this.id = id;
    this.name = name;
    this.county = county;
    this.address = address;
    this.type = type;
    this.duration = duration;
    this.lines = lines;
  }
}
