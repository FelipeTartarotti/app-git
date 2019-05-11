import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
//https://hidden-sierra-27470.herokuapp.com/ | https://git.heroku.com/hidden-sierra-27470.git

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  public numberUserByPage = 7;
  public users;
  public localUsers;
  public isDataAvailable = false;
  public initialUser = 0;
  public finalUser = this.numberUserByPage;
  public numberUsers;

  constructor(private github: GithubService,public router: Router,private spinner: NgxSpinnerService) {   }
  ngOnInit() {
    
  }

  async getUsers() {
    this.spinner.show();
    await this.github.getUsers("0",this.numberUsers)
    .then((result: any) => {
      window.localStorage.setItem("users", JSON.stringify(result));
      this.showResult();  
      this.spinner.hide();
    })
    .catch((error: any) => {
      this.spinner.hide();
      alert("Ops! We couldn't retive the information");
      console.log(error);
    });
  }

  showResult(){
    this.localUsers = JSON.parse(localStorage.getItem("users"));
    this.users = this.localUsers.slice(this.initialUser,this.finalUser);
    this.isDataAvailable = true;
  }

  detailsButton(index){
    window.localStorage.setItem("username", JSON.stringify(this.users[index].login));
    this.router.navigate(['details']);
  }

  nextPage(){
    if(this.finalUser>this.numberUsers){
      this.initialUser = this.initialUser - this.numberUserByPage;
      this.finalUser = this.finalUser - this.numberUserByPage;
    }
    this.initialUser = this.initialUser + this.numberUserByPage;
    this.finalUser = this.finalUser + this.numberUserByPage;
    this.localUsers = JSON.parse(localStorage.getItem("users"));
    this.users = this.localUsers.slice(this.initialUser,this.finalUser);
  }

  previousPage(){
    this.initialUser = this.initialUser - this.numberUserByPage;
    this.finalUser = this.finalUser - this.numberUserByPage;
    if(this.initialUser<0){
      this.initialUser = 0;
    }
    if(this.finalUser<this.numberUserByPage){
      this.finalUser = this.numberUserByPage;
    }
    this.localUsers = JSON.parse(localStorage.getItem("users"));
    this.users = this.localUsers.slice(this.initialUser,this.finalUser);
  }
}
