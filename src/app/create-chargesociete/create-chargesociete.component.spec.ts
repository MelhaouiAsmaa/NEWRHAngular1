import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChargesocieteComponent } from './create-chargesociete.component';

describe('CreateChargesocieteComponent', () => {
  let component: CreateChargesocieteComponent;
  let fixture: ComponentFixture<CreateChargesocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChargesocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChargesocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
