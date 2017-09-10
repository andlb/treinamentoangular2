import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinicializarsenhaComponent } from './reinicializarsenha.component';

describe('ReinicializarsenhaComponent', () => {
  let component: ReinicializarsenhaComponent;
  let fixture: ComponentFixture<ReinicializarsenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReinicializarsenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReinicializarsenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
