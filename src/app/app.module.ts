import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
//service
import { AuthService } from './services/auth.service';
import { PnotifyService } from './services/pnotify.service';
import { UrlServiceService } from './services/url-service.service';
import { CourseServiceService } from './services/course-service.service';
import {ProfileServiceService} from './services/profile-service.service';
import {TestService} from './services/test.service';
import {ReportService} from './services/report.service';
import {QuestionService} from './services/question.service';
//component
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './shared/login/login.component';
import { MenuComponent } from './shared/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CourseComponent } from './components/course/course.component';
import { TopicComponent } from './components/topic/topic.component';
import { BankquestionComponent } from './components/bankquestion/bankquestion.component';
import { TestComponent } from './components/test/test.component';
import { ReportComponent } from './components/report/report.component';
import { QuestionComponent } from './components/question/question.component';
import { PrintComponent } from './components/print/print.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent,
    ProfileComponent,
    CourseComponent,
    TopicComponent,
    BankquestionComponent,
    TestComponent,
    ReportComponent,
    QuestionComponent,
    PrintComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      {path: 'home', component:HomeComponent,children:[
        {path:'profile', component:ProfileComponent},
        {path:'course', component:CourseComponent},
        {path:'topic', component:TopicComponent},
        {path:'bankquestion', component:BankquestionComponent},
        {path:'test', component:TestComponent},
        {path:'report', component:ReportComponent},
        {path:'question', component:QuestionComponent},
        {path:'print', component:PrintComponent}
      ]}
    ])
  ],
  providers: [AuthService,PnotifyService,UrlServiceService,ProfileServiceService,CourseServiceService,TestService,ReportService,QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
