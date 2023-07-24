import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root.component';
import { SearchComponent } from 'src/app/components/core/search/search.component';
import { JobsListComponent } from 'src/app/components/core/jobs-list/jobs-list.component';
import { JobDescriptionComponent } from 'src/app/components/core/job-description/job-description.component';
import { PopupComponent } from 'src/app/components/common/popup/popup.component';
import { ToastComponent } from 'src/app/components/common/toast/toast.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PopupComponent,
    ToastComponent,
    ReactiveFormsModule,
  ],
  declarations: [
    RootComponent,
    SearchComponent,
    JobsListComponent,
    JobDescriptionComponent
  ]
})
export class RootModule { }
