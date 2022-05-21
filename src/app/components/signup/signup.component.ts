import { Component, OnInit } from '@angular/core';
import { countriesList } from './countries';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyApisService } from 'src/app/services/my-apis.service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  countries: string[] = countriesList.sort();
  allCountries: string[] = [];
  nameOfSelectedCountry: string = '';
  theNameofCountry: string = '';
  ipAddress: string = '';
  country: string = ' ';
  nameOfUser: string = ' ';
  conditionPassword = false;
  passwordWasMatch = false;

  // form and validation
  signupForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/[a-zA-Z]/g),
    ]),
    nationality: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9-()]*'),
      Validators.minLength(8),
    ]),

    passwordConfirmation: new FormControl('', [Validators.required]),
    ipAdress: new FormControl(),
  });

  constructor(private myapi: MyApisService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCountries();
    this.catchIp();
    this.catchNameOfCountry();
    // this.selectNameOfUse('aya');
    // console.log(this.nameOfUser);
  }

  checkPasswordMatch(e: any) {
    if (e.target.value == this.signupForm.controls['password'].value) {
      this.passwordWasMatch = true;
    } else {
      this.passwordWasMatch = false;
    }
  }

  getAllCountries() {
    this.myapi.getCityInformation().subscribe((a: any) => {
      for (let i = 0; i < a.length; i++) {
        let element = a[i].countryName;
        this.allCountries.push(element);
      }
    });
  }
  catchIp() {
    this.myapi.getApi().subscribe((apivalue: any) => {
      this.ipAddress = apivalue.ip;
    });
  }
  catchNameOfCountry() {
    this.myapi.getCountry(this.ipAddress).subscribe((countrynamevalue: any) => {
      this.theNameofCountry = countrynamevalue.country_name;
      if (this.allCountries.includes(this.theNameofCountry)) {
        console.log(this.theNameofCountry);
        this.country = this.theNameofCountry;
      }
    });
  }

  selectNameOfUse(e: any) {
    this.nameOfUser = e.target.value;
  }
  submitInfo(data: any) {
    this.myapi.userdata = data.value.name;
    localStorage.setItem('Token', Math.random().toString(36).substr(2));
    this.router.navigateByUrl(`/info/${data.value.name}`);
  }
  // goToWelcomeComponent(nameOfUser: any) {
  //   this.router.navigateByUrl(`/info/${nameOfUser}`);
  //   // if (localStorage.getItem('token')) {
  //   //   return localStorage.removeItem('token');
  //   // }
  //   // return localStorage.setItem('token', Math.random().toString(36).substr(2));
  // }
}
