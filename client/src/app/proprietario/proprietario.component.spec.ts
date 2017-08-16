import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietarioComponent } from './proprietario.component';

describe('ProprietarioComponent', () => {
  let component: ProprietarioComponent;
  let fixture: ComponentFixture<ProprietarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProprietarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProprietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
