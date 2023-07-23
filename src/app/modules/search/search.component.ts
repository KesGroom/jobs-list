import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobsListService } from '../jobs-list/jobs-list.service';
import { GetRes } from 'src/app/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { AlertsService } from 'src/app/alerts.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  public searchForm: FormGroup;
  public comboBoxOptions: string[] = [
    'Accounting', 'Administration', 'Administration Assistant',
    'Administrative', 'Assembly', 'Az Driver',
    'Bakery', 'Cleaning', 'Clerical',
    'Computer', 'Construction', 'Counter Balance',
    'Customer Service', 'Data Analytics', 'Data Entry',
    'Database', 'Delivery', 'Dispatcher',
    'Driver', 'Electrician', 'Food Service',
    'Forklift', 'General Labour', 'General Packer',
    'Heavy Lifting', 'Inventory', 'Logistics',
    'Lumper', 'Machine Builder', 'Machine Operator',
    'Mixer', 'Order picking', 'Packing',
    'Plumbing', 'Reception', 'Recruiting',
    'RF Scanning', 'Sanitation', 'Shipping/Receiving',
    'Soldering', 'Ticketing', 'Training',
    'Truck Driver', 'Welding'
  ]

  private $stop = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _jobs: JobsListService,
    private _alerts: AlertsService
  ) {
    this.searchForm = _fb.group({
      'title': ['', [Validators.required]],
      'location': ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  typingForSearch(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey) {
      this.search();
    }
  }

  search() {
    this._jobs.loading = true;
    if (this.searchForm.controls['title'].value != '' || this.searchForm.controls['location'].value != '') {
      console.log(`&JobTitle=${this.searchForm.controls['title'].value}&Location=${this.searchForm.controls['location'].value}`);

      this._jobs.getListJobs(`&JobTitle=${this.searchForm.controls['title'].value}&Location=${this.searchForm.controls['location'].value}`).pipe(takeUntil(this.$stop)).subscribe({
        next: (response: GetRes) => {
          this._jobs.jobs = response.data;
          console.log(response.data);

          if (this._jobs.jobs.length > 0) {
            this._jobs.setJob(this._jobs.jobs[0]);
          } else {
            console.log('Error');

            this.setDefault();
            this._alerts.setToast('Results not found!', 'red');
          };
        },
        error: (err: any) => {
          console.error(err);
          this.setDefault();
        }
      })
    } else this.setDefault();
  }

  private setDefault() {
    this.searchForm.controls['title'].setValue('');
    this.searchForm.controls['location'].setValue('');
    this._jobs.getListJobs(``).pipe(takeUntil(this.$stop)).subscribe({
      next: (response: GetRes) => {
        this._jobs.jobs = response.data;
        if (this._jobs.jobs.length) this._jobs.setJob(this._jobs.jobs[0]);
      },
      error: (err: any) => console.error(err)
    })
  }
  ngOnDestroy(): void {
    this.$stop.next();
    this.$stop.complete();
  }
}
