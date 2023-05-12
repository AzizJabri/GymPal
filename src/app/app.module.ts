import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth/authconfig.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './layouts/landing/landing.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent as DashboardLayout } from './layouts/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoachComponent } from './pages/coach/coach.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { CardComponent } from './components/card/card.component';
import { CoachesComponent } from './pages/coaches/coaches.component';
import { UsersComponent } from './pages/users/users.component';
import { CoachesListComponent } from './components/coaches-list/coaches-list.component';
import { CoachItemComponent } from './components/coach-item/coach-item.component';
import { CoachApproveComponent } from './components/coach-approve/coach-approve.component';
import { FilterPipe } from './shared/filter.pipe';
import { CoachApproveItemComponent } from './components/coach-approve-item/coach-approve-item.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { CoachDashboardComponent } from './pages/coach-dashboard/coach-dashboard.component';
import { ExercisesListComponent } from './components/exercises-list/exercises-list.component';
import { ExerciseItemComponent } from './components/exercise-item/exercise-item.component';
import { ExerciseNamePipe } from './shared/exercise-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LandingComponent,
    AuthComponent,
    HomeComponent,
    AboutComponent,
    DashboardComponent,
    AdminComponent,
    DashboardLayout,
    LoginComponent,
    RegisterComponent,
    CoachComponent,
    LogoutComponent,
    CardComponent,
    CoachesComponent,
    UsersComponent,
    CoachesListComponent,
    CoachItemComponent,
    CoachApproveComponent,
    FilterPipe,
    CoachApproveItemComponent,
    UsersListComponent,
    UserItemComponent,
    ExercisesComponent,
    CoachDashboardComponent,
    ExercisesListComponent,
    ExerciseItemComponent,
    ExerciseNamePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
