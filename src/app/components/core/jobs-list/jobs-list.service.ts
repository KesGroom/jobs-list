import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environment/environment';
import { GetRes, Job } from 'src/app/interfaces';
import { Observable, Subject, catchError, filter, map, of, take, tap, throwError } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class JobsListService {

  getStringArr() {
    return ['Predo', 'Pcia', 'Papas']
  }

  public jobs: Job[] = [];
  public loading: boolean = true;
  public jobIdSelect: string = '0';
  public jobSelected = new Subject<Job>();
  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  public getListJobs(params: { title: string | null, location: string | null }) {
    let query: string = '';
    query += params.title ? `&JobTitle=${params.title}` : '';
    query += params.location ? `&JobTitle=${params.location}` : '';;
    return this._http.get<GetRes>(`${environment.URLAPI}/?Countries=${environment.COUNTRIES[0]}${query || ''}`);
  }



  public setJob(job: Job) {
    this.loading = true;
    this.jobIdSelect = job.numberId;
    setTimeout(() => this.jobSelected.next(job), 1);

    // this._router.navigate([`/${job.title.trim().toLowerCase()
    //   .replaceAll('-', '').replaceAll('/', ' ').replaceAll(' ', '-')
    //   }-${job.numberId}`])
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

export const JobsResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot, jobs: JobsListService = inject(JobsListService), _router: Router = inject(Router)): Observable<any> =>
    jobs.getListJobs({ title: route.paramMap.get('job'), location: route.paramMap.get('location') })
      .pipe(
        map((response: any) => {
          if (response.length === 0) {
            _router.navigate(['/'])
            return null;
          }
          else return response;
        }),
        catchError(() => {
          return of(null);
        })
      )
