import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService, Role} from "./services/auth.service";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Vaccine/Drug + Location/Line Administration';
  role: Role | undefined;
  public CTItems: MenuItem[] = [];
  public BHItems: MenuItem[] = [];

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    console.log('test');
    this.role = this.authService.getRole();

    if (this.role === undefined) {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['ct-home'])
    }

      this.CTItems = [
        {
          label: 'Übersicht',
          icon: 'pi pi-fw pi-user',
          routerLink: '/ct-home'
        },
        {
          label: 'Artikel hinzufügen',
          icon: 'pi pi-fw pi-file',
          routerLink: '/add-article',
        },
        {
          label: 'Alle Artikel',
          icon: 'pi pi-list',
          routerLink: '/articles',
        },
        {
          label: 'Standort hinzufügen',
          icon: 'pi pi-map-marker',
          routerLink: '/add-location'
        },
        {
          label: 'Alle Standorte anzeigen',
          icon: 'pi pi-fw pi-map',
          routerLink: '/locations'
        },
        {
          label: 'Line hinzufügen',
          icon: 'pi pi-fw pi-power-off',
          routerLink: '/lines'
        },
        {
          label: 'Rolle wechseln',
          icon: 'pi pi-fw pi-power-off',
          routerLink: '/login'
        }
      ];

    this.BHItems = [
      {
        label: 'Add Person',
        icon: 'pi pi-fw pi-file',
        routerLink: '/add',
      },
      {
        label: 'Log out',
        icon: 'pi pi-fw pi-power-off',
        routerLink: '/login'
      }
    ];
    }

}
