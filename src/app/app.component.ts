import { Component, OnInit, } from '@angular/core';
import { AlertsService } from './alerts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public _alert: AlertsService
  ) { }
  ngOnInit(): void {

  }
}
