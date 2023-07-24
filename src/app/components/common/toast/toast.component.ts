import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/components/common/services/alerts.service';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ToastComponent implements OnInit {

  constructor(
    public _alert: AlertsService,
  ) { }
  ngOnInit() {
  }

}
