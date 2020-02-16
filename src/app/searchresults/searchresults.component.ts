import {Component, OnInit, ViewChild} from '@angular/core';
import {IdeaModel} from '../models/project.model';
import {ActivatedRoute, Params} from '@angular/router';
import {ProjectService} from '../services/project.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Location} from '@angular/common';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {

  searchQuery: string;
  showall: string;
  ideas: IdeaModel[];
  lastName: string;
  displayedColumns: string[] = ['ideaID', 'title', 'typeID', 'description'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private dataSource: MatTableDataSource<IdeaModel>;

  constructor(private projService: ProjectService, private route: ActivatedRoute, private location: Location) {

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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goBack() {
    this.location.back();
  }

  processQuery() {
    const self = this;
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
        },
        () => {},
        () => {
          this.dataSource = new MatTableDataSource<IdeaModel>(self.ideas);
          this.dataSource.paginator = self.paginator;
        }
      );

    } else {

      this.projService.getAllIdeasBySearchQuery(this.searchQuery).subscribe(
        ideas => {
          this.ideas = ideas;

        },
        error => console.log('Error: ' + error),
        () => {
          this.dataSource = new MatTableDataSource<IdeaModel>(self.ideas);
          this.dataSource.paginator = self.paginator;
        }
      );

    }

  }
  }

