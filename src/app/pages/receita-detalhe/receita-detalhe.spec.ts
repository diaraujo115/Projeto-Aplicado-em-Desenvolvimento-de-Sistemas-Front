import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaDetalhe } from './receita-detalhe';

describe('ReceitaDetalhe', () => {
  let component: ReceitaDetalhe;
  let fixture: ComponentFixture<ReceitaDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceitaDetalhe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceitaDetalhe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
