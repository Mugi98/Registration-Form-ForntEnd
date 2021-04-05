import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationFormComponent} from './registration-form/registration-form.component';
import { UpdateUsersDataComponent } from './update-users-data/update-users-data.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {
    path: 'userdatalist', component: UsersListComponent
  },
  {
    path: 'registrationform', component: RegistrationFormComponent
  },
  {
    path: 'updateform/:id' ,component: UpdateUsersDataComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
