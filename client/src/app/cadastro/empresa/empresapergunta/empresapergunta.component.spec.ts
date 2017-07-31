import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaperguntaComponent } from './empresapergunta.component';

describe('EmpresaperguntaComponent', () => {
  let component: EmpresaperguntaComponent;
  let fixture: ComponentFixture<EmpresaperguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaperguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaperguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
