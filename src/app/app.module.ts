import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchComponent } from './modules/search/search.component';
import { JobDescriptionComponent } from './modules/job-description/job-description.component';
import { JobsListComponent } from './modules/jobs-list/jobs-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutes } from './app.routing';
import { PopupComponent } from './components/popup/popup.component';
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    JobDescriptionComponent,
    JobsListComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutes,
    PopupComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
