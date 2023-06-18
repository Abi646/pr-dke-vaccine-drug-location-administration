import { Injectable } from '@angular/core';

const austrianCounties = {
  Burgenland: [
    "Eisenstadt",
    "Rust",
    "Mattersburg",
    "Neusiedl am See",
    "Jennersdorf",
    "Güssing",
    "Oberwart"
  ],
  Carinthia: [
    "Klagenfurt",
    "Villach",
    "Wolfsberg",
    "Sankt Veit an der Glan",
    "Spittal an der Drau",
    "Hermagor",
    "Völkermarkt",
    "Feldkirchen"
  ],
  "Lower Austria": [
    "Sankt Pölten",
    "Krems",
    "Waidhofen an der Ybbs",
    "Mistelbach",
    "Horn",
    "Tulln",
    "Korneuburg",
    "Wiener Neustadt",
    "Baden",
    "Melk",
    "Amstetten",
    "Lilienfeld",
    "Scheibbs",
    "Gmünd",
    "Zwettl",
    "Neunkirchen",
    "Gänserndorf",
    "Bruck an der Leitha"
  ],
  "Upper Austria": [
    'Braunau',
    'Eferding',
    'Freistadt',
    'Gmunden',
    'Grieskirchen',
    'Kirchdorf',
    'Linz-Land',
    'Perg',
    'Ried',
    'Rohrbach',
    'Schärding',
    'Steyr-Land',
    'Urfahr-Umgebung',
    'Vöcklabruck',
    'Wels-Land',
    'Wels-Stadt',
    'Steyr-Stadt',
    'Linz-Stadt'
  ],
  Salzburg: [
    "Salzburg",
    "Hallein",
    "St. Johann im Pongau",
    "Tamsweg",
    "Zell am See"
  ],
  Styria: [
    "Graz",
    "Leoben",
    "Bruck-Mürzzuschlag",
    "Murtal",
    "Weiz",
    "Leibnitz",
    "Deutschlandsberg",
    "Voitsberg",
    "Hartberg-Fürstenfeld",
    "Graz-Umgebung",
    "Südoststeiermark"
  ],
  Tyrol: [
    "Innsbruck",
    "Innsbruck-Land",
    "Kitzbühel",
    "Kufstein",
    "Landeck",
    "Lienz",
    "Reutte",
    "Schwaz",
    "Imst"
  ],
  Vorarlberg: ["Bregenz", "Dornbirn", "Feldkirch", "Bludenz"],
  Vienna: ["Vienna"]
};

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  getCountiesByState(state: string) {
    // @ts-ignore
    const counties = austrianCounties[state];
    if (counties) {
      return counties;
    } else {
      return [];
    }
  }

  getAllStates() {
    return Object.keys(austrianCounties);
  }

}
