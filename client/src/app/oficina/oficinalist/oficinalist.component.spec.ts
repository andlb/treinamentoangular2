import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OficinalistComponent } from './oficinalist.component';

describe('OficinalistComponent', () => {
  let component: OficinalistComponent;
  let fixture: ComponentFixture<OficinalistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OficinalistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OficinalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
