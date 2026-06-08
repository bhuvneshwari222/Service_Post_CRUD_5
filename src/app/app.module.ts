import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostCardsComponent } from './shared/components/post-cards/post-cards.component';
import { PostDashboardComponent } from './shared/components/post-dashboard/post-dashboard.component';
import { PostFormComponent } from './shared/components/post-form/post-form.component';
import { GetConfirmComponent } from './shared/components/get-confirm/get-confirm.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './shared/materials/module.materials';

@NgModule({
  declarations: [
    AppComponent,
    PostCardsComponent,
    PostDashboardComponent,
    PostFormComponent,
    GetConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
