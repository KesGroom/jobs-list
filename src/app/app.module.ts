import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { JobsListService } from './components/core/jobs-list/jobs-list.service';
import { RootModule } from './modules/root/root.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RootModule
  ],
  providers: [JobsListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
