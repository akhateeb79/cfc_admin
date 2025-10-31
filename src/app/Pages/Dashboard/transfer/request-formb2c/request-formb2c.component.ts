import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { ToastrManager } from "ng6-toastr-notifications";
import { KYCService } from "src/app/shared/Services/kyc.service";
import { UsersService } from "src/app/shared/Services/user.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-request-formb2c",
  templateUrl: "./request-formb2c.component.html",
  styleUrls: ["./request-formb2c.component.css"],
})
export class RequestFormb2cComponent implements OnInit {
  fromAccount: string = "";
  toAccount: any = null;
  loading: boolean = false;
  error: string = "";
  info: any = null;
  fromAccounts: any = [
    "0108095517580016",
    "0190095517580017",
    "0108095517580018",
  ];
  toAccounts: any = [
    "0108095517580016",
    "0190095517580017",
    "0108095517580018",
  ];
  amount: any = 0;
  userList: any[] = [];
  pickedAccountData: any;
  public LANG = environment.english_translations;

  @Input() itemId: any;
  @Input() approvalLevelId: any;
  userId: number;
  requestNumber: number;
  pickedBank: any;
  banks = [
    {
      nameEn: "Saudi Awwal Bank",
      nameAr: "البنك السعودي الأول",
      bic: "SABBSARI",
    },
    {
      nameEn: "BANQUE SAUDI FRANSI",
      nameAr: "البنك السعودي الفرنسي",
      bic: "BSFRSARI",
    },
    { nameEn: "Al-Inma Bank", nameAr: "بنك الإنماء", bic: "INMASARI" },
    {
      nameEn: "ARAB NATIONAL BANK",
      nameAr: "البنك العربي الوطني",
      bic: "ARNBSARI",
    },
    { nameEn: "AL RAJHI BANK", nameAr: "مصرف الراجحي", bic: "RJHISARI" },
    { nameEn: "BANK AL-JAZIRA", nameAr: "البنك الجزيرة", bic: "BJAZSAJE" },
    { nameEn: "Bank Muscat", nameAr: "بنك مسقط", bic: "BMUSSARI" },
    {
      nameEn: "Emirates (NBD)",
      nameAr: "بنك الإمارات الدولي",
      bic: "EBILSARI",
    },
    {
      nameEn: "FIRST ABU DHABI BANK",
      nameAr: "بنك أبوظبي الأول",
      bic: "FABMSARI",
    },
    {
      nameEn: "JP Morgan Chase Bank N.A (Riyadh Branch)",
      nameAr: "بنك جي بي مورغان تشيس (فرع الرياض)",
      bic: "CHASSARI",
    },
    { nameEn: "BNP PARIBAS", nameAr: "بي ان بي باريبا", bic: "BNPASARI" },
    {
      nameEn: "Gulf International Bank",
      nameAr: "بنك الخليج الدولي",
      bic: "GULFSARI",
    },
    { nameEn: "BANK AL BILAD", nameAr: "بنك البلاد", bic: "ALBISARI" },
    {
      nameEn: "NATIONAL BANK OF BAHRAIN",
      nameAr: "بنك البحرين الوطني",
      bic: "NBOBSARI",
    },
    {
      nameEn: "NATIONAL BANK OF KUWAIT",
      nameAr: "بنك الكويت الوطني",
      bic: "NBOKSAJE",
    },
    {
      nameEn: "SAUDI NATIONAL BANK",
      nameAr: "البنك الأهلي السعودي",
      bic: "NCBKSAJE",
    },
    { nameEn: "RIYAD BANK", nameAr: "بنك الرياض", bic: "RIBLSARI" },
    {
      nameEn: "SAUDI BRITISH BANK",
      nameAr: "البنك السعودي البريطاني",
      bic: "SABBSARI",
    },
    {
      nameEn: "Saudi Central Bank",
      nameAr: "البنك المركزي السعودي",
      bic: "SAMASARI",
    },
    {
      nameEn: "SAUDI INVESTMENT BANK",
      nameAr: "البنك السعودي للإستثمار",
      bic: "SIBCSARI",
    },
    { nameEn: "STC Bank", nameAr: "بنك اس تي سي", bic: "STCJSARI" },
    { nameEn: "D360 Bank", nameAr: "دال ثلاثمائة وستون", bic: "DBAKSARI" },
    {
      nameEn: "Standard Chartered Bank KSA Br",
      nameAr: "بنك ستاندر شارتر",
      bic: "SCBLSAR2",
    },
    {
      nameEn: "National Bank of Iraq",
      nameAr: "المصرف الأهلي العراقي",
      bic: "NBIQSARI",
    },
    { nameEn: "Deutsche Bank", nameAr: "دويتشة بنك أي جي", bic: "DEUTSARI" },
    {
      nameEn: "National Bank of Pakistan",
      nameAr: "بنك باكستان",
      bic: "NBPASARI",
    },
    {
      nameEn: "T.C.ZIRAAT BANKASI A.S.",
      nameAr: "بنك زراعات التركي",
      bic: "TCZBSARI",
    },
    {
      nameEn: "Industrial and Commercial BANK of CHINA",
      nameAr: "البنك الصناعي والتجاري الصيني",
      bic: "ICBKSARI",
    },
    { nameEn: "MUFG Bank", nameAr: "بنك ميستوبيشي", bic: "BOTKSARI" },
    { nameEn: "Credit Suisse AG", nameAr: "كريدي سويس", bic: "CRESSARY" },
    { nameEn: "Sohar International Bank", nameAr: "بنك صحار", bic: "BSHRSARI" },
    { nameEn: "VISION BANK", nameAr: "بنك فيجن", bic: "VIIOSARI" },
    {
      nameEn: "Qatar National Bank",
      nameAr: "بنك قطر الوطني",
      bic: "QNBASARI",
    },
  ];
  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    private kycService: KYCService,
    private toast: ToastrManager
  ) {}
  validateKey(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    if (target) {
      const invalidKeys = ["-", ".", "e", "E"];
      const isInvalidKey = invalidKeys.includes(event.key);
      const isNotNumberKey =
        isNaN(Number(event.key)) &&
        event.key !== "Backspace" &&
        event.key !== "Tab";
      if (isInvalidKey || isNotNumberKey) {
        event.preventDefault();
      }
    }
  }

  ngOnInit() {
    this.usersService.getUsersAccounts().subscribe((res: any) => {
      if (res.status) {
        for (let i = 0; i < res.response.length; i++) {
          this.userList[i] = {
            id: res.response[i].id,
            name: res.response[i].name,
          };
        }
      }
    });

    const storedUserId = localStorage.getItem("user-id");

    if (storedUserId) {
      this.userId = +storedUserId;
      console.log("User ID loaded:", this.userId);
    } else {
      console.error("User ID not found in localStorage");
      return;
    }
    // this.addWorkflowInstance()
  }
  pickedUser() {
    this.usersService.getAccountData(this.toAccount).subscribe((res: any) => {
      if (res.status) {
        this.pickedAccountData = {
          user_id: res.response.filter((field) => field.kyc_detail_id === 37)[0]
            .user_id,
          name: res.response.filter((field) => field.kyc_detail_id === 137)[0]
            .value,
          creditAccount: res.response.filter(
            (field) => field.kyc_detail_id === 37
          )[0].value,
          bank: res.response.filter((field) => field.kyc_detail_id === 121)[0]
            .value,
        };
      }
    });
  }
  selectedBank() {
    this.pickedAccountData.bic = this.pickedBank;
  }
  transferBalance() {
    this.loading = true;
    this.error = "";
    this.info = null;
    this.usersService
      .transferBetweenTwoAccounts(
        this.amount,
        this.pickedAccountData.creditAccount,
        this.fromAccount,
        this.pickedAccountData.bic,
        this.pickedAccountData.user_id
      )
      .subscribe(
        (data: any) => {
          this.loading = false;
          if (data.status) {
            this.info = data.response;
          }
        },
        (error) => {
          this.loading = false;
          this.error = "An error occurred while fetching data.";
        }
      );
  }
  // addWorkflowInstance() {
  //   const status = '2';
  //   this.requestNumber = Date.now();

  //   const requestPayload = {
  //     fromAccount: this.fromAccount,
  //     toAccount: this.toAccount,
  //     amount: this.amount
  //   };

  //   // Call the service method and pass all the parameters
  //   this.kycService.addWorkflowInstance(
  //     this.itemId, // work_flow_id
  //     this.userId, // user_id
  //     this.requestNumber, // request_number
  //     'initi', // approval_level_id
  //     status, // status
  //     requestPayload // request JSON object
  //   ).subscribe(
  //     (response) => {
  //       // Update requestData with the new response item

  //       this.kycService.notifyWorkflowDataUpdated();
  //     this.fromAccount = null;

  //       this.toAccount = null;
  //       this.amount = null;
  //       this.toast.successToastr(this.LANG.updated_successfully);

  //     },
  //     (error) => {
  //       console.error('Error adding workflow instance:', error);
  //       this.toast.errorToastr(this.LANG.Something_went_wrong_Please_try_again_later);
  //     }
  //   );
  // }
}
