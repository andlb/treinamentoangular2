import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresafuncionarioComponent } from './empresafuncionario.component';

describe('EmpresafuncionarioComponent', () => {
  let component: EmpresafuncionarioComponent;
  let fixture: ComponentFixture<EmpresafuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresafuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresafuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
