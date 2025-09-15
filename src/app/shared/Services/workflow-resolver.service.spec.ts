import { TestBed } from '@angular/core/testing';

import { WorkflowResolverService } from './workflow-resolver.service';

describe('WorkflowResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkflowResolverService = TestBed.get(WorkflowResolverService);
    expect(service).toBeTruthy();
  });
});
