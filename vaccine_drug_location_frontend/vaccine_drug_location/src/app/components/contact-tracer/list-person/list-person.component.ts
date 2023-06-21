import {Component} from '@angular/core';
import {PersonService} from "../../../services/person.service";
import {Person} from "../../../entities/Person";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.scss']
})
export class ListPersonComponent {

  public people: Person[] = [];

  constructor(private personService: PersonService, private router: Router) {
  }

  ngOnInit() {
    this.personService.getPeople().subscribe((people) => {
      this.people = people;
    })
  }

  deletePerson(svnr: number) {
    this.personService.deletePerson(svnr).subscribe(() => {
      this.router.navigate(['ct-home']);
    });
  }

}
