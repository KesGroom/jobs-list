import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { JobsListService } from '../jobs-list/jobs-list.service';
import { Job } from 'src/app/interfaces';
import { AlertsService } from 'src/app/alerts.service';

@Component({
  selector: 'job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss']
})
export class JobDescriptionComponent implements OnInit {
  @Input() job!: Job;


  constructor(
    public _jobs: JobsListService,
    private _alerts: AlertsService
  ) { }
  ngOnInit() {
    if (!this.job) {
      this._jobs.jobSelected.subscribe({
        next: (response) => {
          setTimeout(() => {
            const preJob = response;
            if (preJob) {
              this.job = preJob;
            };
            setTimeout(() => {
              this._jobs.loading = false;
            }, 1000);
          }, this._jobs.jobs.length == 0 ? 200 : 10)
        }
      })
    }
  }

  apply() {
    this._alerts.$popUpState.next(true);
  }
}
