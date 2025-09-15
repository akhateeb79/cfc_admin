import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
declare const $:any;

@Component({
  templateUrl: './UserRole.component.html',
  styleUrls: ['./UserRole.component.css']
})
export class UserRoleComponent implements OnInit {
  userTypeList:any[]=[];
  kycList=[];
  load:boolean=false;
  LANG=environment.english_translations;
  allFiledText: any[]=[];
  actionType: string='';
  adminName: string='';
  logDateTime: string='';

  constructor(private router:Router,private kycService:KYCService,private toast:ToastrManager) { }

  ngOnInit() {
      this.getInfoTypeList();
      this.initializeData();
  }

  addInfoType(){
    this.router.navigate(["/dashboard/add-info-type"])
  }

  getInfoTypeList(){
    this.kycService.getUserTypeList().subscribe((res:any)=>{
      if(res.status){
        this.userTypeList=res.response.user_type;
        this.getKYCList();
      }
    })
  }

  getKYCList(){
    this.kycService.getKYCList().subscribe((res:any)=>{
      if(res.status){
        this.kycList=res.response;
        setTimeout(() => {
          this.loadSelect2();
        }, 100);
        
      }
    })
  }

  loadSelect2(){
    
    $('.js-example-basic-multiple').select2();
      this.setDefaultValues()
    
    $(".multi-id").select2().on('change', (e) => {
        this.handleMultiSelect(e.target.id)
    });
  }

  setDefaultValues(){
    this.userTypeList.map((data,i)=>{
      const values=[]
        data.value.map(item=>{
          values.push(item.id+","+item.title)
        })
      const id=`#${i}_multi-${data.id}`;
      $(id).val(values);
      $(id).trigger('change');
      return

      
    })
  }
  handleMultiSelect(id) {
    const values = $(`#${id}`).val() || [];
    const index = id.split("_")[0];
    const previousValues = [...this.userTypeList[index].value]; // Store the previous values

    // Clear the array first
    this.userTypeList[index].value = [];

    // Add new values
    values.map(data => {
        const [id, title] = data.split(",");
        const valueIndex = this.userTypeList[index].value.findIndex(item => item.id == id);

        // Only add if the item isn't already in the array
        if (valueIndex === -1) {
            const post_data = { "id": id, "title": title };
            console.log("post_data", post_data);
            this.userTypeList[index].value.push(post_data);
        }
    });

    const changedData = [];

    // Find added items
    this.userTypeList[index].value.forEach(newItem => {
        const found = previousValues.find(item => item.id === newItem.id);
        if (!found) {
            changedData.push({ action: 'Item was ADDED', data: newItem });
        }
    });

    // Find removed items
    previousValues.forEach(oldItem => {
        const found = this.userTypeList[index].value.find(item => item.id === oldItem.id);
        if (!found) {
          changedData.push({ action: 'Item was REMOVED', data: oldItem });
        }
    });

    this.allFiledText.push({ fieldName:this.userTypeList[index].title, value:`${changedData[0].action} ${changedData[0].data.title}` });
    console.log("this.allFiledText", this.allFiledText);
}

 

initializeData() {
  this.allFiledText = [];
  this.actionType = 'Update';
  (this.logDateTime =  "User Roles Page"), (this.adminName = localStorage.getItem("name"));
}
  updateUserRole(){
    this.load=true;
    const data={
      "user_type":this.userTypeList
    }
    const TRACK_DATA= {
      UserName: this.adminName,
      ActionType: this.actionType,
      LogDateTime: 'User Roles Page',
    };
    this.kycService.updateUserRole(data).subscribe((res:any)=>{
      this.load=false;
      if(res.status){
        this.kycService.storeTrack(TRACK_DATA).subscribe((res: any) => {
          if (res) {
            this.allFiledText.map((obj) => {
              obj.Field = obj.fieldName;
              obj.Value = obj.value;
              obj.master_id = res.response.id;
            });
            this.allFiledText.forEach((obj) => {
              this.kycService.insertLog(obj).subscribe((res) => { });
            });
          }
        });
        this.toast.successToastr(this.LANG.User_roles_updated_successfully);
        return
      }
      this.toast.warningToastr(res.response.message)
      
    })
  }



}
