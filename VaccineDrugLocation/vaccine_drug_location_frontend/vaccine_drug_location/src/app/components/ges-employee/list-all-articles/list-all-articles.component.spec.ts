import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllArticlesComponent } from './list-all-articles.component';

describe('ListAllArticlesComponent', () => {
  let component: ListAllArticlesComponent;
  let fixture: ComponentFixture<ListAllArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAllArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
