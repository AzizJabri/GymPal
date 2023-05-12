import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './layouts/landing/landing.component';
import { DashboardComponent as DashboardLayout } from './layouts/dashboard/dashboard.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';

import { AuthGuard } from './shared/auth/auth.guard';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CoachComponent } from './pages/coach/coach.component';
import { AdminGuard } from './shared/auth/admin.guard';
import { UserGuard } from './shared/auth/user.guard';
import { CoachGuard } from './shared/auth/coach.guard';
import { LogoutComponent } from './pages/logout/logout.component';
import { CoachesComponent } from './pages/coaches/coaches.component';
import { UsersComponent } from './pages/users/users.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { CoachDashboardComponent } from './pages/coach-dashboard/coach-dashboard.component';

const routes: Routes = [
  {
    path: 'home',
    component: LandingComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'about',
    component: LandingComponent,
    children: [
      {
        path: '',
        component: AboutComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
    ],
    canActivate: [AuthGuard, UserGuard],
  },
  {
    path: 'admin',
    component: DashboardLayout,
    children: [
      {
        path: '',
        component: AdminComponent,
      },
      {
        path: 'coaches',
        component: CoachesComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'exercises',
        component: ExercisesComponent,
      },
    ],
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'coach',
    component: DashboardLayout,
    children: [
      {
        path: '',
        component: CoachDashboardComponent,
      },
    ],
    canActivate: [AuthGuard, CoachGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'coach',
        component: CoachComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
