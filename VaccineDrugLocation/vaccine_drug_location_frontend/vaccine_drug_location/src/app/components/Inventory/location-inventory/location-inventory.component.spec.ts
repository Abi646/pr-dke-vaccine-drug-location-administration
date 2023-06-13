import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationInventoryComponent } from './location-inventory.component';

describe('LocationInventoryComponent', () => {
  let component: LocationInventoryComponent;
  let fixture: ComponentFixture<LocationInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
