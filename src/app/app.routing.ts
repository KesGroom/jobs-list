import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { JobsResolver } from './components/core/jobs-list/jobs-list.service';
import { NgModule } from '@angular/core';
import { RootComponent } from './modules/root/root.component';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'jobs',
    component: RootComponent,
    resolve: {
      data: JobsResolver
    }
  },
  {
    path: 'jobs/:job',
    component: RootComponent,
    resolve: {
      data: JobsResolver
    }
  },
  {
    path: 'jobs/:job/:location',
    component: RootComponent,
    resolve: {
      data: JobsResolver
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
// export const AppRoutes = RouterModule.forRoot(routes, { useHash: true, enableTracing: false });
