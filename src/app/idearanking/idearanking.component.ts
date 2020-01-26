import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Evaluators, IdeaEvaluation, IdeaModel} from '../models/project.model';
import {ProjectService} from '../services/project.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-idearanking',
  templateUrl: './idearanking.component.html',
  styleUrls: ['./idearanking.component.css']
})
export class IdearankingComponent implements OnInit {

  displayedColumns: string[] = ['ideaID', 'title', 'userName', 'Avg Score', 'Rank'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private dataSource: MatTableDataSource<IdeaModel>;


  ideasSubmitted: IdeaModel[];
  ideasWithScore: IdeaModel[];
  rank = 0;

  constructor(private projService: ProjectService, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.getDistinctEvaluationIdeas();

  }

  getDistinctEvaluationIdeas() {
    const self = this;

    this.projService.getIdeasWithStatusId(7).subscribe(
      ideas => {
        this.ideasSubmitted = ideas;
      },
      () => {},
      () => {
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
    );







    // this.projService.getDistinctSubmittedIdeas().subscribe(
    //   evalIdeas => {
    //     this.distinctEvalideas = evalIdeas;
    //   },
    //   () => {},
    //   () => {
    //    //
    //    // this.distinctEvalideas.forEach(function(val, index) {
    //    //
    //    //    self.projService.getEvaluatorsByTypeID(val.typeID).subscribe(
    //    //     evaluators => {
    //    //       self.evaluators = evaluators;
    //    //
    //    //     }, () => {},
    //    //     () => {
    //    //       self.isReadyForDetailedProposal = true;
    //    //       self.evaluators.forEach(function(value, index) {
    //    //         self.projService.getIdeaRatingsByIdeaID(val.ideaID, value.usersID).subscribe(
    //    //           evaluationStatus => {
    //    //             if (evaluationStatus[0] && evaluationStatus[0].evalStatus === 'SUBMITTED') {
    //    //             } else {
    //    //               self.isReadyForDetailedProposal = false;
    //    //             }
    //    //           }
    //    //         );
    //    //       });
    //    //
    //    //
    //    //         if (self.isReadyForDetailedProposal === true) {
    //    //           console.log('suceessfull' + val.ideaID);
    //    //           self.ideaIds.push(val.ideaID);
    //    //         }
    //    //     });
    //    // });
    //    //
    //    //  setTimeout(function() {
    //    //    console.log("success" + self.ideaIds);
    //    //
    //    //  }, 1000);
    //   }
    // );
  }

}
