import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service';
import { ReportService } from '../../services/report.service';
import { Course} from '../../models/course'
import * as moment from 'moment';
declare var $:any;
var self : any;
var tbl : any;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  pnotify = undefined;
  course:any =[];
  coursebyid:any=[];
  courseid:any=[];
  report:any=[];
  Course:Course = new Course();
  constructor(private router: Router,private getreport: ReportService, pnotifyService: PnotifyService) { 
    this.list_data_course();
    this.pnotify = pnotifyService.getPNotify();
  }
  search()
  {
    const token = localStorage.getItem('token');
    this.Course = {
      "cid":$("#course").val()
    }
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      
      this.getreport.GetReport(this.Course,token).then((report) => {
        if(report.json().errorCode==0)
        {
              this.report = report.json().data;
              tbl.clear().draw();
              tbl.rows.add(this.report); // Add new data
              tbl.columns.adjust().draw();
           
        }
        else if(report.json().status === 'fail')
        {
          this.logout();
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
            delay:2000   
          });
        }
        else if(report.json().status==='nodata')
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
      
      this.getreport.GetCourse(token).then((course) => {
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
    tbl = $("#report").DataTable({
      columnDefs: [
          { orderable: false, targets: [0,6,7] }
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
      rowId: "stid",
      columns: [
        { data: null},
        { data: "username" },  
        { data: "fullname" },
        { data: "testdate" ,render: function(data){
          return moment(data).format("DD/MM/YYYY");
        }},   
        { data: "testname" },
        { data: "marks" },
        { data: "",render:function(data){
          if(data==''||data==null)
          {
            return ''
          }
        }},
        {data:"cname"}
      ],
      dom: 'Bfrtip',
    buttons: [ 
      {
        extend: 'excelHtml5',
        text: 'Xuất file Excel',
        customize: function ( xlsx ){
            var sheet = xlsx.xl.worksheets['sheet1.xml'];

            // jQuery selector to add a border
            $('row c[r*="10"]', sheet).attr( 's', '25' );
        },
        exportOptions: {
          columns: [1,2,5]
        }
      },
      {
        extend: 'pdfHtml5',
        text: 'Xuất file PDF',
        download: 'open',
        title: 'Danh sách điểm',
        exportOptions: {
          columns: [1,2,3,4,5,6,7]
        },
      },
      {
        
        extend: 'print',
        text: 'In Giấy',
        title: 'Danh Sách Điểm',
        exportOptions: {
            columns: [1,2,3,4,5,6,7]
        }
      }
    ],
    select:true,
      initComplete: function (settings, json) {
        //$("select[name=tbl_length]").select2({ width: '80px', minimumResultsForSearch: -1 });
      },
      drawCallback: function( settings ) {
        //self.bindTableEvents();
      }
    });

    tbl.on('order.dt search.dt', function () {
      tbl.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
          cell.innerHTML = i + 1;
      });
    }).draw(); 
  }

}
