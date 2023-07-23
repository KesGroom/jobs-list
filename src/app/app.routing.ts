import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: ':job',
    component: AppComponent,
  },
];

export const AppRoutes = RouterModule.forRoot(routes, { useHash: true, enableTracing: false });
