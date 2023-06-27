import { Component } from '@angular/core';
import { AuthService, Role } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  selectRole(role: Role) {
    this.authService.setRole(role);

    // Use a small delay before navigation to ensure the AppComponent is updated.
    setTimeout(() => {
      if (role === 'GES') {
        this.router.navigate(['articles']);
      } else if (role === 'BH') {
        this.router.navigate(['locations']);
      } else if (role === 'LR') {
        this.router.navigate(['dashboard']);
      }
    }, 100);
  }
}
