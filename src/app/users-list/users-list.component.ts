import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../form.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  listUsersData: any = [];
  
  p: Number = 1;

  constructor(private formServices: FormService, private route:Router,  private toastr: ToastrService) {
   }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    this.formServices.getUserlist()
    .subscribe(data =>{
      this.listUsersData = data;
      console.log("dss",this.listUsersData);
    },
    error => console.log("error",error)
    )

  }

  onEdit(_id){
    this.route.navigate(['/updateform/'+_id]);
  
  }

  onDelete(_id){
    this.formServices.deleteUserData(_id).subscribe(data =>{
      this.listUsersData = data;
      this.getUserData();
    },
    error => console.error("error",error)
    )
  }

  addUser(){
    this.route.navigate(['/registrationform']);
    this.toastr.success('Registration Form', 'Add User');
  }

}
