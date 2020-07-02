import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerChargesocieteComponent } from './lister-chargesociete.component';

describe('ListerChargesocieteComponent', () => {
  let component: ListerChargesocieteComponent;
  let fixture: ComponentFixture<ListerChargesocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListerChargesocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerChargesocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
