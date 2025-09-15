import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  @Output()
  toggleSidebar = new EventEmitter<void>();
  LANG=environment.english_translations;
  public showSearch = false;
  name: string;

  constructor(private router:Router,private shared:SharedService) {
    this.name=localStorage.getItem("name")
  }

  logout(){
    localStorage.clear();
    this.shared.changeUser(false);
    setTimeout(() => {
      this.router.navigate(['/login'])
    }, 500);
  }
}
