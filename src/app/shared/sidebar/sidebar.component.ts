import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SharedService } from '../Services/shared.service';
import { environment } from 'src/environments/environment';
import { Navigations } from '../enum';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls:['./sidebar.css']
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  permissions: string[] = [];
  showSubMenu = '';
  public sidebarnavItems: any[];
  LANG=environment.english_translations;
  user_data:any={};
  navigation_options=Navigations;
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element; 
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private toast:ToastrManager,
    private shared:SharedService
  ) {
   
  
  }
  navigateToTransferB2B(itemId: number) {
    this.router.navigate(['/dashboard/transfer-b2b', itemId]);
  }
  // End open close
  ngOnInit() {
    // this.route.data.subscribe((data) => {
    //   this.permissions = data['permissions'] || [];

    //   // Check if 'approval' exists in the permissions array
    //   this.showApprovalSection = this.permissions.includes('approval');

    //   console.log('Permissions:', this.permissions);
    //   console.log('Show Approval Section:', this.showApprovalSection);
    // });
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
  }

  logout(){
    localStorage.clear();
    this.toast.successToastr("Logout successfully");
    this.shared.changeUser(false);
    setTimeout(() => {
        this.router.navigate(['/login'])
    }, 500);
  }

  goToSections(type:string){
    this.router.navigate(["/dashboard/section-list"],{queryParams:{type:btoa(btoa(type))}})
  }


  checkRoute(data){
    const role=this.user_data?.access_control?.split(",");
    let index=role?.findIndex(item=>{return item == data?.toString()})
 
    if(index == -1){
      return null;
    }
    return true;
  }


}
