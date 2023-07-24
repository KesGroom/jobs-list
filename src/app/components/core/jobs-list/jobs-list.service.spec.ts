/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JobsListService } from './jobs-list.service';

describe('Service: JobsList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobsListService]
    });
  });

  it('should ...', inject([JobsListService], (service: JobsListService) => {
    expect(service).toBeTruthy();
  }));
});
