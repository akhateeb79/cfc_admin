import { Injectable } from '@angular/core';
import { Router , CanActivate } from '@angular/router';
import { SharedService } from './shared.service';
import { KYCService } from '../Services/kyc.service';

@Injectable({providedIn: 'root'})
export class authGuard implements CanActivate {
    public logged_in:boolean=false;



    constructor(private router: Router,private shared:SharedService,private KYCService: KYCService ) {
        this.shared.currentUser.subscribe(user=>this.logged_in=user);
        if (localStorage.getItem('ice-web-dashboard')) {
            this.logged_in=true;
        }
      
        
     }
   
     canActivate(): boolean {
      const isLoggedIn = localStorage.getItem('ice-web-dashboard') !== null;
  
      if (isLoggedIn) {
        return true;
      }
      console.warn('Unauthorized access. Redirecting to login...');
      // Ensure navigation happens successfully
      this.router.navigate(['/login']).then(() => {
      }).catch(err => {
        console.error('Navigation to login page failed:', err);
      });
    
      return false; // Deny navigation
    }
  }    