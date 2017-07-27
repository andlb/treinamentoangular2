import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaservicoComponent } from './empresaservico.component';

describe('EmpresaservicoComponent', () => {
  let component: EmpresaservicoComponent;
  let fixture: ComponentFixture<EmpresaservicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaservicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaservicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
