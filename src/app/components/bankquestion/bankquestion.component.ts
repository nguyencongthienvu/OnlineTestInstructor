import { Component, OnInit } from '@angular/core';
import { CourseServiceService } from '../../services/course-service.service';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service';
import { Topic } from '../../models/topic';
import { BankQuestion} from '../../models/bankquestion';
declare var $:any;
var self : any;
var tbl : any;
@Component({
  selector: 'app-bankquestion',
  templateUrl: './bankquestion.component.html',
  styleUrls: ['./bankquestion.component.css']
})
export class BankquestionComponent implements OnInit {
  pnotify = undefined;
  course:any =[];
  topic:any=[];
  topicadd:any=[];
  question:any=[];
  Topic: Topic = new Topic();
  BankQuestion : BankQuestion = new BankQuestion();
  constructor(private router: Router,private getcourse: CourseServiceService, pnotifyService: PnotifyService) {
    this.list_data_course();
    this.pnotify = pnotifyService.getPNotify();
   }
   search()
  {
    const token = localStorage.getItem('token');
    this.BankQuestion = {
      "tpid":$("#topic").val()
    }
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      
      this.getcourse.GetBankQuestion(this.BankQuestion,token).then((question) => {
        if(question.json().errorCode==0)
        {
          this.question = question.json().data;
          tbl.clear().draw();
          tbl.rows.add(this.question); // Add new data
          tbl.columns.adjust().draw();
        }
        else if(question.json().status === 'fail')
        {
          this.logout();
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
            delay:2000   
          });
        }
        else if(question.json().status==='nodata')
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
  onSubmit()
  {
    const token = localStorage.getItem('token');
    this.BankQuestion={
      "question":$('#question').val(),
      "optiona":$('#optiona').val(),
      "optionb":$('#optionb').val(),
      "optionc":$('#optionc').val(),
      "optiond":$('#optiond').val(),
      "correctanswer":$('#correctanswer').val(),
      "level":$('#level').val(),
      "tpid":$('#topic2').val()
    }
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      
      this.getcourse.AddQuestion(this.BankQuestion,token).then((question) => {
        if(question.json().errorCode==0)
        {
          this.question = question.json().data;
          this.pnotify.success({
            text: "Sửa Thông Tin Thành Công !",
            delay:1000
          }); 
          this.getcourse.GetBankQuestion(this.BankQuestion,token).then((question) => {
            if(question.json().errorCode==0)
            {
              this.question = question.json().data;
              tbl.clear().draw();
              tbl.rows.add(this.question); // Add new data
              tbl.columns.adjust().draw();
            }
            else if(question.json().status === 'fail')
            {
              this.logout();
              this.pnotify.error({
                text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
                delay:2000   
              });
            }
            else if(question.json().status==='nodata')
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
        else if(question.json().status === 'fail')
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
            text: "Thêm Thất Bại",
            delay:2000   
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  }
  Edit()
  {
    const token = localStorage.getItem('token');
    this.BankQuestion={
      "question":$('#question2').val(),
      "optiona":$('#optiona2').val(),
      "optionb":$('#optionb2').val(),
      "optionc":$('#optionc2').val(),
      "optiond":$('#optiond2').val(),
      "correctanswer":$('#correctanswer2').val(),
      "level":$('#level2').val(),
      "tpid":$('#topic').val()
    }
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      
      this.getcourse.UpdateQuestion(this.BankQuestion,self.rowId,token).then((question) => {
        if(question.json().errorCode==0)
        {
          this.question = question.json().data;
          this.pnotify.success({
            text: "Sửa Thông Tin Thành Công !",
            delay:1000
          }); 
          this.getcourse.GetBankQuestion(this.BankQuestion,token).then((question) => {
            if(question.json().errorCode==0)
            {
              this.question = question.json().data;
              tbl.clear().draw();
              tbl.rows.add(this.question); // Add new data
              tbl.columns.adjust().draw();
            }
            else if(question.json().status === 'fail')
            {
              this.logout();
              this.pnotify.error({
                text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
                delay:2000   
              });
            }
            else if(question.json().status==='nodata')
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
        else if(question.json().status === 'fail')
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
            text: "Thêm Thất Bại",
            delay:2000   
          });
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
    $('.btn_add').click(function(){
      $('#questionadd').modal("show");
      var Id = $('#hideId').val();
      if(Id==0)
      {
        $('.modal-title').text("Thêm Câu Hỏi");
        $('#question').val(""),
        $('#optiona').val(""),
        $('#optionb').val(""),
        $('#optionc').val(""),
        $('#optiond').val(""),
        $('#correctanswer').val("")
      }
    })
    self = this;
    tbl = $("#questionload").DataTable({
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
      rowId: "qnbid",
      columns: [
        { data: null},
        { data: "question" },  
        { data: "optiona" },
        { data: "optionb" },   
        { data: "optionc" },   
        { data: "optiond" },
        { data: "correctanswer",render: function ( data ) {
          if(data=="optiona")
          {
            return 'Đáp Án 1';
          }
          else if(data=="optionb")
          {
            return 'Đáp Án 2';
          }
          else if(data=="optionc")
          {
            return 'Đáp Án 3';
          }
          else if(data=="optiond")
          {
            return 'Đáp Án 4';
          }
          else
          {
            return '';
          }
        }
        },  
        { data: "level", render: function ( data ) {
          if(data==0)
          {
            return 'Dễ';
          }
          else if(data==2)
          {
            return 'Trung Bình';
          }
          else if(data==3)
          {
            return 'Khó';
          }
          else
          {
            return '';
          }
        }},                          
        { data: null,  render: function ( data, type, row ) {
          return '<i data-group="grpEdit" class="fa fa-check text-warning m-1 pointer" ></i>'+
          '<i data-group="grpDelete" class="fa fa-remove text-danger m-1 pointer"></i>';
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
    $('#course').select2({
      placeholder:'Chọn môn học'
    });
    $('#topic').select2({
      placeholder:'Chọn chủ đề'
    });
    $('#course').on('change', function(){
    const token = localStorage.getItem('token');
    self.Topic = {
      "cid":$("#course").val()
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
    $('#course2').select2({
      placeholder:'Chọn môn học'
    });
    $('#topic2').select2({
      placeholder:'Chọn chủ đề'
    });
    $('#course2').on('change', function(){
      const token = localStorage.getItem('token');
      self.Topic = {
        "cid":$("#course2").val()
      }
      if(token == '' || token == null)
      {
        self.logout();
      }else{
      if (token) {
        
        self.getcourse.GetTopic(self.Topic,token).then((topicadd) => {
          if(topicadd.json().errorCode==0)
          {
            self.topicadd = topicadd.json().data;
          }
          else if(topicadd.json().status === 'fail')
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
      $('#questionedit').modal({show: false, backdrop: 'static', keyboard: false }).on('show.bs.modal',function(){
        $('#correctanswer2').select2();
        $('#level2').select2();
        var Id2=$('#hideId2').val();
        if(Id2==0)
        {
          $('.modal-title').text("Thêm Câu Hỏi");
          $('#question').val(""),
          $('#optiona').val(""),
          $('#optionb').val(""),
          $('#optionc').val(""),
          $('#optiond').val(""),
          $('#correctanswer').val("")
  
        }
        else
        {
          $('.modal-title').text("Sửa Câu Hỏi");
          $('#question2').val(self.infodata.question),
          $('#optiona2').val(self.infodata.optiona),
          $('#optionb2').val(self.infodata.optionb),
          $('#optionc2').val(self.infodata.optionc),
          $('#optiond2').val(self.infodata.optiond),
          $('#correctanswer2').val(self.infodata.correctanswer).change(),
          $('#level2').val(self.infodata.level).change()
        }
      });
  }
  private bindTableEvents()
  {
    $('#dataTable_wrapper').removeClass("container-fluid");
    $('i[data-group=grpEdit]').off('click').click(function(){
      const token = localStorage.getItem('token');
      self.rowId=$(this).closest('tr').attr('id');
      $('#hideId2').val(self.rowId);
      self.getcourse.GetQuestionById(self.rowId,token).then(data=>{
        if(data.json().errorCode == 0 && data.json().status === 'successfully')
        {
          self.infodata = data.json().data;
          $('#questionedit').modal("show");
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
      $(this).removeData('bs.modal');
  });
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
                self.getcourse.DeleteQuestion(self.rowId,token).then(data=>{
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
