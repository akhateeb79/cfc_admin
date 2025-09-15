export class CrNumber {
  public crName: string = "";
  public crNumber: string = "";
  public crEntityNumber: string = "";
  public issueDate: string = "";
  public expiryDate: string = "";
  public crMainNumber: string = "";
  public crMainEntityNumber: string = "";
  public parties: Partiey[] ;
  public businessType: BusinessType = new BusinessType();
  public fiscalYear: FiscalYear = new FiscalYear();
  public status: Status = new Status();
  public cancellation: string = "";
  public address: Address = new Address();
  public isEcommerce: string = "";
  public urls: string = "";
  public location: Location = new Location();
  public company: Company = new Company();
  public capital: Capital = new Capital();
  public activities: Activity = new Activity();
  constructor(
  ) {}
}
/*******************************************************************************/
class Isic{
  public description: string = "";
  public name: string = "";
  public nameEn: string = "";
  constructor(
  ) {}
}
/*******************************************************************************/
class Activity{
  public description: string = "";
  public isic: Isic = new Isic();
  constructor(
  ) {}
}
/*******************************************************************************/
class Capital {
  public paidAmount: string = "";
  public subscribedAmount: string = "";
  public announcedAmount: string = "";
  public share: string = "";
  constructor(
  ) {}
}
/*******************************************************************************/
class Company {
  public period: string = "";
  public startDate: string = "";
  public endDate: string = "";
  constructor(
  ) {}
}
/*******************************************************************************/
class Location {
  public id: string = "";
  public name: string = "";
  constructor() {}
}
/*******************************************************************************/
class Partiey {
  public name: string= "";
  public birthDate: string= "";
  public sharesCount: string= "";
  public gross: string= "";
  public identity: Identity = new Identity();
  public relation: Relation = new Relation();
  public nationality: Nationality = new Nationality();
  constructor(
  ) {}
}
/*******************************************************************************/
class Nationality {
  public id: string= "";
  public name: string= "";
  constructor() {}
}
/*******************************************************************************/
class Relation {
  public id: string = "";
  public name: string = "";
  constructor() {}
}
/*******************************************************************************/
class Identity {
  public id: string = "";
   public type: string = "";
  constructor() {}
}
/*******************************************************************************/
class BusinessType {
  public id: string = "";
   public name: string= "";
  constructor() {}
}
/*******************************************************************************/
class FiscalYear {
  public month: string = "";
  public day: string = "";
  public calendarType: CalendarType = new CalendarType();
  constructor(
  ) {}
}
/*******************************************************************************/
class CalendarType {
  public id: string= "";
  public name: string= "";
  constructor() {}
}
/*******************************************************************************/
class Status {
public id: string= "";
public name: string= "";
public nameEn: string= "";
  constructor() {}
}
/*******************************************************************************/
class Address {
  public general: General = new General();
   public national: string= "";
  constructor() {}
}
/*******************************************************************************/
class General {
  public website: string= "";
  public national: string= "";
  public email: string= "";
  public zipcode: string= "";
  public fax1: string= "";
  public telephone1: string= "";
  public telephone2: string= "";
  public postalBox1: string= "";
  public postalBox2: string= "";
  constructor(
  ) {}
}
