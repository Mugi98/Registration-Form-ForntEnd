import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../form.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-users-data',
  templateUrl: './update-users-data.component.html',
  styleUrls: ['./update-users-data.component.css']
})
export class UpdateUsersDataComponent implements OnInit {

  updatedRegistrationForm: FormGroup;
  id: any;
  getData: any = [];
  name: any;
  images: any;
  currentimages: any;
  state: any = [];
  cities1: Array<any> = [];
  userValue: any;
  outOf: any;
  birthdate: any;
  age: number;

  genders = [
    { id: 1, genderType: 'Male' },
    { id: 2, genderType: 'Female' }
  ]

  constructor(private formServices: FormService, private route: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
    // this.changeState(this.cities1);
    this.onState();
    this.activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.id = params['id'];
      } else {
        this.id = '';
      }
    })
   
  }

  ngOnInit(): void {
    
    this.updatedRegistrationForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'middlename': new FormControl("", Validators.required),
      'lastname': new FormControl("", Validators.required),
      'mobilenumber': new FormControl("", Validators.required),
      'dob': new FormControl("", Validators.required),
      'age': new FormControl("", Validators.required),
      'gender': new FormControl("", Validators.required),
      'physical': new FormGroup({
        'bloodgroup': new FormControl("", Validators.required),
        'height': new FormControl("", Validators.required),
        'weight': new FormControl("", Validators.required)
      }),
      'address': new FormControl("", Validators.required),
      'city': new FormControl("", Validators.required),
      'state': new FormControl("", Validators.required),
      'zipcode': new FormControl("", Validators.required),
      'academicScore': new FormGroup({
        'academic': new FormControl("", Validators.required),
        'hundred': new FormControl(""),
        'percentage': new FormControl(""),
      }),
      'images': new FormControl("", Validators.required),
    })
    this.getUserDataToUpdate(this.id);

  }

  onSubmit() {
    // console.log("hgfds",this.updatedRegistrationForm.value);
    var body = {
      name: this.updatedRegistrationForm.value.name,
      middlename: this.updatedRegistrationForm.value.middlename,
      lastname: this.updatedRegistrationForm.value.lastname,
      mobilenumber: this.updatedRegistrationForm.value.mobilenumber,
      dob: this.updatedRegistrationForm.value.dob,
      age: this.updatedRegistrationForm.value.age,
      gender: this.updatedRegistrationForm.value.gender,
      physical: this.updatedRegistrationForm.value.physical,
      address: this.updatedRegistrationForm.value.address,
      city: this.updatedRegistrationForm.value.city,
      state: this.updatedRegistrationForm.value.state,
      zipcode: this.updatedRegistrationForm.value.zipcode,
      academicScore: this.updatedRegistrationForm.value.academicScore,
      images: this.currentimages,
      id: this.id
    }
    // console.log(body);
    this.formServices.postupdatedUserData(body)
      .subscribe(
        data => 
        // console.log("Success", data),
        error => 
        console.log("error", error)
      )
    // console.log(this.updatedRegistrationForm.value);
    this.updatedRegistrationForm.reset()
    this.route.navigate(['/userdatalist']);
    
    this.toastr.success('Updated YourRegistration Form', 'Submitted!');
  }

  getUserDataToUpdate(id: any) {
    this.formServices.updateUserData(id)
      .subscribe(data => {
        this.getData = data;
        // console.log("Get User to be updated", this.getData);
        // console.log("Get UserImages to be updated",this.currentimages = this.getData.newData[0].images);
        this.updatedRegistrationForm.setValue({
          'name': this.getData.newData[0].name,
          'middlename': this.getData.newData[0].middlename,
          'lastname': this.getData.newData[0].lastname,
          'mobilenumber': this.getData.newData[0].mobilenumber,
          'dob': this.getData.newData[0].dob,
          'age': this.getData.newData[0].age,
          'gender': this.getData.newData[0].gender,
          'physical': ({
            'bloodgroup': this.getData.newData[0].physical[0].bloodgroup,
            'height': this.getData.newData[0].physical[0].height,
            'weight': this.getData.newData[0].physical[0].weight,
          }),
          'address': this.getData.newData[0].address,
          'state': this.getData.newData[0].state,
          'city': this.getData.newData[0].city,
          'zipcode': this.getData.newData[0].zipcode,
          'academicScore': ({
          'academic': this.getData.newData[0].academicScore[0].academic,
          'hundred': this.getData.newData[0].academicScore[0].hundred,
          'percentage': this.getData.newData[0].academicScore[0].percentage,
          }),
          'images': ' ',
        })
      //   this.updatedRegistrationForm.patchValue({
      //     'state': this.getData.newData[0].state
      //  })
      // console.log('this.state.newData',this.state.newData)
        this.cities1 = this.state.newData.filter(con => {
          return con.state == this.getData.newData[0].state;
        });
        // console.log("ththt",this.state.newData)
      
        this.cities1=this.cities1[0].cities
      })
  }

  Profile(event) {
    console.log("Profile Event", event);
    this.images = event.target.files[0];
    // console.log(this.images);
  }
  Upload() {
    console.log("File Slected.");
    var formdata = new FormData();
    formdata.append("file", this.images);
    this.formServices.imageupload(formdata)
      .subscribe(
        data => {
          this.images = data;
          console.log("Success",

            this.currentimages = data.profilePicture)
        },
        error => console.log("error", error)
      )
    // console.log("yashhhhhhhhhh", this.currentimages)
  }

  onState() {
    this.formServices.getState()
      .subscribe(data => {
        this.state = data;
        // console.log("onState", this.state.newData);
        // console.log("onState", this.state.newData[0].cities);
      },
        error => console.log("error", error)
      )
  }

  changeState(event: any){
    // console.log("dddd",this.getData.newData[0].cities)
      this.cities1 = this.state.newData.filter(con => {
        return con.state == event.target.value;
      });
      this.cities1=this.cities1[0].cities
    // console.log("fjjjjjjj",this.cities1);
  }

  percentageOfUser(){
    this.userValue = Math.floor((this.updatedRegistrationForm.value.academicScore.hundred/500)* 100);
    // console.log("fffff",this.userValue);
    this.outOf = this.userValue ;
  }

  calculateAge(e){
    console.log(e);
    // console.log(moment(e).format('YYYY-MM-DD'));
    this.birthdate = moment(e).format('YYYY-MM-DD');
    // console.log(this.birthdate);
   if (this.birthdate) {
  var timeDiff = Math.abs(Date.now() - new Date(this.birthdate).getTime());
  this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  // console.log(this.age);
  }
    }
}
