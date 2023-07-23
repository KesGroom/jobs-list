export interface Job {
  "id": string,
  "requestId": string,
  "numberId": string,
  "title": string,
  "salary": string,
  "location": string,
  "type": string,
  "createdAt": string,
  "description": string,
  "requirements": string,
  "shift": string,
  "createdBy"?: string,
  "agencyId"?: string,
  "companyType"?: string,
}

export interface GetRes {
  data: Array<Job>,
}

