import { Injectable } from "@angular/core";

import { apiServiceComponent } from "../Services/api.service";
import { BehaviorSubject, Observable, of, Subject, ReplaySubject } from "rxjs";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { format } from "url";

@Injectable({ providedIn: "root" })
export class KYCService {
  private url: string = "";
  private userPermissions: string[] = [];
  private workflowDataUpdated = new Subject<void>();
  workflowDataUpdated$ = this.workflowDataUpdated.asObservable();
  private otpVerifiedSubject = new BehaviorSubject<boolean>(false);
  otpVerified$ = this.otpVerifiedSubject.asObservable();

  private requestDataSubject: ReplaySubject<any>;
  requestData$: Observable<any>;
  private Compinlist: any[] = [];
  constructor(private api: apiServiceComponent) {
    this.requestDataSubject = new ReplaySubject<any>();
    this.requestData$ = this.requestDataSubject.asObservable();
    const storedPermissions = localStorage.getItem("userPermissions");
    if (storedPermissions) {
      this.userPermissions = JSON.parse(storedPermissions);
    }
  }
  notifyWorkflowDataUpdated() {
    this.workflowDataUpdated.next();
  }

  setRequestData(data: any): void {
    this.requestDataSubject.next(data);
  }

  setProgram(program: any) {
    this.Compinlist = program;
  }

  setPermissions(permissions: string[]): void {
    this.userPermissions = permissions;
    localStorage.setItem("userPermissions", JSON.stringify(permissions));
  }

  getPermissions(): Observable<string[]> {
    return of(this.userPermissions);
  }
  hasPermission(permission: string): boolean {
    return (
      Array.isArray(this.userPermissions) &&
      this.userPermissions.includes(permission)
    );
  }

  updateProgram(id: number, programData: any): Observable<any> {
    this.url = `update-program/${id}`;
    let query = "";

    return this.api.post(this.url, programData);
  }
  sendUserStatus(userStatus: any): Observable<any> {
    this.url = `send_user_status`;

    return this.api.post(this.url, userStatus);
  }
  // uploadFile(investorId:any,userStatus: any): Observable<any> {

  //   this.url = `uploadSuk`;

  //   return this.api.post(this.url, {investorId,userStatus});
  // }
  uploadFile(wordFile: FormData) {
    return this.api.postRaw("uploadSuk", wordFile);
  }
  insertDirector(
    psd_director_name: string,
    psd_director_relation: string,
    psd_director_nationality: string
  ): Observable<any> {
    this.url = `director-insert?psd_director_name=${encodeURIComponent(
      psd_director_name
    )}&psd_director_relation=${encodeURIComponent(
      psd_director_relation
    )}&psd_director_nationality=${encodeURIComponent(
      psd_director_nationality
    )}`;

    let query = "";

    return this.api.post(this.url, query);
  }
  getWorkflowInstance(
    workFlowId: number,
    userId: number,
    requestNumber: number,
    approvalLevelId: any
  ): Observable<any> {
    // Construct the URL with query parameters
    const url = `get-workFlowInstance?work_flow_id=${encodeURIComponent(
      workFlowId.toString()
    )}&user_id=${encodeURIComponent(
      userId.toString()
    )}&request_number=${encodeURIComponent(
      requestNumber.toString()
    )}&approval_level_id=${encodeURIComponent(approvalLevelId.toString())}`;
    let query = "";

    // Perform the GET request using your API service
    return this.api.get(url, query);
  }

  addWorkflowInstance(
    workFlowId: number,
    userId: number,
    requestNumber: number,
    approvalLevelId: any,
    status: any,
    request: {
      fromAccount?: string;
      toAccount?: string;
      amount?: number;
      request?: any;
    }
  ): Observable<any> {
    const requestJson = encodeURIComponent(JSON.stringify(request));
    const url = `add-workFlowInstance?work_flow_id=${encodeURIComponent(
      workFlowId.toString()
    )}&user_id=${encodeURIComponent(
      userId.toString()
    )}&approval_level_id=${encodeURIComponent(
      approvalLevelId.toString()
    )}&request_number=${encodeURIComponent(
      requestNumber.toString()
    )}&status=${encodeURIComponent(status)}&request=${requestJson}`;

    return this.api.post(url, {});
  }

