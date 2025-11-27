import { TestBed } from '@angular/core/testing';

import { RecomendacaoState } from './recomendacao-state';

describe('RecomendacaoState', () => {
  let service: RecomendacaoState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecomendacaoState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
