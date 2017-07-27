import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresacadastroComponent } from './empresacadastro.component';

describe('EmpresacadastroComponent', () => {
  let component: EmpresacadastroComponent;
  let fixture: ComponentFixture<EmpresacadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresacadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresacadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
