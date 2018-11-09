import { Component, OnInit } from '@angular/core';
import { CourseServiceService } from '../../services/course-service.service';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service';
import {TestService} from '../../services/test.service';
import {Test} from '../../models/test'
import * as moment from 'moment';
declare var $:any;
var self : any;
var tbl : any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  pnotify = undefined;
  course:any =[];
  test:any=[];
  Test: Test = new Test();
  constructor(private router: Router,private getcourse: CourseServiceService, pnotifyService: PnotifyService,private getTest: TestService) { 
    this.list_data_course();
    this.pnotify = pnotifyService.getPNotify();
  }
  search()
  {
    const token = localStorage.getItem('token');
    this.Test = {
      "cid":$("#course").val()
    }
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      
      this.getTest.GetTest(this.Test,token).then((test) => {
        if(test.json().errorCode==0)
        {
          this.test = test.json().data;
          tbl.clear().draw();
          tbl.rows.add(this.test); // Add new data
          tbl.columns.adjust().draw();
        }
        else if(test.json().status === 'fail')
        {
          this.logout();
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
            delay:2000   
          });
        }
        else if(test.json().status==='nodata')
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
  Add(){
    const token = localStorage.getItem('token');
    this.Test={
      "testname":$('#testname').val(),
      "testdescription":$('#description').val(),
      "testfrom":$('#testfrom').val(),
      "testto":$('#testto').val(),
      "duration":$('#duration').val(),
      "totalquestions":$('#totalquestions').val(),
      "code":$('#code').val(),
      "cid":$('#course2').val()
    }
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      console.log(this.Test)
      this.getTest.AddTest(this.Test,token).then((data) => {
        if(data.json().errorCode==0)
        {
          this.pnotify.success({
            text: "Thêm Thông Tin Thành Công !",
            delay:1000
          });
          this.getTest.GetTest(this.Test,token).then((test) => {
            if(test.json().errorCode==0)
            {
              this.test = test.json().data;
              tbl.clear().draw();
              tbl.rows.add(this.test); // Add new data
              tbl.columns.adjust().draw();
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
            text: "Không có dữ liệu cần xem.",
            delay:2000   
          });
          // tbl.clear().draw();
          //  tbl.columns.adjust().draw();
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
    this.Test={
      "testname":$('#testname2').val(),
      "testdescription":$('#description2').val(),
      "testfrom":$('#testfrom2').val(),
      "testto":$('#testto2').val(),
      "duration":$('#duration2').val(),
      "totalquestions":$('#totalquestions2').val(),
      "code":$('#code2').val(),
      "cid":$('#course').val()
    }
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      this.getTest.EditTest(this.Test,self.rowId,token).then((data) => {
        if(data.json().errorCode==0)
        {
          this.pnotify.success({
            text: "Sửa Thông Tin Thành Công !",
            delay:1000
          });
          this.getTest.GetTest(this.Test,token).then((test) => {
            if(test.json().errorCode==0)
            {
              this.test = test.json().data;
              tbl.clear().draw();
              tbl.rows.add(this.test); // Add new data
              tbl.columns.adjust().draw();
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
            text: "Không có dữ liệu cần xem.",
            delay:2000   
          });
          // tbl.clear().draw();
          //  tbl.columns.adjust().draw();
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
    $('#course').select2({
      placeholder:'Chọn môn học'
    });
    $('#course2').select2({
      placeholder:'Chọn môn học'
    });
    self=this;
    $('.btn_add').click(function(){
      $('#testadd').modal("show");
      var Id = $('#hideId').val();
      if(Id==0)
      {
        $('.modal-title').text("Thêm Đề Kiểm Tra");
        // $('#question').val(""),
        // $('#optiona').val(""),
        // $('#optionb').val(""),
        // $('#optionc').val(""),
        // $('#optiond').val(""),
        // $('#correctanswer').val("")
      }
    })
    tbl = $("#testload").DataTable({
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
      rowId: "testid",
      columns: [
        { data: null},
        { data: "testname" },
        { data: "testdescription" },   
        { data: "testdate" ,render:function(data){
          if(data==''||data==null)
          {
            return ''
          }
          else
          {
            return moment(data).format("DD/MM/YYYY")
          }  
        }
        },
        { data: "testime", render:function(data){
          if(data==''||data==null)
          {
            return ''
          }
          else
          {
            return moment(data).format("h:mm:ss")
          }
        }},
        { data: "testfrom",render:function(data){
          if(data==''||data==null)
          {
            return ''
          }
          else
          {
            return moment(data).format("DD/MM/YYYY,h:mm:ss a")
          }
        }},  
        { data: "testto",render:function(data){
          if(data==''||data==null)
          {
            return ''
          }
          else
          {
            return moment(data).format("DD/MM/YYYY,h:mm:ss a")
          }
        }},  
        { data: "duration"}, 
        { data: "totalquestions"}, 
        { data: "code"}, 
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
    $('#testedit').modal({show: false, backdrop: 'static', keyboard: false }).on('show.bs.modal',function(){
      $('#course3').select2();
      var Id2=$('#hideId2').val();
      if(Id2==0)
      {
        $('.modal-title').text("Thêm Bài Kiểm Tra");
        $('#testname').val(),
       $('#description').val(),
       $('#testfrom').val(),
       $('#testto').val(),
       $('#duration').val(),
        $('#totalquestions').val(),
        $('#code').val(),
       $('#course3').val()

      }
      else
      {
        $('.modal-title').text("Sửa Bài Kiểm Tra");
        $('#testname2').val(self.infodata.testname),
       $('#description2').val(self.infodata.testdescription),
       $('#testfrom2').val(self.infodata.testfrom).change(),
       $('#testto2').val(self.infodata.testto).change(),
       $('#duration2').val(self.infodata.duration),
        $('#totalquestions2').val(self.infodata.totalquestions),
        $('#code2').val(self.infodata.code)
      }
    });
  }
  private bindTableEvents()
  {
    $('#testload_wrapper').removeClass("container-fluid");
    $('i[data-group=grpEdit]').off('click').click(function(){
      const token = localStorage.getItem('token');
      self.rowId=$(this).closest('tr').attr('id');
      $('#hideId2').val(self.rowId);
      self.getTest.GetTestById(self.rowId,token).then(data=>{
        if(data.json().errorCode == 0 && data.json().status === 'successfully')
        {
          self.infodata = data.json().data;
          console.log(self.infodata);
          $('#testedit').modal("show");
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
                self.getTest.DeleteTest(self.rowId,token).then(data=>{
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
