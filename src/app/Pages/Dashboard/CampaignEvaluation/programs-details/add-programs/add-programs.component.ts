import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrManager } from "ng6-toastr-notifications";
import { KYCService } from "src/app/shared/Services/kyc.service";
import { environment } from "src/environments/environment";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-add-programs",
  templateUrl: "./add-programs.component.html",
  styleUrls: ["./add-programs.component.css"],
})
export class AddProgramsComponent implements OnInit {
  programForm: FormGroup;
  LANG = environment.english_translations;
  programId: number;
  directors: any;
  constructor(
    private fb: FormBuilder,
    private kycService: KYCService,
    private toast: ToastrManager,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.programId = +params["id"]; // Extract and convert 'id' to a number
    });
    this.programForm = this.fb.group({
      campagin_id: [
        { value: this.programId, disabled: false },
        Validators.required,
      ],

      directors: ["", Validators.required],
      Licensing: ["", Validators.required],
      Licensing_Purpose: ["", Validators.required],
      SPV_trustee: ["", Validators.required],
      spv: ["", Validators.required],
      sukuk: ["", Validators.required],
      Sukuk_products: ["", Validators.required],
      Issuer_Paying_Agent: ["", Validators.required],
      sukk_face_value: ["", Validators.required],
      Platform_Admin: ["", Validators.required],
      funding_purpose: ["", Validators.required],
      program_tot_face_value: ["", Validators.required],
      sponsor: ["", Validators.required],
      sponsor_Role_desc: ["", Validators.required],
      Sponsor_commitment: ["", Validators.required],
      sponsor_repres: ["", Validators.required],
      subs_mony_Retur: ["", Validators.required],
      Risk_factors: ["", Validators.required],
      Beneficiary: ["", Validators.required],
      entity_beneficiary_Legal: ["", Validators.required],
      Beneficiary_activities: ["", Validators.required],
      Beneficiary_capital: [null, [Validators.required]],
      company_owners: ["", Validators.required],
      conditions_inv_services: ["", Validators.required],
      opportunity__program__infos: ["", Validators.required],
      Subscription_method: ["", Validators.required],
      min_max_subscription: ["", Validators.required],
      Alloc_Offering_restricts: ["", Validators.required],
      property_Promissory_note: ["", Validators.required],
      ruling_regime: ["", Validators.required],
      sukk_document: ["", Validators.required],
      beneficiary_promissory_note: ["", Validators.required],
      offering_proceeds_use: ["", Validators.required],
      early_redemption: ["", Validators.required],
      sukuk_extinguishing: ["", Validators.required],
      Periodic_distrib_amount: [null, [Validators.required]],
      role_custodian_Desc: ["", Validators.required],
      Sukuk_Restrictions: ["", Validators.required],
      Sukuk_assets: ["", Validators.required],
      Murabaha_contract: ["", Validators.required],
      Investment_custody: ["", Validators.required],
      Investment_management: ["", Validators.required],
      Management_fee: [null, [Validators.required]],
      Fund_distribution: ["", Validators.required],
      Valuation_frequency: ["", Validators.required],
      Legal_documents: ["", Validators.required],
      Final_approved_documents: ["", Validators.required],
      Approval_date: ["", Validators.required],
      Release_Date: ["", Validators.required],
      Redemption_date: ["", Validators.required],
      Approval_user: ["", Validators.required],
      Approval_status: ["", Validators.required],
      Funding_amount: [null, [Validators.required]],
      contract_start_date: ["", Validators.required],
      contract_end_date: ["", Validators.required],
    });

    this.loadDirectors();
  }

  selectedOptions: { id: number; name: string }[] = [];

  isSelected(id: number): boolean {
    return this.selectedOptions.some((option) => option.id === id);
  }

  toggleSelection(option: any): void {
    if (this.isSelected(option.id)) {
      this.selectedOptions = this.selectedOptions.filter(
        (item) => item.id !== option.id
      );
    } else {
      this.selectedOptions.push(option);
    }

    this.programForm.get("directors")?.setValue(this.selectedOptions);

    this.programForm.get("directors")?.markAsTouched();
  }

  removeOption(option: any): void {
    this.selectedOptions = this.selectedOptions.filter(
      (item) => item.id !== option.id
    );

    this.programForm.get("directors")?.setValue(this.selectedOptions);

    this.programForm.get("directors")?.markAsTouched();
  }
  loadDirectors(): void {
    this.kycService.getDicorators().subscribe(
      (response) => {
        this.directors = response;
      },
      (error) => {
        console.error("Error fetching directors:", error);
      }
    );
  }
  onSubmit() {
    if (this.programForm.valid) {
      const programData = this.programForm.value;

      const directors = this.selectedOptions.map((option) => option.id);
      console.log("programData", programData);
      console.log("directors", directors);
      this.kycService.addProgram(programData, directors).subscribe(
        (response) => {
         if(response){
           this.toast.successToastr(this.LANG.Program_Added_successfully);
          this.programForm.reset();
          this.programForm.get("campagin_id")?.disable();
         }
        },
        (error) => {
          console.error("Error adding program:", error);
          this.toast.warningToastr(error.message);

          this.programForm.get("campagin_id")?.disable();
        }
      );
    } else {
      console.warn("Form is not valid");
    }
  }

  goBack(): void {
    this.location.back();
  }
}
