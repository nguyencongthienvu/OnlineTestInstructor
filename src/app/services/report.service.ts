import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UrlServiceService } from '../services/url-service.service';
import { Course } from '../models/course';
@Injectable()
export class ReportService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http,private url: UrlServiceService) {}
  GetCourse(token): Promise<any> {
    let url: string = `${this.url.BASE_URL}/course`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }
  GetReport(Course:Course,token)
  {
    let url: string = `${this.url.BASE_URL}/report`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url, Course,{headers: headers}).toPromise();
  }
  GetCourseById(Course:Course,token): Promise<any> {
    let url: string = `${this.url.BASE_URL}/course/coursebycourseid`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url, Course,{headers: headers}).toPromise();
  }
}
