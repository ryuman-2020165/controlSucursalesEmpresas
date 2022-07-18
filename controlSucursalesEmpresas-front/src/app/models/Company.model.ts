export class CompanyModel {
  constructor(
    public id: string,
    public name: string,
    public typeOfCompany: string,
    public username: string,
    public email: string,
    public password: string,
    public phone: string,
    public role: string
  ) { }
}