import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { KYCService } from './kyc.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkflowResolverService {

  constructor(private kycService: KYCService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<string[]> {

    // Use 'tap' to log the response without modifying it
    return this.kycService.getPermissions().pipe(
      tap((permissions: string[]) => {
      })
    );
  }
}