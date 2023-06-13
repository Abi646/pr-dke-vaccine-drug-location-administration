export interface Location {
  id?: number;
  name: string;
  district: string;
  address: string;
  postalCode: string;
}

export enum District {
  BRAUNAU = 'BRAUNAU',
  EFERDING = 'EFERDING',
  FREISTADT = 'FREISTADT',
  GMUNDEN = 'GMUNDEN',
  GRIESKIRCHEN = 'GRIESKIRCHEN',
  KIRCHDORF = 'KIRCHDORF',
  LINZ_LAND = 'LINZ_LAND',
  PERG = 'PERG',
  RIED = 'RIED',
  ROHRBACH = 'ROHRBACH',
  SCHÄRDING = 'SCHÄRDING',
  STEYR_LAND = 'STEYR_LAND',
  URFAHR_UMGEBUNG = 'URFAHR_UMGEBUNG',
  VÖCKLABRUCK = 'VÖCKLABRUCK',
  WELS_LAND = 'WELS_LAND',
  WELS_STADT = 'WELS_STADT',
  STEYR_STADT = 'STEYR_STADT',
  LINZ_STADT = 'LINZ_STADT',
}
