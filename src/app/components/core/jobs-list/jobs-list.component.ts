import { AfterViewInit, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { JobsListService } from './jobs-list.service';
import { Observable, Subject, map, mergeMap, of, takeUntil } from 'rxjs';
import { GetRes, Job } from 'src/app/interfaces';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent {

  constructor(
    public _list: JobsListService,
  ) {

  }
}
