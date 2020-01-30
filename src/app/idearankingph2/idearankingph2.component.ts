import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {IdeaModel, Phase} from '../models/project.model';
import {ProjectService} from '../services/project.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-idearankingph2',
  templateUrl: './idearankingph2.component.html',
  styleUrls: ['./idearankingph2.component.css']
})
export class Idearankingph2Component implements OnInit {

  displayedColumns: string[] = ['ideaID', 'title', 'userName', 'Avg Score', 'Rank'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private dataSource: MatTableDataSource<IdeaModel>;


  ideasSubmitted: IdeaModel[];
  ideasWithScore: IdeaModel[];
  ideasSelected: IdeaModel[];
  ideasRejected: IdeaModel[];
  firstName: string;
  lastName: string;

  ideasSubmitted1: IdeaModel[];
  ideasSubmitted2: IdeaModel[];

  phase: Phase;
  rank = 0;

  constructor(private projService: ProjectService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.firstName = sessionStorage.getItem('fName');
    this.lastName = sessionStorage.getItem('lName');
    this.phase = new Phase();
    // tslint:disable-next-line:radix
    this.phase.phase = parseInt(sessionStorage.getItem('phaseID'));
    this.phase.action = sessionStorage.getItem('phaseAction');

    this.getDistinctEvaluationIdeas();

  }

  getDistinctEvaluationIdeas() {
    const self = this;

    this.projService.getIdeasWithStatusId(8).subscribe(
      ideas => {
        this.ideasSubmitted1 = ideas;
        console.log(this.ideasSubmitted1);
      },
      () => {},
      () => {
        if (this.ideasSubmitted1.length !== 0) {
          this.ideasSubmitted = this.ideasSubmitted1;
          this.getAvgScore();
        }
      }
    );

    this.projService.getIdeasWithStatusId(5).subscribe(
      ideas => {
        this.ideasSubmitted2 = ideas;
      },
      () => {},
      () => {
        if (this.ideasSubmitted2.length !== 0) {
          this.ideasSubmitted = this.ideasSubmitted2;
          this.getAvgScoreWithStatusNine();
        }
      }
    );
  }

  getAvgScore() {
    const self = this;

    this.projService.getAvgSubmittedIdeasForRanking(this.ideasSubmitted).subscribe(
      ideaScore => {
        this.ideasWithScore = ideaScore;

      },
      () => {},
      () => {
        let map = new Map();

        this.ideasWithScore.forEach(function(val) {
          const key = val.ideaID.toString();
          map.set(key, val.score);
        });


        this.ideasSubmitted.map(function(val) {
          val.score = map.get(val.ideaID.toString());
        });

        this.ideasSubmitted.sort(( a , b) => b.score - a.score);


        this.ideasSubmitted.map(function(val) {
          self.rank++;
          val.rank =  self.rank;
        });



        this.ideasSelected = this.ideasSubmitted.slice(0 , 3);

        this.ideasRejected =  this.ideasSubmitted.slice(3, this.ideasSubmitted.length);

        this.dataSource = new MatTableDataSource<IdeaModel>(this.ideasSelected);
        this.dataSource.paginator = self.paginator;

        this.ideasSelected.forEach(function(val) {
          val.statusID = 5;
          self.projService.updateIdeaStatus(val).subscribe();
        });

        if (this.ideasRejected) {
          this.ideasRejected.forEach(function(val) {
            val.statusID = 6;
            self.projService.updateIdeaStatus(val).subscribe();
          });
        }
      }
    );
  }

  getAvgScoreWithStatusNine() {
    const self = this;

    this.projService.getAvgSubmittedIdeasForRanking(this.ideasSubmitted).subscribe(
      ideaScore => {
        this.ideasWithScore = ideaScore;

      },
      () => {},
      () => {
        let map = new Map();

        this.ideasWithScore.forEach(function(val) {
          const key = val.ideaID.toString();
          map.set(key, val.score);
        });


        this.ideasSubmitted.map(function(val) {
          val.score = map.get(val.ideaID.toString());
        });

        this.ideasSubmitted.sort(( a , b) => b.score - a.score);


        this.ideasSubmitted.map(function(val) {
          self.rank++;
          val.rank =  self.rank;
        });

        this.dataSource = new MatTableDataSource<IdeaModel>(this.ideasSubmitted);
        this.dataSource.paginator = self.paginator;
      }
    );
  }


}
