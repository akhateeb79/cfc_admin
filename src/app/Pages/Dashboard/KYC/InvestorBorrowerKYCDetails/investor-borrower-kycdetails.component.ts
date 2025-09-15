import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Params, Router } from "@angular/router";
import { KYCService } from "src/app/shared/Services/kyc.service";
import { FieldType } from "src/app/shared/enums";
import { ToastrManager } from "ng6-toastr-notifications";
import { environment } from "src/environments/environment";
import { CrNumber } from "src/app/shared/Models/cr-number";
import { DatePipe, Location } from "@angular/common";
import { filter } from "rxjs/operators";
import { UsersService } from "src/app/shared/Services/user.service";
import { InvsetorAgreementComponent } from "../invsetor-agreement/invsetor-agreement.component";
import moment from "moment-hijri";
declare const $: any;

@Component({
  selector: "app-investor-borrower-kycdetails",
  templateUrl: "./investor-borrower-kycdetails.component.html",
  styleUrls: ["./investor-borrower-kycdetails.component.css"],
})
export class InvestorBorrowerKYCDetailsComponent implements OnInit, OnDestroy {
  @ViewChild(InvsetorAgreementComponent, { static: false })
  childComponent!: InvsetorAgreementComponent;
  id: string;
  reason: string = "";
  load: boolean = false;
  pending_load: boolean = false;
  details: any = [];
  field_types = FieldType;
  LANG = environment.english_translations;
  crNumberStr: any;
  crNumber: CrNumber = new CrNumber();
  qualifiedInvestor: any = {
    id: 0,
    investor_id: "",
    min3WorkYear_url: "",
    certificateCME1_url: "",
    professionalCertificate_url: "",
    investTenOpport_url: "",
    netOrigin_url: "",
    created_at: "",
    updated_at: "",
  };
  pdfUrl$: boolean = false;
  watheqDataFromUser: any;
  post_data: any;
  verifyCR: any;
  previousUrl: any;
  currentUrl: string;
  currentPageType: string;
  adminName: any;

