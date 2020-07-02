import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerSocieteArchiveComponent } from './lister-societe-archive.component';

describe('ListerSocieteArchiveComponent', () => {
  let component: ListerSocieteArchiveComponent;
  let fixture: ComponentFixture<ListerSocieteArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListerSocieteArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerSocieteArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
