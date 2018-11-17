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
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
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
  testdata:any=[];
  Test: Test = new Test();
  Topic: Topic = new Topic();
  Question:Question = new Question();
  constructor(private router: Router,private getcourse: CourseServiceService, pnotifyService: PnotifyService,private getTest: TestService,private getQuestion:QuestionService) { 
    this.list_data_course();
    this.pnotify = pnotifyService.getPNotify();
  }

  private Add()
  {
    const token = localStorage.getItem('token');
    this.Question = {
      "testid":$("#test").val(),
      "tpid":$("#topic").val(),
      "limit":$("#limit").val(),
      "mark":$("#marks").val()
    }
    this.Test = {
      "testid":$("#test").val()
    }
    
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      const TotalQuest = this.totaltest.totalquestions-this.totalquestion;
      const TotalMark = 10 - this.totalmark[0].Total;
      if(($("#marks").val()*$("#limit").val()) <= TotalMark && $("#limit").val() <= TotalQuest)
          {
            this.getQuestion.GenerateQuestion(this.Question,token).then((data) => {
              if(data.json().errorCode==0)
              {
                this.pnotify.success({
                  text: "Tạo Câu Hỏi Thành Công !",
                  delay:1000
                });
                this.search();
                this.getQuestion.GetTotalMark(this.Test,token).then((totalmarkcheck)=>{
                  if(totalmarkcheck.json().errorCode==0)
                  { 
                    this.totalmarkcheck = totalmarkcheck.json().data;
    
                  }
                })
              }
              else if(data.json().status === 'fail')
              {
                this.logout();
                this.pnotify.error({
                  text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
                  delay:2000   
                });
              }
              else
              {
                this.pnotify.error({
                  text: "Không Thể Tạo Câu Hỏi.",
                  delay:2000   
                });
                tbl.clear().draw();
                tbl.columns.adjust().draw();
              }
            }).catch((err) => {
              console.log(err);
            });
          }
          else if(($("#marks").val()*$("#limit").val()) > TotalMark)
          {
            this.pnotify.error({
              text: "Không Thể Tạo Câu Hỏi.Tổng Điểm Vượt 10 !",
              delay:2000   
            });
          }
          else if($("#limit").val() > TotalQuest) {
            this.pnotify.error({
              text: "Không Thể Tạo Câu Hỏi.Số câu hỏi vượt quá số câu hỏi đề cho phép !",
              delay:2000   
            });
          }   
      }
    }
  }

  private search()
  {
    const token = localStorage.getItem('token');
    this.Test = {
      "testid":$("#test").val()
    }
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      
      this.getTest.GetTestByTestId(this.Test,token).then((test) => {
        this.check = test.json().errorCode;
        if(this.check==0)
        {
          this.totaltest = test.json().data;
          this.getQuestion.GetTotalQuestion(this.Test,token).then((total)=>{
            if(total.json().errorCode==0)
            { 
              this.totalquestion = total.json().data.total;
            }
          })
          this.getQuestion.GetTotalMark(this.Test,token).then((totalmark)=>{
            if(totalmark.json().errorCode==0)
            { 
              this.totalmark = totalmark.json().data;
            }
          })
          this.getQuestion.GetAll(this.Test,token).then((data)=>{
            if(data.json().errorCode==0)
            { 
              this.testdata = data.json().data;
              tbl.clear().draw();
              tbl.rows.add(this.testdata); // Add new data
              tbl.columns.adjust().draw();
            }
           
          })
          
        }
        else if(test.json().status === 'fail')
        {
          this.logout();
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
            delay:2000   
          });
        }
        else
        {
          this.pnotify.error({
            text: "Không có dữ liệu cần xem.",
            delay:2000   
          });
          tbl.clear().draw();
          tbl.columns.adjust().draw();
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  }

  public backhome()
  {
    this.router.navigate(['/home']);  
  }

  //dang xuat
  public logout()
  {
    this.router.navigateByUrl('/login');
  }

  private list_data_course(){
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
      $('#test').on('change', function(){
        self.checkadd = $("#test").val();
        
        const token = localStorage.getItem('token');
      self.Topic={
        "cid":$("#course").val()
      }
      self.Test = {
        "testid":$("#test").val()
      }
      if(token == '' || token == null)
      {
        self.logout();
      }else{
      if (token) {
        self.getcourse.GetTopic(self.Topic,token).then((topic) => {
          if(topic.json().errorCode==0)
          {
            self.topic = topic.json().data;
            self.getQuestion.GetTotalMark(self.Test,token).then((totalmarkcheck)=>{
              if(totalmarkcheck.json().errorCode==0)
              { 
                self.totalmarkcheck = totalmarkcheck.json().data;

              }
            })
          }
          else if(topic.json().status === 'fail')
          {
            self.logout();
            self.pnotify.error({
              text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
              delay:2000   
            });
          }
          else if(topic.json().status==='nodata')
          {
            self.pnotify.error({
              text: "Không có dữ liệu cần xem.",
              delay:2000   
            });
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    }
    
      });
      tbl = $("#dataTable").DataTable({
        columnDefs: [
            { orderable: false, targets: [0,8] }
        ],
        aLengthMenu: [
          [10, 25, 50, 100, -1],
          [10, 25, 50, 100, "All"]
        ],
        language: {
          "sProcessing":   "Đang xử lý...",
          "sLengthMenu":   "Xem _MENU_ mục",
          "sZeroRecords":  "Không tìm thấy dòng nào phù hợp",
          "sInfo":         "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
          "sInfoEmpty":    "Đang xem 0 đến 0 trong tổng số 0 mục",
          "sInfoFiltered": "(được lọc từ _MAX_ mục)",
          "sInfoPostFix":  "",
          "sSearch":       "Tìm:",
          "sUrl":          "",
          "oPaginate": {
              "sFirst":    "Đầu",
              "sPrevious": "Trước",
              "sNext":     "Tiếp",
              "sLast":     "Cuối"
          }
        },
        iDisplayLength: 10,
        order: [[1, "asc"]],
        rowId: "qnid",
        columns: [
          { data: null},
          { data: "question" },
          { data: "optiona" },   
          { data: "optionb" },
          { data: "optionc"},  
          { data: "optiond"},  
          { data: "correctanswer"}, 
          { data: "level"}, 
          { data: "mark"}, 
          { data: null,  render: function ( data, type, row ) {
            return '<i data-group="grpDelete" class="fa fa-remove text-danger m-1 pointer"></i>';
          }}
        ],
        initComplete: function (settings, json) {
          //$("select[name=tbl_length]").select2({ width: '80px', minimumResultsForSearch: -1 });
        },
        drawCallback: function( settings ) {
          self.bindTableEvents();
        }
      });
  
      tbl.on('order.dt search.dt', function () {
        tbl.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
      }).draw(); 
  }
  private bindTableEvents()
  {
    $('#dataTable_wrapper').removeClass("container-fluid");
  //   $('i[data-group=grpEdit]').off('click').click(function(){
  //     const token = localStorage.getItem('token');
  //     self.rowId=$(this).closest('tr').attr('id');
  //     $('#hideId2').val(self.rowId);
  //     self.getTest.GetTestById(self.rowId,token).then(data=>{
  //       if(data.json().errorCode == 0 && data.json().status === 'successfully')
  //       {
  //         self.infodata = data.json().data;
  //         $('#testedit').modal("show");
  //       }
  //       else if(data.json().status === 'fail')
  //         {
  //           self.logout();
  //           self.pnotify.error({
  //           text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
  //           delay:2000   
  //           });
  //         }
  //       else
  //       {
  //         self.pnotify.error({
  //         text: "Không thể xóa.Yêu cầu kiểm tra dữ liệu ràng buộc !",
  //         delay:2000   
  //         });
  //       }
  //     });
  //     $(this).removeData('bs.modal');
  // });
  $('i[data-group=grpDelete]').off('click').click(function(){
    const token = localStorage.getItem('token');
    self.rowId=$(this).closest('tr').attr('id');
    $.confirm({
      title:"Thông báo !",
      content: 'Bạn có chắc muốn xóa ?',
      buttons: {
          info: {
            text: 'Xóa',
            btnClass: 'btn-red',
              action: function(){
                self.getQuestion.DeleteQuestion(self.rowId,token).then(data=>{
                    if(data.json().errorCode==0 && data.json().status === 'successfully')
                    {
                      self.pnotify.success({
                        text: "Xóa Thành Công",
                        delay:2000   
                      });
                      self.search();
                    }
                    else if(data.json().status === 'fail')
                    {
                      self.logout();
                      self.pnotify.error({
                        text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
                        delay:2000   
                      });
                    }
                    else
                    {
                      self.pnotify.error({
                        text: "Không thể xóa.Yêu cầu kiểm tra dữ liệu ràng buộc !",
                        delay:2000   
                      });
                    }
                });
            }
          },
          danger: {
            text: 'Hủy',
            btnClass: 'btn-default', // multiple classes.
            action:function(){
            }
          }
      }
    });
  });
}

}
