import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UrlServiceService } from '../services/url-service.service'
import { Course } from '../models/course';
import {Topic} from '../models/topic';
import { BankQuestion } from '../models/bankquestion';
@Injectable()
export class CourseServiceService {
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
  GetDepartment(token):Promise<any> {
    let url: string = `${this.url.BASE_URL}/course/departmentbyid`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }
  AddCourse(Course:Course,token)
  {
    let url: string = `${this.url.BASE_URL}/course`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url, Course,{headers: headers}).toPromise();
  }
  GetCourseById(rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/course/coursebyid`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url, {rowId},{headers: headers}).toPromise();
  }
  EditCourse(Course:Course,rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/course`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.put(url, {Course,rowId},{headers: headers}).toPromise();
  }
  DeleteCourse(rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/course/`+rowId;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.delete(url,{headers: headers}).toPromise();
  }
  GetTopic(Topic:Topic,token)
  {
    let url: string = `${this.url.BASE_URL}/topic`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,Topic,{headers: headers}).toPromise();
  }
  AddTopic(Topic:Topic,token)
  {
    let url: string = `${this.url.BASE_URL}/topic/addtopic`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,Topic,{headers: headers}).toPromise();
  }
  DeleteTopic(rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/topic/`+rowId;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.delete(url,{headers: headers}).toPromise();
  }
  Updatetopic(Topic:Topic,rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/topic`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.put(url, {Topic,rowId},{headers: headers}).toPromise();
  }
  GetTopicById(rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/topic/topicbyid`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url, {rowId},{headers: headers}).toPromise();
  }
  GetBankQuestion(BankQuestion:BankQuestion,token)
  {
    let url: string = `${this.url.BASE_URL}/questionbank`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,BankQuestion,{headers: headers}).toPromise();
  }
  AddQuestion(BankQuestion:BankQuestion,token)
  {
    let url: string = `${this.url.BASE_URL}/questionbank/addquestion`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,BankQuestion,{headers: headers}).toPromise();
  }
  DeleteQuestion(rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/questionbank/`+rowId;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.delete(url,{headers: headers}).toPromise();
  }
  
  GetQuestionById(rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/questionbank/questionbankbyid`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url, {rowId},{headers: headers}).toPromise();
  }
  UpdateQuestion(BankQuestion:BankQuestion,rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/questionbank`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.put(url, {BankQuestion,rowId},{headers: headers}).toPromise();
  }
}