  name: any = "";
  investorId: any = "";
  date: string = "";
  dateH: string = "";
  companyLocation: any = "";
  isSaudi: boolean = false;
  is_qualified: any = 0;
  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private kycService: KYCService,
    private toast: ToastrManager,
    private router: Router,
    private location: Location,
    private usersService: UsersService
  ) {
    this.date = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.dateH = moment().format("iYYYY-iMM-iDD");
  }

  triggerChildFunction() {
    this.childComponent.generateAndDownloadWord(this.id);
  }

  comercialReg(reg) {
    this.load = true;
    this.kycService
      .commercialregistration(reg)
      .subscribe((fullWatheqData: any) => {
        if (fullWatheqData.status) {
          this.post_data = [
            {
              id: 74,
              kyc_id: "9",
              type: 9,
              info_type: 16,
              title: "السجل التجاري",
              length: "",
              mandatory: 1,
              status: "1",
              position: 1,
              user_kyc_id: "",
              value: fullWatheqData.response.crNumber,
              required: false,
              invalid: false,
            },
            {
              id: 112,
              kyc_id: "9",
              type: 6,
              info_type: 16,
              title: "اسم المنشأة",
              length: "",
              mandatory: 1,
              status: "1",
              position: 1,
              user_kyc_id: "",
              value: fullWatheqData.response.crName,
              required: false,
              invalid: false,
            },
            {
              id: 113,
              kyc_id: "9",
              type: 6,
              info_type: 16,
              title: "crEntityNumber",
              length: "",
              mandatory: 1,
              status: "1",
              position: 3,
              user_kyc_id: "",
              value: fullWatheqData.response.crEntityNumber,
              required: false,
              invalid: false,
            },
            {
              id: 114,
              kyc_id: "9",
              type: 1,
              info_type: 16,
              title: "نوع العمل",
              length: "",
              mandatory: 1,
              status: "1",
              position: 4,
              user_kyc_id: "",
              value: fullWatheqData.response.businessType.name,
              required: false,
              invalid: false,
            },
            {
              id: 115,
              kyc_id: "9",
              type: 7,
              info_type: 16,
              title: "تاريخ الاصدار",
              length: "",
              mandatory: 1,
              status: "1",
              position: 5,
              user_kyc_id: "",
              value: fullWatheqData.response.issueDate,
              required: false,
              invalid: false,
            },
            {
              id: 116,
              kyc_id: "9",
              type: 7,
              info_type: 16,
              title: "تاريخ الانتهاء",
              length: "",
              mandatory: 1,
              status: "1",
              position: 6,
              user_kyc_id: "",
              value: fullWatheqData.response.expiryDate,
              required: false,
              invalid: false,
            },
          ];
          const data = {
            field: this.post_data,
            crnumber: JSON.stringify(fullWatheqData.response),
            id: this.id,
          };
          this.kycService.addKyc(data).subscribe((res: any) => {
            if (res.status) {
              this.load = false;
              this.toast.successToastr("Watheq Data is Verified");
            } else {
              this.toast.warningToastr(
                "Data cannot be added because its not verified"
              );
              this.load = false;
            }
          });
          this.getQualifiedInvestor();
          this.getWatheqData();
        } else {
          this.toast.warningToastr("Watheq Data is not verified");
          this.load = false;
        }
      });
  }
  allFiledText: any[];
  allFields: any[];
  allValues: any[];
  actionType: string = "";
  logDateTime: string = "";
  originalValue: string;
  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params["id"]) {
        this.id = atob(atob(params["id"]));

        this.getQualifiedInvestor();
        this.getWatheqData();
      }
    });
 
    this.initializeData();
    this.crNumber = new CrNumber();
  }
  storeOriginalValue(fields: any) {
    this.originalValue = fields;
  }
  onFieldChange(fieldName: string, originalValue: string, change: any): void {
    let value;
    if (originalValue !== undefined) value = `${originalValue} => ${change}`;
    else {
      value = `Not Set => ${change}`;
    }
    this.allFiledText.push({ fieldName, value });
  }
  setActionType(action: string): void {
    this.actionType = action;
    (this.logDateTime = this.currentPageType || "Investor_Borrower Page"),
      this.saveChanges();
  }
  setIsQualified(status: any) {
    this.kycService.changeIsQualified(status, this.id).subscribe((res: any) => {
      this.is_qualified = status;
      this.toast.successToastr(res.response);
    });
  }
  initializeData() {
    this.allFiledText = [];
    this.actionType = "";
    (this.logDateTime = this.currentPageType || "Investor_Borrower Page"),
      (this.adminName = localStorage.getItem("name"));
  }
  saveChanges(): void {
    setTimeout(() => {
      const data = {
        UserName: this.adminName,
        ActionType: this.actionType,
        LogDateTime: this.currentPageType || "Investor_Borrower Page",
      };
      this.kycService.storeTrack(data).subscribe((res: any) => {
        if (res) {
          this.allFiledText.map((obj) => {
            obj.Field = obj.fieldName;
            obj.Value = obj.value;
            obj.master_id = res.response.id;
          });
          this.allFiledText.forEach((obj) => {
            this.kycService.insertLog(obj).subscribe((res) => {});
          });
        }
      });
    }, 0);
  }
  getWatheqData() {
    this.load = true;
    this.kycService.getWatheqData({ id: this.id }).subscribe((res: any) => {
      if (res.status) {
        this.watheqDataFromUser = res.response[0];
        this.load = false;
      } else {
        this.toast.warningToastr("No records were found");
        this.load = false;
      }
    });
  }
  getQualifiedInvestor() {
      console.log("this.getQualifiedInvestor()");
    this.kycService.getQualifInvestorDetails(this.id).subscribe((res: any) => {
      if (res.status) {
            console.log("this.getKYCDetails(1);");
        this.qualifiedInvestor = res.response[0];
         this.getKYCDetails(1);

      }
      else {
              console.log("this.getKYCDetails(2);");
           this.getKYCDetails(2);
      }
    });
  }

 getKYCDetails(type?: any) {
  this.load = true;

  console.log("type", type);

  this.kycService.getUserKycDetails(this.id).subscribe({
    next: (res: any) => {
      if (!res?.status) return;

      this.is_qualified = res?.response?.is_qualified;
     

      const detailArray = res?.response?.detail || [];
      const detailId = type == 1 ? 2 : 2;
      const companyLocationId = type == 1 ? 1 : 9;
      const companyLocationInfoType = type == 1 ? 1 : 21;
      const companyLocationFieldId = type == 1 ? 162 : 19;

      const detailSection = detailArray.find((item) => item?.id === detailId);
      const infoType19 = detailSection?.info_type?.find(i => i?.info_type == 19);
      const DETAILS = infoType19?.detail || [];

      this.name = DETAILS.find((key) => key?.id == 137)?.value || "";
      this.investorId = DETAILS.find((key) => key?.id == 135)?.value || "";

      const locationSection = detailArray.find((item) => item?.id === companyLocationId);
      const locationInfoType = locationSection?.info_type?.find(i => i?.info_type == companyLocationInfoType);
      this.companyLocation = locationInfoType?.detail?.find((f) => f?.id == companyLocationFieldId)?.value || "";

      const isSaudi132 = DETAILS.find((key) => key?.id == 132)?.value;
      const isSaudi136 = DETAILS.find((key) => key?.id == 136)?.value;
      this.isSaudi = isSaudi132 !== null && isSaudi136 == null;

      this.details = res?.response;
      this.details.display_mobile_number = `${this.details.country_code || ""}${this.details.mobile_number || ""}`;

      if (
        res?.response?.cr_number_response != null &&
        res?.response?.cr_number_response != "null"
      ) {
        try {
          this.crNumber = JSON.parse(this.details.cr_number_response);
        } catch {
          this.crNumber = new CrNumber();
        }
      } else {
        this.crNumber = new CrNumber();
      }

      this.load = false;
       console.log("res.response", res.response);
    },
    error: (err) => {
      console.error("Failed to get KYC details", err);
      this.load = false;
    }
  });
}


  approveRejectKYC(status: string) {
    const data: any = {
      user_id: this.id,
      approved_status: status,
      note: this.reason,
    };
    let message = this.LANG.KYC_Approved;
    if (status == "2") {
      if (this.reason == "" || this.reason == undefined) {
        this.toast.warningToastr(this.LANG.Please_give_reason_for_rejection);
        return;
      }
      message = this.LANG.KYC_Rejected;
      const rejectedData = {
        id: this.id,
        textEn: "Your KYC not completed please update and resubmit",
        textAr: "بيانات التحقق غير مكتملة الرجاء التحديث وإعادة الإرسال",
      };
      this.kycService.sendUserStatus(rejectedData).subscribe((res) => {});
    }
    if (status == "1") {
      this.load = true;
      const approvedData = {
        id: this.id,
        textEn: "Your KYC is accepted. You’re now fully verified",
        textAr: "تم قبول بيانات التحقق. أنت الآن مُوثَّق",
      };
      this.kycService.sendUserStatus(approvedData).subscribe((res) => {});
    } else if (status == "0") {
      this.pending_load = true;
    }

    this.kycService.approveRejectKYC(data).subscribe((res: any) => {
      this.load = false;
      this.pending_load = false;
      if (res.status) {
        this.triggerChildFunction();
        this.toast.successToastr(message);
        $("#reject").modal("hide");
        this.reason = "";
      }
    });
  }
  downloadPdf() {}
  ngOnDestroy(): void {}
}
