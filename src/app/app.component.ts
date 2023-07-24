import { Component, OnInit, } from '@angular/core';
import { AlertsService } from './components/common/services/alerts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public _alert: AlertsService,
    public activatedRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
  }
}
