import { TestBed, inject } from '@angular/core/testing';

import { AuthTokenInterceptorService } from './auth-token-interceptor.service';

describe('AuthTokenInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthTokenInterceptorService]
    });
  });

  it('should be created', inject([AuthTokenInterceptorService], (service: AuthTokenInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
