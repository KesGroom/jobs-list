import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environment/environment';
import { GetRes, Job } from 'src/app/interfaces';
import { Subject, map } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class JobsListService {
  public jobs: Job[] = [];
  public loading: boolean = true;
  public jobIdSelect: string = '0';
  public jobSelected = new Subject<Job>();
  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  public getListJobs(query: string) {
    return this._http.get<GetRes>(`${environment.URLAPI}/?Countries=${environment.COUNTRIES[0]}${query}`).pipe(
      map((response: any) => { return { data: response } })
    )
  }

  public setJob(job: Job) {
    this.jobIdSelect = job.numberId;
    this.jobSelected.next(job);
    this._router.navigate([`/${job.title.trim().toLowerCase()
      .replaceAll('-', '').replaceAll('/', ' ').replaceAll(' ', '-')
      }-${job.numberId}`])
  }

  public validateRoute() {
    if (this._router.url === '/') this.setJob(this.jobs[0]);
    else {
      const urlJobId = this._router.url.split('-').pop();
      const jobSelect = this.jobs.find((job: Job) => job.numberId === urlJobId);
      if (jobSelect) this.setJob(jobSelect);
      else if (this.jobs[0]) this.setJob(this.jobs[0]);
    }
  }
}
