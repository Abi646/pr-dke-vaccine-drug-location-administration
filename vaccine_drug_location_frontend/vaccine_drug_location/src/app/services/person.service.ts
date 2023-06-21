import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "../entities/Person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private readonly baseurl = 'http://localhost:9191/';
  private readonly medicationURL = 'http://localhost:9192/';

  constructor(private http: HttpClient) {
  }

  public getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseurl + 'person');
  }

  public getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(this.baseurl + 'person/' + id);
  }

  public getContacts(id: number): Observable<String[]> {
    return this.http.get<String[]>(this.baseurl + 'person/' + id + '/contacts');
  }

  public getPeopleBySvnr(svnrs: number[]): Observable<Person[]> {
    return this.http.put<Person[]>(this.baseurl + 'persons/', svnrs);
  }

  public getPeopleByStateAndCounty(state: string, county: string): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseurl + `persons/${state}/${county}`);
  }

  public getTotalAmountOfPeople(): Observable<number> {
    return this.http.get<number>(this.baseurl + 'persons/length');
  }

  public getTotalAmountOfPeopleByStateAndCounty(state: string, county: string): Observable<number> {
    return this.http.get<number>(this.baseurl + `persons/length/${state}/${county}`);
  }

  public getMedicationAppointmentsByStateAndCounty(state: string, county: string): Observable<number> {
    if (county === 'Linz') {
      county = 'Linz-Stadt';
    }
    return this.http.get<number>(this.baseurl + `counties/${county}/nr-persons-medication/`);
  }

  public addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.baseurl + 'person', person);
  }

  public updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(this.baseurl + 'person/' + person.svnr, person);
  }

  public deletePerson(svnr: number): Observable<any> {
    return this.http.delete<any>(this.baseurl + 'person/' + svnr);
  }

}
