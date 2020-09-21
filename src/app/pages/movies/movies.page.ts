import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchType, MovieService } from 'src/app/services/movie.service';
import { AuthService } from "../../services/auth.service";

import { LoginPage } from "../../login/login.page"

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  results: Observable<any>;
  searchTherm = '';
  type: SearchType = SearchType.all;

  public name: string;
  
  constructor(private movieService: MovieService, public AuthService: AuthService, public page: LoginPage) { }

  ngOnInit() {

      
  }

  searchChanged(){
    this.results = this.movieService.searchData(this.searchTherm, this.type);
    //console.log('My result : ', this.results);
    //this.results.subscribe(res => {
    //    
    //})
  }

  onLogout(){
    this.AuthService.logout();
  }

}
