import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { CardTaskComponent } from './components/card-task/card-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopMenuComponent,
    ProjectsComponent,
    CardTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