  updateWorkflowInstance(
    id: number,

    status: any
  ): Observable<any> {
    // Convert the request object to a JSON string

    // Construct the URL with query parameters
    const url = `update-workFlowInstance?id=${encodeURIComponent(
      id.toString()
    )}&status=${encodeURIComponent(status)}`;

    // Perform the POST request using your API service
    return this.api.post(url, {});
  }

  updateDirector(
    id: number,
    psd_director_name: string,
    psd_director_relation: string,
    psd_director_nationality: string
  ): Observable<any> {
    this.url = `director-update/${id}?psd_director_name=${encodeURIComponent(
      psd_director_name
    )}&psd_director_relation=${encodeURIComponent(
      psd_director_relation
    )}&psd_director_nationality=${encodeURIComponent(
      psd_director_nationality
    )}`;
    let query = "";

    return this.api.post(`${this.url}/`, query);
  }

  getPrograms(): Observable<any> {
    this.url = "getAll";
    let query = "";
    return this.api.get(this.url, query);
  }

  getWorkFlowInstanceById(
    workFlowId: number,
    requestNumber: number
  ): Observable<any> {
    const url = `get-workFlowInstancebById?work_flow_id=${workFlowId}&request_number=${requestNumber}`;
    let query = "";
    const params = {
      work_flow_id: workFlowId.toString(),
      request_number: requestNumber.toString(),
    };

    return this.api.get(url, query);
  }

  getDirectors(): Observable<any> {
    this.url = "director-index";
    let query = "";
    return this.api.get(this.url, query);
  }
  getProgram() {
    return this.Compinlist;
  }

  deleteProgram(id: number): Observable<any> {
    this.url = `delete-program?id=${id}`;
    let query = "";
    return this.api.post(this.url, query);
  }

  sendOtpRegestration(email: any) {
    this.url = `send_otp?email=${email}`;
    let query = "";
    return this.api.post(this.url, query);
  }

  deletedirector(id: number): Observable<any> {
    this.url = `director-delete/${id}`;
    let query = "";
    return this.api.post(this.url, query);
  }

  verifyOtp(email: string, otp: any) {
    this.url = `verify_otp?email=${email}&otp=${otp}`;
    let query = "";

    return this.api.post(this.url, query);
  }

  getKYCList() {
    this.url = "kyc_list";
    let query = "";
    return this.api.get(this.url, query);
  }

  deleteKYC(data) {
    this.url = "delete_kyc";
    return this.api.post(this.url, data);
  }

  getInfoTypeList() {
    this.url = "kyc_infotype_list";
    let query = "";
    return this.api.get(this.url, query);
  }
  getUserTypeList() {
    this.url = "show_user_type";
    let query = "";
    return this.api.get(this.url, query);
  }

  getDicorators() {
    this.url = "director-index";
    let query = "";
    return this.api.get(this.url, query);
  }

  addProgram(programData: any, directors: any[]): Observable<any> {
    this.url = "program-insert";
    const payload = {
      ...programData,
      directors: directors, // Add the directors array here
    };
    return this.api.post(this.url, payload);
  }
  addInfoType(data: Object) {
    this.url = "add_infotype";
    return this.api.post(this.url, data);
  }
  addUserType(data: Object) {
    this.url = "userTypeInsert";
    return this.api.post(this.url, data);
  }
  investProfit(data) {
    this.url = `invest-profit?campgain_id=${data.campgain_id}&invester_id=${data.invester_id}&date=${data.date}`;
    return this.api.post(this.url, "");
  }
  updateInfoType(data: Object) {
    this.url = "update_infotype";
    return this.api.post(this.url, data);
  }
  updateUserType(data: Object) {
    this.url = "userTypeUpdate";
    return this.api.post(this.url, data);
  }
  deleteInfoType(data) {
    this.url = "delete_infotype";
    return this.api.post(this.url, data);
  }
  deleteUserType(id) {
    this.url = `userTypeDelete?id=`;
    let query = "";
    return this.api.get(this.url, id);
  }
  getInfoType(id: any) {
    this.url = `get_infotype_id/${id}`;
    let query = "";
    return this.api.post(this.url, query);
  }

  getProgramById(id): Observable<any> {
    this.url = `program-index-id?id=${id}`;
    let query = "";
    return this.api.get(this.url, query);
  }

