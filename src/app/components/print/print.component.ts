import { Component, OnInit } from '@angular/core';
import { CourseServiceService } from '../../services/course-service.service';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service';
import {TestService} from '../../services/test.service';
import {Test} from '../../models/test';
import {QuestionService} from '../../services/question.service';
import { Topic } from '../../models/topic';
import { Question } from '../../models/question';
declare var $:any;
var self : any;
var tbl : any;
@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  pnotify = undefined;
  course:any =[];
  test:any=[];
  topic:any=[];
  totaltest:any=[];
  totalquestion:any=[];
  totalmark:any=[];
  totalmarkcheck:any=[];
  check:any=[];
  checkadd:any=[];
  questData:any = [];
  testdata:any=[];
  Test: Test = new Test();
  Topic: Topic = new Topic();
  Question:Question = new Question();
  constructor(private router: Router,private getcourse: CourseServiceService, pnotifyService: PnotifyService,private getTest: TestService,private getQuestion:QuestionService) {
    this.list_data_course();
    this.pnotify = pnotifyService.getPNotify();
  }

  show() {
    const token = localStorage.getItem('token');
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      const printData = {
        "testid":$("#test").val(),
        "cid": $("#course").val()
      }
      this.getTest.printTest(printData, token).then((data) => {
        if(data.json().errorCode==0)
        {
          this.testdata = data.json().data[0];
          this.getQuestionData();
          
        }
        else if(data.json().status === 'fail')
        {
          this.logout();
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
            delay:2000   
          });
        }
        else if(data.json().status==='nodata')
        {
          this.pnotify.error({
            text: "Không có dữ liệu cần xem.",
            delay:2000   
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  }

  getQuestionData() {
    const token = localStorage.getItem('token');
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      const Data = {
        "testid":$("#test").val(),
      }
      this.getTest.Question(Data, token).then((data) => {
        if(data.json().errorCode==0)
        {
          this.questData = data.json().data;
          
        }
        else if(data.json().status === 'fail')
        {
          this.logout();
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
            delay:2000   
          });
        }
        else if(data.json().status==='nodata')
        {
          this.pnotify.error({
            text: "Không có dữ liệu cần xem.",
            delay:2000   
          });
          this.questData = data.json().data;
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  }

  backhome()
  {
    this.router.navigate(['/home']);  
  }

  //dang xuat
  logout()
  {
    this.router.navigateByUrl('/login');
  }

  list_data_course(){
    const token = localStorage.getItem('token');
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      
      this.getcourse.GetCourse(token).then((course) => {
        if(course.json().errorCode==0)
        {
          this.course = course.json().data;
          
        }
        else if(course.json().status === 'fail')
        {
          this.logout();
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
            delay:2000   
          });
        }
        else if(course.json().status==='nodata')
        {
          this.pnotify.error({
            text: "Không có dữ liệu cần xem.",
            delay:2000   
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }
}

  ngOnInit() {
    self=this;

    $('#course').select2({
      placeholder:'Chọn môn học'
    });

    $('#test').select2({
      placeholder:'Chọn đề kiểm tra'
    });

    $('#course').on('change', function(){
      const token = localStorage.getItem('token');
      self.Test = {
        "cid":$("#course").val()
      }
      if(token == '' || token == null)
      {
        self.logout();
      }else{
      if (token) {
        
        self.getTest.GetTest(self.Test,token).then((test) => {
          
          if(test.json().errorCode==0)
          {
            self.test = test.json().data;
            
          }
          else if(test.json().status === 'fail')
          {
            self.logout();
            self.pnotify.error({
              text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
              delay:2000   
            });
          }
          else if(test.json().status === 'nodata')
          {
            self.pnotify.error({
              text: "Không có dữ liệu cần xem.",
              delay:2000   
            });
            self.test = test.json().data;
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    }
      });

    $('#print').on('click', function(){
      var divToPrint=document.getElementById('a');

                  // var newWin=window.open('','Print-Window');

                  // newWin.document.open();

                  // newWin.document.write('<html><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');

                  // newWin.document.close();

                  // setTimeout(function(){newWin.close();},10);
                  Popupaaa(divToPrint.innerHTML);
                  
    });

    function Popupaaa(data) {
      var mywindow = window.open('', 'new div', 'height=400,width=600');
      mywindow.document.write(`<html><head><title></title>`);
      mywindow.document.write('<link rel="stylesheet" href="../../../assets/vendor/bootstrap/css/bootstrap.css" type="text/css"/>');
      mywindow.document.write('</head><body >');
      mywindow.document.write('<link rel="stylesheet" href="../../../styles.css" type="text/css" />');
      mywindow.document.write(data);
      mywindow.document.write('</body></html>');
      mywindow.document.close();
      mywindow.focus();
      setTimeout(function(){mywindow.print();},1000);
    // mywindow.close();
  
      return true;
    }
  }

}
