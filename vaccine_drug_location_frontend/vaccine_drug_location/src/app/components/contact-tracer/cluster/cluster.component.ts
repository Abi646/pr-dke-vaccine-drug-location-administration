import {Component} from '@angular/core';
import {Person} from "../../../entities/Person";
import {Router} from "@angular/router";
import {PersonService} from "../../../services/person.service";

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.scss']
})
export class ClusterComponent {

  public people: Person[] = [];
  public contacts: Person[] = [];
  public sickContactsArray: Person[] = [];

  constructor(private personService: PersonService, private router: Router) {
  }

  ngOnInit() {
    this.personService.getPeople().subscribe((people) => {
      this.people = people;
    });
  }

  getContacts() {
    this.people
      .filter(person => person.contacts.length >= 2)
      .map(person => this.personService.getPeopleBySvnr(person.contacts.map(value => parseInt(value)) ?? []).subscribe((contactPeople) => {
        console.log(contactPeople);
        this.contacts = contactPeople;
        this.sickContactsArray = this.contacts.filter((p) => p.sickInformation.sick);
      }));
  }

}
