import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PersonService} from "../../../services/person.service";
import {emptyPerson, Person} from "../../../entities/Person";

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent {

  public id: number = 0;
  public person: Person = emptyPerson;

  constructor(private route: ActivatedRoute, private personService: PersonService, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.personService.getPerson(this.id).subscribe((person) => {
        this.person = person;
      });
    });
  }

  updatePerson() {
    this.personService.updatePerson(this.person).subscribe((newPerson) => {
      this.router.navigate(['ct-home']);
    });
  }

}
