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

  // form and validation
  signupForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]'),
    ]),
    nationality: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('[\u0621-\u064A0-9 ]+$'),
      Validators.minLength(8),
    ]),

    passwordConfirmation: new FormControl('', [Validators.required]),
    ipAdress: new FormControl(),
  });
  // ConfirmedValidator(password, passwordConfirmation) {
  //   if (password == passwordConfirmation) {
  //     this.conditionPassword = true;
  //   }
  // }
  //validator: ConfirmedValidator('password', 'confirm_password')
  // const control = new FormControl('ng', Validators.minLength(3));

  constructor(private myapi: MyApisService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCountries();
    this.catchIp();
    this.catchNameOfCountry();
  }

  get f() {
    return this.signupForm.controls;
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
    console.log(data.value);
  }
  goToWelcomeComponent(username: any) {
    this.router.navigateByUrl(`/info/${username}`);
  }
}
