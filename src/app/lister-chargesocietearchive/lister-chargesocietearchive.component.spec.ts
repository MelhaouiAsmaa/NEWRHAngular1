import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerChargesocietearchiveComponent } from './lister-chargesocietearchive.component';

describe('ListerChargesocietearchiveComponent', () => {
  let component: ListerChargesocietearchiveComponent;
  let fixture: ComponentFixture<ListerChargesocietearchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListerChargesocietearchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerChargesocietearchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
