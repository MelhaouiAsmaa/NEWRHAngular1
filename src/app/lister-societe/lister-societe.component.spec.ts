import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerSocieteComponent } from './lister-societe.component';

describe('ListerSocieteComponent', () => {
  let component: ListerSocieteComponent;
  let fixture: ComponentFixture<ListerSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListerSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
