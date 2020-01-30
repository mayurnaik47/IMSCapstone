import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProjectService} from '../services/project.service';
import {IdeaModel} from '../models/project.model';
import {MatTableDataSource} from '@angular/material';

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
  alertIdeas: IdeaModel[];
  invalidQuery = false;
  noRecords = false;
  firstName: string;
  lastName: string;
  userID: number;
  ideaSelected = false;

  batchVisible = false;
  alertCount = 0;


  constructor(private projService: ProjectService, private route: Router) { }

  ngOnInit() {
    this.firstName = sessionStorage.getItem('fName');
    this.lastName = sessionStorage.getItem('lName');
    this.userID = parseInt(sessionStorage.getItem('usersID'));

    // save phase details in session storage
    this.projService.getPhaseDetails().subscribe(
      phase => {
        sessionStorage.setItem('phaseID', phase[0].phase.toString());
        sessionStorage.setItem('phaseAction', phase[0].action);
      }
    );
    this.countAlertNotification();
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

  countAlertNotification() {

    const self = this;

    this.projService.getIdeasByUsers(this.userID).subscribe(
      ideas => {
        this.alertIdeas = ideas;
      },
      () => {
        console.log('Cant fetch getIdeasByUsers');
      },
      () => {
      this.alertIdeas =  this.alertIdeas.filter(function(val) {
          if (val.statusID === 9) {
            self.alertCount ++;
            return true;
          }
          if (val.statusID === 5) {
          self.alertCount ++;
          self.ideaSelected =  true;
          return true;
        }
        });

      if (self.alertCount !== 0) { self.batchVisible =  true; }
      }
    );
  }

  insertNewidea() {

    this.route.navigate(['/insertupdateidea']);
  }

}
