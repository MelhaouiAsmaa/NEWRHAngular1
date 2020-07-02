import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChargeComponent } from './update-charge.component';

describe('UpdateChargeComponent', () => {
  let component: UpdateChargeComponent;
  let fixture: ComponentFixture<UpdateChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
