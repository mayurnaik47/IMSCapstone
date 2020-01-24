import { Component, OnInit } from '@angular/core';
import {IdeaModel} from '../models/project.model';
import {ActivatedRoute, Params} from '@angular/router';
import {ProjectService} from '../services/project.service';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {

  searchQuery: string;
  showall: string;
  ideas: IdeaModel[];

  constructor(private projService: ProjectService, private route: ActivatedRoute) {

  }


  ngOnInit() {

    this.route.queryParams.subscribe(
      queryParam => {
        this.showall = queryParam.showAll;
      }
    );


    this.route.params.subscribe(
      (param: Params) => {

        this.searchQuery = param.query;
        this.processQuery();
      }
    );

  }


  processQuery() {
    if (!this.searchQuery && this.showall === 'false') {

      return;
    }

    if (this.searchQuery.search(/^[a-z\.\d\-_\s]+$/i) === -1 && this.showall === 'false') {

      return;
    }

    const searchArray = this.searchQuery.split(' ');
    this.searchQuery = searchArray.join('|');

    if (this.showall === 'true') {

      this.projService.getAllIdeasId().subscribe(
        ideas => {
          this.ideas = ideas;
        }
      );

    } else {

      this.projService.getAllIdeasBySearchQuery(this.searchQuery).subscribe(
        ideas => {
          this.ideas = ideas;

        },
        error => console.log('Error: ' + error),
        () => {

        }
      );

    }

  }
  }

