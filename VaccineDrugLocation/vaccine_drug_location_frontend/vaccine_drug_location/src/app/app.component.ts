import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService, Role} from "./services/auth.service";
import {MenuItem} from "primeng/api";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Vaccine/Drug + Location/Line Administration';
  role: Observable<Role | undefined>;
  public GESItems: MenuItem[] = [];
  public BHItems: MenuItem[] = [];
  public LRItems: MenuItem[] = [];

  constructor(private router: Router, private authService: AuthService) {
    this.role = this.authService.getRole();
  }

  ngOnInit() {
    this.role.subscribe(role => {
      if (role === undefined) {
        this.router.navigate(['login']);
      } else {
        this.router.navigate(['dashboard']);
      }
    });

      this.GESItems = [
        {
          label: 'Artikel hinzufügen',
          icon: 'pi pi-fw pi-file',
          routerLink: '/add-article',
        },
        {
          label: 'Alle Artikel anzeigen',
          icon: 'pi pi-list',
          routerLink: '/articles',
        },
        {
          label: 'Rolle wechseln',
          icon: 'pi pi-fw pi-power-off',
          routerLink: '/login'
        }
      ];

    this.BHItems = [
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
        label: 'Linie hinzufügen',
        icon: 'pi pi-fw pi-file',
        routerLink: '/add-lines'
      },
      {
        label: 'Alle Linien anzeigen',
        icon: 'pi pi-fw pi-map',
        routerLink: '/lines'
      },
      {
        label: 'Rolle wechseln',
        icon: 'pi pi-fw pi-power-off',
        routerLink: '/login'
      }
    ];
    this.LRItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-bar',
        routerLink: '/dashboard'
      },
      {
        label: 'Alle Artikel anzeigen',
        icon: 'pi pi-list',
        routerLink: '/articles',
      },
      {
        label: 'Alle Standorte anzeigen',
        icon: 'pi pi-fw pi-map',
        routerLink: '/locations'
      },
      {
        label: 'Alle Linien anzeigen',
        icon: 'pi pi-fw pi-map',
        routerLink: '/lines'
      },
      {
        label: 'Rolle wechseln',
        icon: 'pi pi-fw pi-power-off',
        routerLink: '/login'
      },
    ];
    }
}
