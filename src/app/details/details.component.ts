import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public user;
  public username : string;
  public isDataAvailable = false;
  public isRepoAvailable = false;
  public numberReposByPage = 7;
  public repos;
  public localRepos;
  public initialRepo = 0;
  public finalRepo = this.numberReposByPage;
  public numberUsers;

  constructor(private github: GithubService,public router: Router,private spinner: NgxSpinnerService) { }
  
  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem("username"));
    this.getUserDetail();
  }

  async getUserDetail(){
    this.spinner.show();
    await this.github.getUserDetail(this.username)
    .then((result: any) => {
      this.user = result;
      this.spinner.hide();
    })
    .catch((error: any) => {
      alert("Ops! We couldn't retive the information");
      console.log(error);
      this.spinner.hide();
    });
    this.isDataAvailable = true;
  }

  async getRepo(){
    this.spinner.show();
    await this.github.getUserRepo(this.username)
    .then((result: any) => {
      window.localStorage.setItem("repos", JSON.stringify(result));
      this.showResult();  
      this.spinner.hide();
    })
    .catch((error: any) => {
      alert("Ops! We couldn't retive the information");
      console.log(error);
      this.spinner.hide();
    });
    this.isRepoAvailable = true;
  }

  showResult(){
    this.localRepos = JSON.parse(localStorage.getItem("repos"));
    this.repos = this.localRepos.slice(this.initialRepo,this.finalRepo);
    this.isDataAvailable = true;
  }

  nextPage(){
    this.localRepos = JSON.parse(localStorage.getItem("repos"));
    if(this.finalRepo>this.localRepos.length){
      this.initialRepo = this.initialRepo - this.numberReposByPage;
      this.finalRepo = this.finalRepo - this.numberReposByPage;
    }
    this.initialRepo = this.initialRepo + this.numberReposByPage;
    this.finalRepo = this.finalRepo + this.numberReposByPage;
    this.repos = this.localRepos.slice(this.initialRepo,this.finalRepo);
  }

  previousPage(){
    this.initialRepo = this.initialRepo - this.numberReposByPage;
    this.finalRepo = this.finalRepo - this.numberReposByPage;
    if(this.initialRepo<0){
      this.initialRepo = 0;
    }
    if(this.finalRepo<this.numberReposByPage){
      this.finalRepo = this.numberReposByPage;
    }
    this.localRepos = JSON.parse(localStorage.getItem("repos"));
    this.repos = this.localRepos.slice(this.initialRepo,this.finalRepo);
  }
}
