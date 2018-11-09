import { Component, OnInit } from '@angular/core';
import { CourseServiceService } from '../../services/course-service.service';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service';
import { Course} from '../../models/course'
declare var $:any;
var self : any;
var tbl : any;
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  pnotify = undefined;
  course:any =[];
  department:any=[];
  Course:Course = new Course();
  infordata:any;
  rowId:any;
  constructor(private router: Router,private getcourse: CourseServiceService, pnotifyService: PnotifyService) { 
    this.pnotify = pnotifyService.getPNotify(); 
    this.list_data_department();
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
  onSubmit()
  {
    const token = localStorage.getItem('token');
    this.Course={
           "ccode": $('#ccode').val(),
            "mcode": $('#mcode').val(),
            "mname": $('#mname').val(),
            "cname": $('#cname').val(),
            "ects": $('#ects').val(),
            "year": $('#year').val(),
            "sem": $('#sem').val(),
            "deptid": $('#department').val()
    }
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    this.getcourse.AddCourse(this.Course,token).then((coursedata) => {
      if(coursedata.json().errorCode==0 && coursedata.json().status === 'successfully')
      {
        this.pnotify.success({
          text: "Sửa Thông Tin Thành Công !",
          delay:1000
        }); 
        this.list_data_course();
      }
      else if(coursedata.json().status === 'fail')
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
          text: "Them Thất Bại !",
          delay:1000
        });  
      }
    }).catch((err) => {
      console.log(err);
    });
    }
  }
  Edit()
  {
    const token = localStorage.getItem('token');
    this.Course={
      "ccode": $('#ccode2').val(),
       "mcode": $('#mcode2').val(),
       "mname": $('#mname2').val(),
       "cname": $('#cname2').val(),
       "ects": $('#ects2').val(),
       "year": $('#year2').val(),
       "sem": $('#sem2').val(),
       "deptid": $('#department2').val()
    }
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    this.getcourse.EditCourse(this.Course,self.rowId,token).then((coursedata) => {
      if(coursedata.json().errorCode==0 && coursedata.json().status === 'successfully')
      {
        this.pnotify.success({
          text: "Sửa Thành Công !",
          delay:1000
        }); 
        this.list_data_course();
      }
      else if(coursedata.json().status === 'fail')
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
          text: "Sửa Thất Bại !",
          delay:1000
        });  
      }
    }).catch((err) => {
      console.log(err);
    });
    }
  }
  list_data_department(){
    const token = localStorage.getItem('token');
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      this.getcourse.GetDepartment(token).then((department) => {
        if(department.json().errorCode==0)
        {
          this.department = department.json().data;
        }
        else if(department.json().status === 'fail')
        {
          this.logout();
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
            delay:2000   
          });
        }
        else if(department.json().status==='nodata')
        {
          this.pnotify.error({
            text: "Không có dữ liệu ",
            delay:2000   
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  }
  //lay du lieu môn học
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
          tbl.clear().draw();
          tbl.rows.add(this.course); // Add new data
          tbl.columns.adjust().draw(); // Redraw the DataTable
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
    $('#department').select2();
    $('.btn_add').click(function(){
      $('#departmentadd').modal("show");
      var Id = $('#hideId').val();
      if(Id==0)
      {
        $('.modal-title').text("Thêm Môn Học");
        $('#ccode').val(""),
        $('#mcode').val(""),
        $('#mname').val(""),
        $('#cname').val(""),
        $('#ects').val(""),
        $('#year').val(""),
        $('#sem').val(""),
        $('#department').val("")
      }
    }) 
    $('#courseedit').modal({show: false, backdrop: 'static', keyboard: false }).on('show.bs.modal',function(){
      var Id2=$('#hideId2').val();
      if(Id2==0)
      {
        $('.modal-title').text("Thêm Môn Học");
        $('#ccode2').val(),
        $('#mcode2').val(),
        $('#mname2').val(),
        $('#cname2').val(),
        $('#ects2').val(),
        $('#year2').val(),
        $('#sem2').val()

      }
      else
      {
        $('.modal-title').text("Sửa Môn Học");
        $('#ccode2').val(self.infodata.ccode),
        $('#mcode2').val(self.infodata.mcode),
        $('#mname2').val(self.infodata.mname),
        $('#cname2').val(self.infodata.cname),
        $('#ects2').val(self.infodata.ects),
        $('#year2').val(self.infodata.year),
        $('#sem2').val(self.infodata.sem),
        $('#department2').val(self.infodata.deptid)
      }
    });
    //add vao datatable
    tbl = $("#dataTable").DataTable({
      columnDefs: [
          { orderable: false, targets: [0,7] }
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
      rowId: "cid",
      columns: [
        { data: null},
        { data: "mcode" },  
        { data: "mname" },            
        { data: "ccode" },
        { data: "cname" },
        { data: "ects" },
        { data: "year" },
        { data: "sem" },
        { data: "dept_name" },
        { data: null,  render: function ( data, type, row ) {
          return '<i data-group="grpEdit" class="fa fa-check text-warning m-1 pointer" ></i>'+
          '<i data-group="grpDelete" class="fa fa-remove text-danger m-1 pointer"></i>';
        }}
      ],
      initComplete: function (settings, json) {
        self.list_data_course();
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
  
  bindTableEvents()
  {
    $('#dataTable_wrapper').removeClass("container-fluid");
    $('i[data-group=grpEdit]').off('click').click(function(){
      const token = localStorage.getItem('token');
      self.rowId=$(this).closest('tr').attr('id');
      $('#hideId2').val(self.rowId);
      self.getcourse.GetCourseById(self.rowId,token).then(data=>{
        if(data.json().errorCode == 0 && data.json().status === 'successfully')
        {
          self.infodata = data.json().data;
          $('#courseedit').modal("show");
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
          text: "Không thể sửa.Yêu cầu kiểm tra dữ liệu ràng buộc !",
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
                self.getcourse.DeleteCourse(self.rowId,token).then(data=>{
                    if(data.json().errorCode==0 && data.json().status === 'successfully')
                    {
                      self.pnotify.success({
                        text: "Xóa Thành Công",
                        delay:2000   
                      });
                      self.list_data_course();
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
