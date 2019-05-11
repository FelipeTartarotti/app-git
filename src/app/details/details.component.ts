import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';
import { Router } from '@angular/router';

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

  constructor(private github: GithubService,public router: Router) { }
  
  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem("username"));
   
    this.getUserDetail();
  }

  async getUserDetail(){

    await this.github.getUserDetail(this.username)
    .then((result: any) => {
      this.user = result;
      console.log(this.user);
    })
    .catch((error: any) => {
      console.log(error);
    });
    this.isDataAvailable = true;
  }

  async getRepo(){
    console.log(this.username);

    await this.github.getUserRepo(this.username)
    .then((result: any) => {
      console.log(result.length);
      window.localStorage.setItem("repos", JSON.stringify(result));
      this.showResult();  
    })
    .catch((error: any) => {
      console.log(error);
    });

    this.isRepoAvailable = true;

  }

  showResult(){

    this.localRepos = JSON.parse(localStorage.getItem("repos"));
    this.repos = this.localRepos.slice(this.initialRepo,this.finalRepo);
    this.isDataAvailable = true;

  }

  nextPage(){
  
    this.localRepos = JSON.parse(localStorage.getItem("users"));

    console.log(this.localRepos[0].name);

    if(this.finalRepo>this.localRepos.length){
      this.initialRepo = this.initialRepo - this.numberReposByPage;
      this.finalRepo = this.finalRepo - this.numberReposByPage;
    }

    this.initialRepo = this.initialRepo + this.numberReposByPage;
    this.finalRepo = this.finalRepo + this.numberReposByPage;

    this.repos = this.localRepos.slice(this.initialRepo,this.finalRepo);
    console.log(this.repos[0].name);
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

    this.localRepos = JSON.parse(localStorage.getItem("users"));
    this.repos = this.localRepos.slice(this.initialRepo,this.finalRepo);
  }


}
