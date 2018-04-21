import { TestBed, inject } from '@angular/core/testing';

import { DatabaseServicioService } from './database-servicio.service';

describe('DatabaseServicioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseServicioService]
    });
  });

  it('should be created', inject([DatabaseServicioService], (service: DatabaseServicioService) => {
    expect(service).toBeTruthy();
  }));
});
