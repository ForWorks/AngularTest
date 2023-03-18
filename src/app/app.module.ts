import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditRoleComponent } from './components/edit-role/edit-role.component';
import { UserRefDirective } from './components/edit-user/user-ref.directive';
import { FormsModule } from '@angular/forms';
import { RoleRefDirective } from './components/edit-role/role-ref.directive';

@NgModule({
  declarations: [
    AppComponent,
    EditUserComponent,
    EditRoleComponent,
    UserRefDirective,
    RoleRefDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
