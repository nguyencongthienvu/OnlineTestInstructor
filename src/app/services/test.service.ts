import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UrlServiceService } from '../services/url-service.service'
import {Test} from '../models/test';
@Injectable()
export class TestService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http,private url: UrlServiceService) {}
  GetTest(Test:Test,token)
  {
    let url: string = `${this.url.BASE_URL}/test`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,Test,{headers: headers}).toPromise();
  }

  AddTest(Test:Test,token)
  {
    let url: string = `${this.url.BASE_URL}/test/addtest`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,Test,{headers: headers}).toPromise();
  }

  DeleteTest(rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/test/`+rowId;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.delete(url,{headers: headers}).toPromise();
  }

  GetTestById(rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/test/testbyid`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url, {rowId},{headers: headers}).toPromise();
  }

  EditTest(Test:Test,rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/test`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.put(url, {Test,rowId},{headers: headers}).toPromise();
  }

  GetTestByTestId(Test:Test,token)
  {
    let url: string = `${this.url.BASE_URL}/test/testbytestid`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,Test,{headers: headers}).toPromise();
  }

  printTest(printData ,token)
  {
    let url: string = `${this.url.BASE_URL}/print`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url, printData ,{headers: headers}).toPromise();
  }

  Question(Data ,token)
  {
    let url: string = `${this.url.BASE_URL}/print/Question`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url, Data ,{headers: headers}).toPromise();
  }

}
