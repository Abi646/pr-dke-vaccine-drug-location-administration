import {Component} from '@angular/core';
import {PersonService} from "../../../services/person.service";
import {emptyPerson, Person} from "../../../entities/Person";
import {Router} from "@angular/router";
import {StateService} from "../../../services/state.service";

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent {

  public person: Person = emptyPerson;

  public allPeople: Person[] = [];
  public selectedPeople: Person[] = [];

  public states: string[] = [];
  public counties: string[] = [];

  constructor(private personService: PersonService, private stateService: StateService, private router: Router) {
  }

  changeCounties(event: any) {
    this.counties = this.stateService.getCountiesByState(event.value);
  }

  ngOnInit() {
    this.states = this.stateService.getAllStates();
    this.counties = this.stateService.getCountiesByState(this.states[0]);

    this.personService.getPeople().subscribe((allPeople) => {
      this.allPeople = allPeople.filter(value => value.svnr !== this.person.svnr);
    });
  }

  savePerson() {
    this.personService.addPerson(this.person).subscribe((newPerson) => {
      console.log('newPerson', newPerson);
      this.router.navigate(['ct-home']);
    });
  }

  updateSelectedPeople() {
    const svnrs = this.selectedPeople.map(s => s.svnr.toString());
    this.person.contacts = svnrs;
  }

}
