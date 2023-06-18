import {Component} from '@angular/core';
import {AuthService, Role} from "../../services/auth.service";
import {Router} from "@angular/router";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public states: string[] = [];
  public counties: string[] = [];

  public selectedState: string = '';
  public selectedCounty: string = '';

  constructor(private router: Router, private stateService: StateService, private authService: AuthService) {
  }

  changeCounties(event: any) {
    this.counties = this.stateService.getCountiesByState(event.value);
  }

  ngOnInit() {
    this.states = this.stateService.getAllStates();
    this.counties = this.stateService.getCountiesByState(this.states[0]);
  }

  selectRole(role: Role) {
    this.authService.setRole(role);

    if (this.authService.getRole() === "CT") {
      this.router.navigate(['ct-home']);
    } else if (this.authService.getRole() === "BH") {
      this.router.navigate([`bh-home/${this.selectedState}/${this.selectedCounty}`]);
    }
  }

}