  getworkflows(): Observable<any> {
    this.url = "get-workFlow";
    let query = "";
    return this.api.get(this.url, query);
  }

  getapprovallevel(id: number): Observable<any> {
    this.url = `get-approval?user_id=${id}`;
    let query = "";
    return this.api.get(this.url, query);
  }

  addworkflow(name: string, description: string): Observable<any> {
    this.url = `add-workFlow?name=${encodeURIComponent(
      name
    )}&description=${encodeURIComponent(description)}`;

    return this.api.post(this.url, {});
  }

  addapproval(name: string, user_type: Array<any>): Observable<any> {
    // Define the request body based on the API requirements
    const body = {
      name: name,
      user_type_id: user_type, // Assuming you always want to include user_type_id: [2]
    };

    // Update the URL to remove query parameters since we're using the body
    this.url = "add-approval"; // Update with the correct endpoint

    // Call the post method with the URL and the body
    return this.api.post(this.url, body);
  }
  getUserType(id: any) {
    this.url = `userTypeById?id=`;
    return this.api.get(this.url, id);
  }
  addKYC(data: Object) {
    this.url = "add_kyc";
    return this.api.post(this.url, data);
  }

  updateKYC(data: Object) {
    this.url = "update_kyc";
    return this.api.post(this.url, data);
  }

  getKYCDetails(id) {
    this.url = `get_kyc_by_id/${id}`;
    let query = "";
    return this.api.get(this.url, query);
  }

  getEvaluationList() {
    this.url = "list_evaluation";
    let query = "";
    return this.api.get(this.url, query);
  }

  getOpportunityList(data) {
    this.url = "get_opportunities_by_product";
    return this.api.post(this.url, data);
  }

  getEvaluationDetails(id) {
    this.url = `get_evaluation_by_id/${id}`;
    let query = "";
    return this.api.get(this.url, query);
  }

  addEvaluation(data: Object) {
    this.url = "add_evaluation";
    return this.api.post(this.url, data);
  }

  updateEvaluationDetails(data: Object) {
    this.url = "add_evaluation_detail";
    return this.api.post(this.url, data);
  }

  deleteEvaluation(data) {
    this.url = "delete_evaluation";
    return this.api.post(this.url, data);
  }

  getCampaignList(role_type: number) {
    this.url = "list_campaign/" + role_type;
    let query = "";
    return this.api.get(this.url, query);
  }
  getInvesterbyId(id: any) {
    this.url = "getInvesterbyId?campaign_id=" + id;
    let query = "";
    return this.api.get(this.url, query);
  }
  getAllCampaignList() {
    this.url = "listing_campaign";
    let query = "";
    return this.api.get(this.url, query);
  }

  getCampaignDetails(id: string, role: any) {
    this.url = `get_campaign_by_id/${id}/${role}`;
    return this.api.get(this.url, "");
  }

  deleteCampaign(data) {
    this.url = "delete_campaign";
    return this.api.post(this.url, data);
  }

  approveRejectKYC(data: any) {
    this.url = "kyc_approvestatus";
    if (data.type) {
      this.url = "campaign_approvestatus";
    }
    return this.api.post(this.url, data);
  }

  updateCampaignDetails(data) {
    this.url = "modify_evaluation_campaign";
    return this.api.post(this.url, data);
  }
  updateCampaignData(data) {
    this.url = "update_campaign_data";
    return this.api.post(this.url, data);
  }

  updateUserRole(data) {
    this.url = "update_user_type";
    return this.api.post(this.url, data);
  }

  getUserKyc(type) {
    this.url = `get_user/${type}`;
    return this.api.get(this.url, "");
  }

  getUserKycDetails(id) {
    this.url = `get_user_detail/${id}`;
    return this.api.get(this.url, "");
  }
  changeIsQualified(id, status) {
    this.url = `changeIsQualified/${status}?is_qualified=${id}`;
    return this.api.post(this.url, "");
  }
  getQualifInvestorDetails(id) {
    this.url = `getQualifiedInvestorAttach/${id}`;
    return this.api.get(this.url, "");
  }

