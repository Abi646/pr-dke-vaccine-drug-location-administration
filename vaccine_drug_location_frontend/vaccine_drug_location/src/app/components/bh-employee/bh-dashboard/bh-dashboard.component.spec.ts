import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BhDashboardComponent } from './bh-dashboard.component';

describe('BhDashboardComponent', () => {
  let component: BhDashboardComponent;
  let fixture: ComponentFixture<BhDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BhDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BhDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
