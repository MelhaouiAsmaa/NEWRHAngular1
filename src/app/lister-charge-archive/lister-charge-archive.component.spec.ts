import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerChargeArchiveComponent } from './lister-charge-archive.component';

describe('ListerChargeArchiveComponent', () => {
  let component: ListerChargeArchiveComponent;
  let fixture: ComponentFixture<ListerChargeArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListerChargeArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerChargeArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
