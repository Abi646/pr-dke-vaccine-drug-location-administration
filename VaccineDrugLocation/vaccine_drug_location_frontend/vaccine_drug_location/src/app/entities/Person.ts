import {SickInformation} from "./SickInformation";
import {Address} from "./Address";

export type Person = {
  id: number | null;
  svnr: number;
  firstName: string;
  lastName: string;
  address: Address;
  birthday: Date;
  email: string;
  phoneNumber: string;
  sickInformation: SickInformation;
  contacts: string[];
}

export const emptyPerson: Person = {
  id: null,
  svnr: 0,
  firstName: '',
  lastName: '',
  birthday: new Date(),
  phoneNumber: '',
  sickInformation: {
    quarantine: false,
    symptoms: false,
    sick: false,
    potential: false,
  },
  address: {
    id: (Math.floor(Math.random() * (10000000 - 1000 + 1))) + 1000000000,
    country: '',
    county: '',
    doorNumber: '',
    state: '',
    streetName: ''
  },
  contacts: [],
  email: '',
}
