import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendarPorIngredientes } from './recomendar-por-ingredientes';

describe('RecomendarPorIngredientes', () => {
  let component: RecomendarPorIngredientes;
  let fixture: ComponentFixture<RecomendarPorIngredientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomendarPorIngredientes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecomendarPorIngredientes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
