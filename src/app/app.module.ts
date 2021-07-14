import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import { TodoComponent } from './todo/todo.component';
import {FlexModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HttpService} from "./http.service";
import {HttpClientModule} from "@angular/common/http";
import {MatDividerModule} from "@angular/material/divider";





@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        HttpClientModule,
        MatDividerModule


    ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
