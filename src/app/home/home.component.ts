import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProjectService} from '../services/project.service';
import {IdeaModel} from '../models/project.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchQuery: string;
  searchClicked = false;
  keyWordExists = false;
  ideas: IdeaModel[];
  invalidQuery = false;
  noRecords = false;


  constructor(private projService: ProjectService, private route: Router) { }

  ngOnInit() {
  }

  processSearchQuery(query, showAll) {

    const see = this;
    this.keyWordExists = false;
    this.invalidQuery = false;
    this.noRecords = false;
    if (!query && showAll === false) {
      this.keyWordExists = true;
      return;
    }

    this.searchQuery = query;

    // regex validation and sanitization of query
    // Accept only Alphanumeric and spaces

    if (this.searchQuery.search(/^[a-z\.\d\-_\s]+$/i) === -1 && showAll === false ) {
      this.invalidQuery = true;
      return;
    }

    const searchArray = this.searchQuery.split(' ');
    this.searchQuery = searchArray.join('|');

    if (showAll === true) {
      see.searchClicked = true;
     // this.searchNavStatus.emit(true);
      this.route.navigate(['/search', query], { queryParams: {showAll}});

    }
    else {
      this.projService.getAllIdeasBySearchQuery(this.searchQuery).subscribe(
        ideas => {
          this.ideas = ideas;
        },
        error => console.log('Error: ' + error),
        () => {
          if (this.ideas.length === 0) {
          console.log(this.searchQuery);
            see.searchClicked = false;
            this.noRecords = true;
          }
          else {
           // this.searchNavStatus.emit(true);
            this.route.navigate(['/search', query], { queryParams: {showAll}}); }

        }
      );

    }
  }

  insertNewidea() {

    this.route.navigate(['/insertupdateidea']);
  }

}
