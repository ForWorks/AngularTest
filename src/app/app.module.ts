import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { RefDirective } from './components/ref.directive';

@NgModule({
  declarations: [
    AppComponent,
    EditUserComponent,
    RefDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
