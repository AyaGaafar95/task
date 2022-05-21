import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MyApisService } from 'src/app/services/my-apis.service.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  name = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: MyApisService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((data: any) => {
      this.name = data.params.userName;
      // console.log(data);
      console.log(this.api.userdata);
    });
  }
}
