import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChargesocieteComponent } from './update-chargesociete.component';

describe('UpdateChargesocieteComponent', () => {
  let component: UpdateChargesocieteComponent;
  let fixture: ComponentFixture<UpdateChargesocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateChargesocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChargesocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
