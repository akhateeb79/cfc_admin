import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { KYCService } from "src/app/shared/Services/kyc.service";
import { environment } from "src/environments/environment";
import { Validators } from "@angular/forms";
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: "app-update-details",
  templateUrl: "./update-details.component.html",
  styleUrls: ["./update-details.component.css"],
})
export class UpdateDetailsComponent implements OnInit {
  @Input() programId!: number; 
  programForm: FormGroup;
  @Input() id!: number; 

  LANG = environment.english_translations;
  constructor(
    private fb: FormBuilder,
    private kycService: KYCService,
    public activeModal: NgbActiveModal,
    private toast: ToastrManager
  ) {}
  ngOnInit(): void {
    if (this.programId) {
      this.programForm = this.fb.group({
        campaign_id: [
          { value: this.programId, disabled: true },
          Validators.required,
        ],

        psd_director_name: ["", Validators.required],
        psd_director_relation: ["", Validators.required],
        psd_director_nationality: ["", Validators.required],
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
        Periodic_distrib_amount: [
          null,
          [Validators.required],
        ],
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
      this.loadProgramData(this.id);
    }
  }
  private loadProgramData(id: number) {
    this.programForm.get("campaign_id")?.enable();

    this.kycService.getProgramById(id).subscribe(
      (data) => {
        this.programForm.patchValue(data);
      },
      (error) => {
        console.error("Error loading program data", error);
      }
    );
  }
  save(): void {
    if (this.programForm.valid) {
      this.kycService.updateProgram(this.id, this.programForm.value).subscribe(
        (response) => {
          this.activeModal.close({ message: "Data update successfully" });
          this.toast.successToastr(this.LANG.Program_UPDATED_successfully);
        },
        (error) => {
          console.error("Error updating program:", error);
          this.toast.warningToastr(error.message);
        }
      );
    } else {
      console.warn("Form is not valid.");
    }
  }

  dismiss() {
    this.activeModal.dismiss("Cancel click");
  }
}
