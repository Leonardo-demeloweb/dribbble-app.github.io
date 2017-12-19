
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';



import {MatSelectModule,MatFormFieldModule, MatInputModule} from '@angular/material';
import { Injectable } from '@angular/core';

declare const require: any;
declare const $: any;


interface Shots {
   id: number;
   title: string;
   description: string;
   likes_count: number;
   comments_count: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  shots: Shots [] = [];
  chosenType: string;
  chosenTime: string;

  type = [
    {value: '', viewValue: 'No preference'},
    {value: 'animated', viewValue: 'Animated'},
    {value: 'attachments', viewValue: 'Attachments'},
    {value: 'debuts', viewValue: 'Debuts'},
    {value: 'playoffs', viewValue: 'Playoffs'},
    {value: 'rebounds', viewValue: 'Rebounds'},
    {value: 'teams', viewValue: 'Teams'},
    {value: '', viewValue: 'Popular'},
  ];

  time = [
    {value: '', viewValue: 'No preference'},
    {value: 'week', viewValue: 'This week'},
    {value: 'month', viewValue: 'This month'},
    {value: 'year', viewValue: 'This year'},
    {value: 'ever', viewValue: 'All time'},
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const host = "https://api.dribbble.com/v1/shots/?page=4&access_token=";
    let type = this.chosenType;
    let time = this.chosenTime;
    let tokenUrl1 = host+'ba8b7663f944563dc709eee7b9ab8a0730a4b209812a9bd3e6fe733fbac010e0';
    let tokenUrl2 = tokenUrl1+'&list='+type;
    let tokenUrl3 = tokenUrl2+'&per_page=54';
    let tokenUrl4 = tokenUrl3+'&timeframe='+time;


    let req = this.http.get<Shots[]>(tokenUrl4)
    .subscribe (
      res => {
        console.log (res);
        console.log (res[0].id)
        console.log (res[0].title)
        console.log (res[0].likes_count)
        console.log (res[0].comments_count)
        this.shots = res;
        console.log(this.shots);

      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Error frontend")
        } else {
          console.log("Error backend")

        }
      }
    )
  }

}
