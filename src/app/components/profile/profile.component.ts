import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service';
import { ProfileServiceService } from '../../services/profile-service.service';
import { Profile } from '../../models/profile';
declare var $:any;
var self : any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  pnotify = undefined;
  ProfileDetail:any=[];
  Profile: Profile = new Profile();
  infordata:any;
  constructor(private router: Router,private profile: ProfileServiceService, pnotifyService: PnotifyService) {
    this.pnotify = pnotifyService.getPNotify();
   }

  logout()
  {
    this.router.navigateByUrl('/login');
  }

  ProfileDetailInfo()
  {
    const token = localStorage.getItem('token');
    if(token == '' || token == null ) 
    {
      this.logout();
    }else{
      if (token ) {
        this.profile.Profile(token).then((profiledata) => {
          
          if (profiledata.json().status === 'successfully') {
            this.ProfileDetail = profiledata.json().data
          }
          else if(profiledata.json().status === 'nodata')
          {
            this.pnotify.error({
              text: "Không có dữ liệu !",
              delay:1000
            });    
          }
          else
          {
            this.logout(); 
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
  }

  private profileAfterEdit()
  {
    const token = localStorage.getItem('token');
    if(token == '' || token == null ) 
    {
      this.logout();
    }else{
      if (token ) {
        this.profile.Profile(token).then((profiledata) => {
          
          if (profiledata.json().status === 'successfully') {
            this.ProfileDetail = profiledata.json().data
            location.reload();
          }
          else if(profiledata.json().status === 'nodata')
          {
            this.pnotify.error({
              text: "Không có dữ liệu !",
              delay:1000
            });    
          }
          else
          {
            this.logout(); 
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
  }

  private Edit()
  {
    const token = localStorage.getItem('token');
    this.Profile={
     "fullname": $('#fullname').val(),
     "email":$('#email').val(),
     "sex":$('#sex').val(),
     "password":$('#password').val()
    }
    if(token == '' || token == null) 
    {
      this.logout();
    }
    else
    {
      this.profile.EditProfile(this.Profile,token).then((data)=>{
        if(data.json().errorCode == 0 && data.json().status === 'successfully')
          {
            this.pnotify.success({
              text: "Sửa Thông Tin Thành Công !",
              delay:1000
            }); 
            this.profileAfterEdit();

          }else if(data.json().status === 'fail')
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
              text: "Sửa Thông Tin Thất Bại !",
              delay:1000
            });  
          }
           }).catch((err) => {
          console.log(err);
      });
    }
  }
  ngOnInit() {
    self=this;
    self.ProfileDetailInfo();
    $('#profileedit').modal({show: false, backdrop: 'static', keyboard: false }).on('show.bs.modal',function(){
    });
    $('.btn_add').click(function(){
    const token = localStorage.getItem('token');
    if(token == '' || token == null) 
    {
      self.logout();
    }
    else{
      if (token) {
        self.profile.Profile(token).then((profiledata) => {

          if(profiledata.json().errorCode == 0 && profiledata.json().status === 'successfully')
          {
            self.infodata = profiledata.json().data;
            $('#profileedit').modal("show");

          }else if(profiledata.json().status === 'fail')
          {
            self.logout();
            self.pnotify.error({
              text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
              delay:2000   
            });
          }
          else if(profiledata.json().status==='nodata')
          {
            this.pnotify.error({
              text: "Không có dữ liệu !",
              delay:1000
            });  
          }
           }).catch((err) => {
          console.log(err);
        });
        $(this).removeData('bs.modal');
      }
    }   
    }) 
  }

}
