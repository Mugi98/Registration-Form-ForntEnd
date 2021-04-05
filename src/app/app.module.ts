import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {  HttpClientModule} from "@angular/common/http";
import {FormService} from './form.service';
import {RegistrationFormComponent} from './registration-form/registration-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UpdateUsersDataComponent } from './update-users-data/update-users-data.component';
import {BsDatepickerModule, DatepickerModule} from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    UsersListComponent,
    NavBarComponent,
    UpdateUsersDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'increasing'
    })
  ],
  providers: [FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
