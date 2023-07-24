import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from 'src/app/components/common/services/alerts.service';
import { JobsListService } from 'src/app/components/core/jobs-list/jobs-list.service';
import { Job } from 'src/app/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    public _jobs: JobsListService,
    private _alerts: AlertsService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe({
      next: (resolve: any) => {
        this._jobs.jobs = resolve.data;
        this._jobs.setJob(this._jobs.jobs[0]);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

}
