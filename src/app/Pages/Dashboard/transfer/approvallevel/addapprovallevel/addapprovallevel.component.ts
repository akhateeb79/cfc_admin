import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { UsersService } from 'src/app/shared/Services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addapprovallevel',
  templateUrl: './addapprovallevel.component.html',
  styleUrls: ['./addapprovallevel.component.css']
})
export class AddapprovallevelComponent implements OnInit {
  LANG = environment.english_translations;
  workflowForm: FormGroup;
  menuOptions: any[] = [];  // To store Menu options
  roleOptions: any[] = [];  // To store Role options
  dynamicOptions: any[] = [];  // This will hold the dynamic options for the second dropdown

  constructor(
    private route: ActivatedRoute,
    private kycService: KYCService,
    private adminService: UsersService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private toast: ToastrManager,
    private modalService: NgbModal,
    private router: Router
  ) {
    // Initialize the form
    this.workflowForm = this.fb.group({
      name: new FormControl('', Validators.required),
   
      type_role: ['', Validators.required],  // Create control
      type_department: [[], Validators.required], 
    });
  }

  ngOnInit(): void {

    // Retrieve the value from local storage
    // const storedTypeRole = localStorage.getItem('type-role');
    // if (storedTypeRole) {
    //   this.workflowForm.get('type_role')?.setValue(storedTypeRole);
    // }
    this.getRoleData();
  
  }
  selectedOptions: { id: number, title: string }[] = [];

  // Toggle selection (add/remove options)
  toggleSelection(option: { id: number, title: string }) {
    const index = this.selectedOptions.findIndex(selected => selected.id === option.id);
    if (index === -1) {
      // Option is not selected, add it
      this.selectedOptions.push(option);
    } else {
      // Option is already selected, remove it
      this.selectedOptions.splice(index, 1);
    }
  
    // Update the form control value to the current selected options
    const selectedIds = this.selectedOptions.map(option => option.id);
    this.workflowForm.get('type_department')?.setValue(selectedIds);
  
    // Mark the control as touched if there are no selected options
    if (this.selectedOptions.length === 0) {
      this.workflowForm.get('type_department')?.setErrors({ required: true });
    } else {
      this.workflowForm.get('type_department')?.setErrors(null);
    }
  }

  // Check if an option is selected
  isSelected(option: { id: number }): boolean {
    return this.selectedOptions.some(selected => selected.id === option.id);
  }

  // Remove a selected option (chip)
  removeOption(option: { id: number, title: string }) {
    this.selectedOptions = this.selectedOptions.filter(selected => selected.id !== option.id);
  }
  getRoleData(): void {
    const selectedType = this.workflowForm.get('type_role').value;

    // Fetch the data from API
    this.adminService.adminLevels(1).subscribe((data: any) => {
      this.menuOptions = data.response.user_type
      ; 

      this.menuOptions = this.menuOptions.filter((userType: any) => {
        const title = userType.title.trim().toLowerCase();
        return title !== 'investor' && title !== 'borrower';
      });
      // if (data.status) {
      //   // Check and save keys 'menu' and 'role' in the arrays
      //   if (data.response.menu) {
      //     this.menuOptions = data.response.menu; // Save menu options
      //   }
      //   if (data.response.role) {
      //     this.roleOptions = data.response.role; // Save role options
      //   }
      //   console.log("data", data, this.menuOptions, this.roleOptions);
      // }
    });
  }

  onDepartmentTypeChange(): void {
    const selectedType = this.workflowForm.get('type_role').value;
    if (selectedType === '1') { // If "Menu" is selected
      this.dynamicOptions = this.menuOptions; // Populate with menu options
    } else if (selectedType === '2') { // If "Role" is selected
      this.dynamicOptions = this.roleOptions; // Populate with role options
    } else {
      this.dynamicOptions = []; // Clear options if none are selected
    }
  }




  save() {
    if (this.workflowForm.valid) {
      const name = this.workflowForm.get('name')?.value;
      const selectedTypeRoles = this.selectedOptions; // Assuming this is an array of selected options
  
      // Convert selectedTypeRoles to the desired format (e.g., array of IDs)
      const type_roles = selectedTypeRoles.map(option => option.id);
  
  
  
      // Call the service to add workflow
      this.kycService.addapproval(name, type_roles).subscribe(
        (response) => {
          
          // Close the modal and send a success message
          this.activeModal.close({ message: 'Workflow_added_successfully' });
          this.toast.successToastr(this.LANG.Workflow_added_successfully);
        },
        (error) => {
          console.error('Error adding workflow:', error);
          this.toast.warningToastr(error.message);
        }
      );
  
    } else {
      console.warn('Form is not valid.');
    }
  }
  
  
  
    dismiss() {
      this.activeModal.dismiss('Cancel click');
    }
    onItemSelect(item: any) {
      console.log(item);
    }
    onSelectAll(items: any) {
      console.log(items);
    }
  }