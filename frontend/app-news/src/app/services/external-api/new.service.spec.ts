import { TestBed } from '@angular/core/testing';

import { NewService } from './new.service';
import { HttpClientModule } from '@angular/common/http';

describe('NewService', () => {
  let service: NewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(NewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
