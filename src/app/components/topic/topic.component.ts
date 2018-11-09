import { Component, OnInit } from '@angular/core';
import { CourseServiceService } from '../../services/course-service.service';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service';
import { Topic } from '../../models/topic';
declare var $:any;
var self : any;
var tbl : any;
@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  pnotify = undefined;
  course:any =[];
  topic:any=[];
  Topic: Topic = new Topic();
  constructor(private router: Router,private getcourse: CourseServiceService, pnotifyService: PnotifyService) { 
    this.list_data_course();
    this.pnotify = pnotifyService.getPNotify();
  }
  search()
  {
    const token = localStorage.getItem('token');
    this.Topic = {
      "cid":$("#course").val()
    }
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      
      this.getcourse.GetTopic(this.Topic,token).then((topic) => {
        if(topic.json().errorCode==0)
        {
          this.topic = topic.json().data;
          console.log(this.topic)
          tbl.clear().draw();
          tbl.rows.add(this.topic); // Add new data
          tbl.columns.adjust().draw();
        }
        else if(topic.json().status === 'fail')
        {
          this.logout();
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
            delay:2000   
          });
        }
        else if(topic.json().status==='nodata')
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
  //Thêm chủ đề
  Add()
  {
    this.Topic = {
     "topicname": $("#topicname").val(),
     "description": $("#description").val(),
     "cid": $("#course2").val()
    }
    const token = localStorage.getItem('token');
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      
      this.getcourse.AddTopic(this.Topic,token).then((topic) => {
        if(topic.json().errorCode==0)
        {
          this.pnotify.success({
            text: "Sửa Thông Tin Thành Công !",
            delay:1000
          }); 
          this.getcourse.GetTopic(this.Topic,token).then((topic) => {
            if(topic.json().errorCode==0)
            {
              this.topic = topic.json().data;
              tbl.clear().draw();
              tbl.rows.add(this.topic); // Add new data
              tbl.columns.adjust().draw();
            }
            else if(topic.json().status==='nodata')
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
        else if(topic.json().status === 'fail')
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
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  }
  Edit()
  {
    this.Topic = {
      "topicname": $("#topicname2").val(),
      "description": $("#description2").val(),
      "cid": $("#course2").val()
     }
     const token = localStorage.getItem('token');
     if(token == '' || token == null)
     {
       this.logout();
     }else{
     if (token) {
       
       this.getcourse.Updatetopic(this.Topic,self.rowId,token).then((topic) => {
         if(topic.json().errorCode==0)
         {
           this.pnotify.success({
             text: "Sửa Thông Tin Thành Công !",
             delay:1000
           }); 
           this.getcourse.GetTopic(this.Topic,token).then((topic) => {
             if(topic.json().errorCode==0)
             {
               this.topic = topic.json().data;

               tbl.clear().draw();
               tbl.rows.add(this.topic); // Add new data
               tbl.columns.adjust().draw();
             }
             else if(topic.json().status==='nodata')
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
         else if(topic.json().status === 'fail')
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
    self = this;
    // $("#course").on('change',function(){
    //   self.loadtable();
    
    // });
    $.getScript("assets/js/topic.js");
    $('#course2').select2();
    $('#course').select2({
      placeholder:'Chọn môn học'
    });
    $('.btn_add').click(function(){
      $('#topicadd').modal("show");
      var Id = $('#hideId').val();
      if(Id==0)
      {
        $('.modal-title').text("Thêm Chủ Đề");
        $('#topicname').val(""),
        $('#description').val("")
      }
    })
    $('#topicedit').modal({show: false, backdrop: 'static', keyboard: false }).on('show.bs.modal',function(){
      var Id2=$('#hideId2').val();
      if(Id2==0)
      {
        $('.modal-title').text("Thêm Chủ Đề");
        $('#topicname2').val(""),
        $('#description2').val("")

      }
      else
      {
        $('.modal-title').text("Sửa Chủ Đề");
        $('#topicname2').val(self.infodata.topicname),
        $('#description2').val(self.infodata.description)
      }
    });
    tbl = $("#topic").DataTable({
      columnDefs: [
          { orderable: false, targets: [0] }
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
      rowId: "tpid",
      columns: [
        { data: null},
        { data: "topicname" },  
        { data: "description" },            
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
  }
  private bindTableEvents()
  {
    $('#dataTable_wrapper').removeClass("container-fluid");
    $('i[data-group=grpEdit]').off('click').click(function(){
      const token = localStorage.getItem('token');
      self.rowId=$(this).closest('tr').attr('id');
      $('#hideId2').val(self.rowId);
      self.getcourse.GetTopicById(self.rowId,token).then(data=>{
        if(data.json().errorCode == 0 && data.json().status === 'successfully')
        {
          self.infodata = data.json().data;
          $('#topicedit').modal("show");
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
                self.getcourse.DeleteTopic(self.rowId,token).then(data=>{
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
