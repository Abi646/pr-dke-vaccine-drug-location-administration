import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Role = 'GES' | 'BH' | 'LR';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private roleSubject: BehaviorSubject<Role | undefined> = new BehaviorSubject<Role | undefined>(undefined);

  // Gibt die Rolle als Observable zurück
  getRole(): Observable<Role | undefined> {
    return this.roleSubject.asObservable();
  }

  // Setzt die Rolle
  setRole(role: Role) {
    this.roleSubject.next(role);
  }
}
