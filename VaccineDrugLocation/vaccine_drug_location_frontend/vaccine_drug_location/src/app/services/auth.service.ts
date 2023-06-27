import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export type Role = 'GES' | 'BH' | 'LR';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private roleSubject: BehaviorSubject<Role | undefined> = new BehaviorSubject<Role | undefined>(undefined);

  getRole(): Observable<Role | undefined> {
    return this.roleSubject.asObservable();
  }

  setRole(role: Role) {
    this.roleSubject.next(role);
  }
}
