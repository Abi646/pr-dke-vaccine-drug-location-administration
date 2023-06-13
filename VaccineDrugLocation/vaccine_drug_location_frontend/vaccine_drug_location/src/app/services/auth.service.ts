import {Injectable} from '@angular/core';

export type Role = 'GES' | 'BH' | 'LR';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public role: Role | undefined = "GES";

  constructor() {
  }

  getRole(): Role | undefined {
    return this.role;
  }

  setRole(role: Role) {
    this.role = role;
  }

}
