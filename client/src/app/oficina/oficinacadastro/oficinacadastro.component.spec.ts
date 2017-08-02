import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OficinacadastroComponent } from './oficinacadastro.component';

describe('OficinacadastroComponent', () => {
  let component: OficinacadastroComponent;
  let fixture: ComponentFixture<OficinacadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OficinacadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OficinacadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
