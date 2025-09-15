import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";
import { KYCService } from "src/app/shared/Services/kyc.service";
import { environment } from "src/environments/environment";
import { OpportunityModelNoteComponent } from "./opportunity-model-note/opportunity-model-note.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
declare const $: any;

@Component({
  templateUrl: "./CampaignList.html",
  styleUrls: ["./CampaignList.css"],
})
export class CampaignList implements OnInit {
  campaignList: any = [];
  delete_data: any = {};
  program: any;

  load: boolean = false;
  selectedProgram: any; // Variable to hold a selected program
  dataTable: any;
  LANG = environment.english_translations;
  user_data: any = {};
  error: string | null = null; // Error message state

  constructor(
    private router: Router,
    private kycService: KYCService,
    private toast: ToastrManager,
    private modalService: NgbModal
  ) {
    const user_data = btoa(btoa("user_info"));
    if (localStorage.getItem(user_data) != undefined) {
      this.user_data = JSON.parse(
        atob(atob(localStorage.getItem(user_data) || "{}"))
      );
    }
  }

  ngOnInit() {
    this.getCampaignList();
  }

  getCampaignList(type?: number) {
    this.kycService
      .getCampaignList(this.user_data.role_type)
      .subscribe((res: any) => {
        if (res.status) {
          this.campaignList = res.response || [];
          this.campaignList = this.campaignList.filter((item) => item !== null);
          console.log("this.campaignList", this.campaignList);
          if (type) {
            this.dataTable.destroy();
          }
          setTimeout(() => {
            this.dataTable = $("#example23").DataTable({
              dom: "Bfrtip",
              ordering: false,
              responsive: true,
              buttons: ["copy", "csv", "excel", "pdf", "print"],
            });
            $(
              ".buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel"
            ).addClass("btn btn-primary mr-1");
          }, 100);
        }
      });
  }

  fetchProgramById(data): void {
    this.kycService.getProgramById(data.id).subscribe({
      next: (response) => {
        this.program = response;
        this.kycService.setProgram(this.program);

        this.router.navigate(["/dashboard/program-details", data.id]);
      },
      error: (error) => {
        console.error("Error fetching program:", error);
        // Handle the error appropriately
      },
    });
  }

  edit(data) {
    this.router.navigate(["/dashboard/campaign-details"], {
      queryParams: { id: btoa(btoa(data.id)) },
    });
  }
  detailsCampaign(data) {
    this.router.navigate(["/dashboard/campaign_data"], {
      queryParams: { id: btoa(btoa(data.id)) },
    });
  }
  viewInvestors(data) {
    this.router.navigate(["/dashboard/investor-list"], {
      queryParams: { id: btoa(btoa(data.id)) },
    });
  }
  attachment(data) {
    alert(data.tagline);
    this.router.navigate(["/dashboard/campaign-attachment"], {
      queryParams: { id: btoa(btoa(data.id)), title: data.tagline },
    });
  }
  showDeleteModal(data) {
    $("#delete").modal("show");
    this.delete_data = data;
  }

  cancel() {
    this.delete_data = {};
  }

  delete() {
    this.load = true;
    const data = { id: this.delete_data.id };
    this.kycService.deleteCampaign(data).subscribe((res: any) => {
      this.load = false;
      if (res.status) {
        $("#delete").modal("hide");
        this.toast.successToastr(this.LANG.Evaluation_deleted_successfully);
        this.getCampaignList(1);
        return;
      }
      this.toast.warningToastr(res.response.message);
    });
  }

  openModal(id: number) {
    const modalRef = this.modalService.open(OpportunityModelNoteComponent);

    // Pass the type property to the modal component

    modalRef.componentInstance.id = id;

    modalRef.result.then((result) => {
      if (result === "confirm") {
        // Your confirmation logic here
      }
    });
  }
}
