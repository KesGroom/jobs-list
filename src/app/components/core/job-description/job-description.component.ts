import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { JobsListService } from '../jobs-list/jobs-list.service';
import { Job } from 'src/app/interfaces';
import { AlertsService } from 'src/app/components/common/services/alerts.service';
import { filter } from 'rxjs';

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
      this._jobs.jobSelected.pipe().subscribe({
        next: (response) => {
          this.job = response;
          setTimeout(() => {
            this._jobs.loading = false;
          }, 500);
        }
      })
    }
  }

  apply() {
    this._alerts.$popUpState.next(true);
  }
}
