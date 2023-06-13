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
  title = 'Vaccine Drug Location Administration';
  role: Role | undefined;
  public GESItems: MenuItem[] = [];
  public BHItems: MenuItem[] = [];
  public LRItems: MenuItem[] = [];


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

      this.GESItems = [
        {
          label: 'Artikel hinzufügen',
          icon: 'pi pi-fw pi-plus-circle',
          routerLink: '/add-article'
        },
        {
          label: 'Standort hinzufügen',
          icon: 'pi pi-fw pi-plus-circle',
          routerLink: '/add-location'
        },
        {
          label: 'Standorte anzeigen',
          icon: 'pi pi-fw pi-map',
          routerLink: '/list-location'
        },
        {
          label: 'Inventar anzeigen',
          icon: 'pi pi-globe',
          routerLink: '/list-article',
        },
        {
          label: 'Inventar für Standort anzeigen',
          icon: 'pi pi-globe',
          routerLink: '/location-inventory/:id',
        },
        {
          label: 'Rolle wechseln',
          icon: 'pi pi-fw pi-power-off',
          routerLink: '/login'
        },
      ];

    this.BHItems = [
      {
        label: 'Standort hinzufügen',
        icon: 'pi pi-fw pi-plus-circle',
        routerLink: '/add-location'
      },
      {
        label: 'Standorte anzeigen',
        icon: 'pi pi-fw pi-map',
        routerLink: '/list-location'
      },
      {
        label: 'Linien verwalten',
        icon: 'pi pi-fw pi-map',
        routerLink: '/list-location'
      },
      {
        label: 'Inventar anzeigen',
        icon: 'pi pi-globe',
        routerLink: '/list-article',
      },
    ];
    this.LRItems = [
    ];
  }

}
