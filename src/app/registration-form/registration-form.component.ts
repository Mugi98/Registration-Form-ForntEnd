import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../form.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

 
  registrationForm: FormGroup;
  profileImage: any;
  userValue: any;
  outOf: any;
  state: any=[];
  cities: Array<any>=[];

  constructor(private formServices: FormService, private route:Router, private toastr: ToastrService) { 
    this.onState();    
  }

  public birthdate: any;
   public age: number;

  genders = [
    {id:1, genderType: 'Male'},
    {id:2, genderType: 'Female'},
    {id:3, genderType: 'Others'}

  ]

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      'name': new FormControl(null,Validators.required),
      'middlename': new FormControl(null,Validators.required),
      'lastname': new FormControl(null,Validators.required),
      'mobilenumber': new FormControl(null,Validators.required),
      'dob': new FormControl(null),
      'age': new FormControl(null,Validators.required),
      'gender': new FormControl('Male',Validators.required),
      'physical': new FormGroup({
        'bloodgroup': new FormControl(null,Validators.required),
        'height': new FormControl(null,Validators.required),
        'weight': new FormControl(null,Validators.required)
      }),
      
      'address': new FormControl(null,Validators.required),
      'city': new FormControl(null,Validators.required),
      'state': new FormControl(null,Validators.required),
      'zipcode': new FormControl(null,Validators.required),
      'academicScore': new FormGroup({
      'academic': new FormControl(null,Validators.required),
      'hundred': new FormControl(null,Validators.required),
      'percentage': new FormControl(null),
      }),
      'profilePicture': new FormControl(null,Validators.required),
    })
  }

      calculateAge(e){
        console.log(e);
        // e = moment();
        // console.log(e);
        console.log(moment(e).format('YYYY-MM-DD'));
        this.birthdate = moment(e).format('YYYY-MM-DD');
        console.log(this.birthdate);
       if (this.birthdate) {
      var timeDiff = Math.abs(Date.now() - new Date(this.birthdate).getTime());
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      console.log(this.age);
      }
        }    
  
      keyPress(event: any) {
        const pattern = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
    
        const inputChar = String.fromCharCode(event.charCode);
        if (event.key != 8 && !pattern.test(inputChar)) {
          console.log(inputChar);
        }
      }
  
      percentageOfUser(){
        this.userValue = Math.floor((this.registrationForm.value.academicScore.hundred/500)* 100);
        console.log("fffff",this.userValue);
        this.outOf = this.userValue ;
      }

  onSubmit(){
      console.log("Main Component Data",this.registrationForm.value,this.profileImage);
      const formData = new FormData();
      formData.append('formData', this.registrationForm.value);
      var body={
        data:this.registrationForm.value,
        image: this.profileImage
      }
      this.formServices.userData(body)
      .subscribe(
        data => console.log("Success",data),
        error => console.log("error",error)
      )
    
      this.registrationForm.reset();
      this.route.navigate(['/userdatalist']);
      this.toastr.success('Registration Form', 'Submitted!');
    }


  Profile(event){
    // console.log(event.target.files[0].name);
    this.profileImage =event.target.files[0];
  }
  Upload(){ 
    console.log("File Slected.");
    var formdata = new FormData();
    formdata.append("file", this.profileImage);
    this.formServices.imageupload(formdata)
    .subscribe(
      data => {
        this.profileImage =data;
        console.log("Success",data)
      },
      error => console.log("error",error)
    )
  }
  
  onState(){
    this.formServices.getState()
    .subscribe(data =>{
      this.state = data;
      console.log("onState",this.state.newData);
      console.log("onState",this.state.newData[1].cities);
    },
    error => console.log("error",error)
    )
  }

  changeState(event: any){
    console.log("dddd",event.target.value)
      this.cities = this.state.newData.filter((con: { state: any; }) => {
        return con.state == event.target.value;
      });
      this.cities=this.cities[0].cities
    console.log("fjjjjjjj",this.cities);
  }


}


