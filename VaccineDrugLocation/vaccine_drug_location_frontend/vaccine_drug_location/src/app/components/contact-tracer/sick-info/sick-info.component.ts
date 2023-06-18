import {Component} from '@angular/core';
import {emptyPerson, Person} from "../../../entities/Person";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonService} from "../../../services/person.service";

@Component({
  selector: 'app-sick-info',
  templateUrl: './sick-info.component.html',
  styleUrls: ['./sick-info.component.scss']
})
export class SickInfoComponent {

  public id: number = 0;
  public person: Person = emptyPerson;
  public minDate :Date = new Date();

  public contacts: Person[] = [emptyPerson];
  public sickContactsArray: Person[] = [];

  constructor(private route: ActivatedRoute, private personService: PersonService, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.personService.getPerson(this.id).subscribe((person) => {
        this.person = person;
        if (this.person.contacts.length > 0) {
          this.getContacts();
        }

        this.updatePotential();
      });
    });
  }

  updatePerson() {
    this.personService.updatePerson(this.person).subscribe((newPerson) => {
      this.router.navigate(['ct-home']);
    });
  }

  getContacts() {
    this.personService.getPeopleBySvnr(this.person.contacts.map(value => parseInt(value)) ?? []).subscribe((contactPeople) => {
      console.log(contactPeople);
      this.contacts = contactPeople;
      this.sickContactsArray = this.contacts.filter((p) => p.sickInformation.sick);
    });
  }

  sendContactsToQuarantine() {
    this.sickContactsArray.map((c) => {
      c.sickInformation.quarantine = true;
      const newDate = new Date();
      c.sickInformation.quarantineStartDate = newDate;
      c.sickInformation.quarantineEndDate = new Date(newDate.getTime() + 10 * 24 * 60 * 60 * 1000);

      this.personService.updatePerson(c).subscribe();
    });
  }

  updatePotential() {
    if (this.person.sickInformation.symptoms) {
      this.person.sickInformation.potential = true;
    }
  }

}
