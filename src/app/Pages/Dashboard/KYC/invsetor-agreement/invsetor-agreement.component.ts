import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ToastrManager } from "ng6-toastr-notifications";
import { KYCService } from "src/app/shared/Services/kyc.service";
import { environment } from "src/environments/environment";
import { Document, Packer, Paragraph, TextRun, AlignmentType, ISectionOptions } from 'docx'; 

@Component({
  selector: "app-invsetor-agreement",
  templateUrl: "./invsetor-agreement.component.html",
  styleUrls: ["./invsetor-agreement.component.css"],
})
export class InvsetorAgreementComponent implements OnInit {
  @Input() name: any = "";
  @Input() investorId: any = "";
  @Input() date: any = "";
  @Input() dateH: any = "";
  @Input() isSaudi: any = false;
  @Input() location: any = "";
  LANG = environment.english_translations;
  @ViewChild("content", { static: false }) content: ElementRef;
  constructor(private kycService: KYCService,
      private toast: ToastrManager,) {}



  ngOnInit() {}
  
  generateAndDownloadWord(investorId: any) {
    console.log("got in",investorId);
  
    if (!this.content || !this.content.nativeElement) {
      console.error("Content is not available.");
      return;
    }
  
    setTimeout(() => {
      const contentHtml = this.content.nativeElement.innerHTML;
  
      function processHtmlToSections(input: string): ISectionOptions[] {
        const parser = new DOMParser();
        const doc = parser.parseFromString(input, 'text/html');
        const paragraphs = Array.from(doc.querySelectorAll('p'));
  
        const paragraphElements = paragraphs.map(paragraph => {
          const text = paragraph.textContent || "";
          return new Paragraph({
            children: [
              new TextRun(text),
            ],
            alignment: AlignmentType.RIGHT,
          });
        });
  
        return [{
          children: paragraphElements
        }];
      }
  
      const sections = processHtmlToSections(contentHtml); 
  
      const doc = new Document({
        styles: {},  
      });
  
      doc.addSection({
        children: sections[0].children, 
      });
  
      Packer.toBlob(doc).then((blob) => {
        const wordFile = new File([blob], "document.docx", {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
  
        this.uploadWordFile(wordFile, investorId);
      });
    }, 500);
  }
  uploadWordFile(wordFile: File, investorId: any) {
    const formData = new FormData();
    formData.append("user_id", investorId);
    formData.append("word_file", wordFile);
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    let message = this.LANG.KYC_Approved;
    this.kycService.uploadFile(formData).then((res: any) => {
      if (res) {
        this.toast.successToastr(message);
      }
    });
  }
}