  getPagesList() {
    this.url = "get_page_list";
    let query = "";
    return this.api.get(this.url, query);
  }
  getPagesParameters() {
    this.url = "getPagesParameters";
    let query = "";
    return this.api.get(this.url, query);
  }
  getPagesDetails(id) {
    this.url = `get_page_by_id/${id}`;
    return this.api.get(this.url, "");
  }

  addPages(data) {
    this.url = "insert_page";
    return this.api.post(this.url, data);
  }
  getWatheqData(id) {
    this.url = "watheqData";
    return this.api.post(this.url, id);
  }
  commercialregistration(id: any) {
    this.url = `commercialregistration/${id}`;
    return this.api.get(this.url, "");
  }
  getCampaignAttachment(data) {
    this.url = "getcampaignattachment";
    return this.api.post(this.url, data);
  }

  deleteCampaignattachment(data) {
    this.url = "deleteCampaignattachment";
    return this.api.post(this.url, data);
  }
  addCampaignAttachment(data: FormData) {
    return this.api.postRaw("addcampaignattachment", data);
  }
  updatePages(data) {
    this.url = "update_page";
    return this.api.post(this.url, data);
  }
  addPagesParameters(data) {
    this.url = "add_PagesParameters";
    return this.api.post(this.url, data);
  }
  addKyc(data: Object) {
    this.url = "modify_userkyc";
    return this.api.post(this.url, data);
  }
  deleteparams(data) {
    this.url = "deleteparams";
    return this.api.post(this.url, data);
  }

  getUserRoles() {
    this.url = "usertype_list";
    let query = "";
    return this.api.get(this.url, query);
  }

  getSectionList(type) {
    this.url = `get_by_type/${type}`;
    return this.api.get(this.url, "");
  }

  getSectionDetails(id) {
    this.url = `get_cms_by_id/${id}`;
    return this.api.get(this.url, "");
  }

  insertSection(data) {
    this.url = `insert_cms`;
    return this.api.post(this.url, data);
  }

  updateSection(data) {
    this.url = `update_cms`;
    return this.api.post(this.url, data);
  }

  deleteSection(data) {
    this.url = `delete_cms`;
    return this.api.post(this.url, data);
  }

  insertOpportunitySetup(data) {
    this.url = `insert_opportunity_setup`;
    return this.api.post(this.url, data);
  }

  getType() {
    this.url = `get_pagetype_list`;
    return this.api.get(this.url, "");
  }
  getTrack() {
    this.url = `getMaster`;
    return this.api.get(this.url, "");
  }
  storeTrack(data) {
    this.url = `insertMaster`;
    return this.api.post(this.url, data);
  }
  insertLog(data) {
    this.url = `insertLog`;
    return this.api.post(this.url, data);
  }
  getNotes(screen: number) {
    this.url = `note-get?screen=${encodeURIComponent(screen)}`;
    return this.api.get(this.url, "");
  }

  getListingCampaign(): Observable<any> {
    const url = `listing_campaign`;

    return this.api.get(url, "");
  }

  editOpportunitySide(
    id: number,
    open_date: string,
    close_date: string,
    tagline: string,
    investment_status: string,
    min_investment: number,
    max_investment: number,
    share_price: number
  ): Observable<any> {
    // Construct the URL dynamically
    const url = `edit_oppourtunity_side?id=${id}&open_date=${encodeURIComponent(
      open_date
    )}&close_date=${encodeURIComponent(
      close_date
    )}&investment_status=${encodeURIComponent(investment_status)}
    &tagline=${encodeURIComponent(tagline)}
    &min_investment=${min_investment}&max_investment=${max_investment}&share_price=${share_price}`;

    // Make the GET request with the constructed URL
    return this.api.get(url, "");
  }

  insertNote(
    adminId: number,
    adminEmail: string,
    notes: string,
    screen: number,
    id: number
  ): Observable<any> {
    // Construct the URL with query parameters
    this.url = `note-insert?admin_id=${encodeURIComponent(
      adminId.toString()
    )}&admin_email=${encodeURIComponent(adminEmail)}&notes=${encodeURIComponent(
      notes
    )}&screen=${encodeURIComponent(screen)}&id=${encodeURIComponent(
      id.toString()
    )}`;

    // Send a POST request with an empty body if necessary
    let query = "";

    return this.api.post(this.url, query);
  }
}
