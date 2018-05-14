import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userprofilepage',
  templateUrl: './userprofilepage.component.html',
  styleUrls: ['./userprofilepage.component.scss']
})
export class UserprofilepageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  sendMessage(){
    console.log("sendMessage");
  }

}
