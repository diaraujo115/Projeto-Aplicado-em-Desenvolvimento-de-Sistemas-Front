import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaNova } from './receita-nova';

describe('ReceitaNova', () => {
  let component: ReceitaNova;
  let fixture: ComponentFixture<ReceitaNova>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceitaNova]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceitaNova);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
