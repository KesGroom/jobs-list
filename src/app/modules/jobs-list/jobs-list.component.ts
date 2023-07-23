import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { JobsListService } from './jobs-list.service';
import { Subject, takeUntil } from 'rxjs';
import { GetRes, Job } from 'src/app/interfaces';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnDestroy {
  private $stop = new Subject<void>();
  constructor(
    public _list: JobsListService,
    private _router: Router
  ) {
    this.getListJobs();
  }

  //Filter de rxjs
  //Resolvers
  getListJobs() {
    this._list.getListJobs('').pipe(takeUntil(this.$stop)).subscribe({
      next: (response: GetRes) => {
        if (response.data.length > 0) {
          this._list.jobs = response.data;
          this._list.validateRoute();
          this._router.events.pipe(takeUntil(this.$stop)).subscribe(event => { if (event instanceof NavigationEnd) this._list.validateRoute() });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.$stop.next();
    this.$stop.complete();
  }

}
