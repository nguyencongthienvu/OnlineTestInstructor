import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UrlServiceService } from '../services/url-service.service'
import {Question} from '../models/question';
import {Test} from '../models/test';
@Injectable()
export class QuestionService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http,private url: UrlServiceService) {}
  GetTotalQuestion(Test:Test,token)
  {
    let url: string = `${this.url.BASE_URL}/question`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,Test,{headers: headers}).toPromise();
  }
  GenerateQuestion(Question:Question,token)
  {
    console.log(Question)
    let url: string = `${this.url.BASE_URL}/question/generate`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,Question,{headers: headers}).toPromise();
  }
  GetTotalMark(Test:Test,token)
  {
    let url: string = `${this.url.BASE_URL}/question/totalmark`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,Test,{headers: headers}).toPromise();
  }
  GetAll(Test:Test,token)
  {
    let url: string = `${this.url.BASE_URL}/question/findall`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,Test,{headers: headers}).toPromise();
  }
  DeleteQuestion(rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/question/`+rowId;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.delete(url,{headers: headers}).toPromise();
  }
}
