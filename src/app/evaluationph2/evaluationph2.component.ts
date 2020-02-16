import {Component, OnInit, ViewChild} from '@angular/core';
import {Evaluators, IdeaModel, Phase} from '../models/project.model';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ProjectService} from '../services/project.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-evaluationph2',
  templateUrl: './evaluationph2.component.html',
  styleUrls: ['./evaluationph2.component.css']
})
export class Evaluationph2Component implements OnInit {

  ideas: IdeaModel[];
  evaluator: Evaluators;
  evalUserID: number;
  firstName: string;
  lastName: string;
  phase: Phase;
  userType: number;
  displayedColumns: string[] = ['ideaID', 'title', 'userName', 'statusID', 'Action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private dataSource: MatTableDataSource<IdeaModel>;

  constructor(private projService: ProjectService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.firstName = sessionStorage.getItem('fName');
    this.lastName = sessionStorage.getItem('lName');
    this.phase = new Phase();
    // tslint:disable-next-line:radix
    this.phase.phase = parseInt(sessionStorage.getItem('phaseID'));
    this.phase.action = sessionStorage.getItem('phaseAction');
    // tslint:disable-next-line:radix
    this.evalUserID = parseInt(sessionStorage.getItem('usersID'));
    this.userType = parseInt(sessionStorage.getItem('usersType'));
    this.initEvalList();
  }

  initEvalList() {

    const self = this;

    this.projService.getEvaluatorsTypeID(this.evalUserID).subscribe(
      evaluator => {
        this.evaluator = evaluator;
        console.log(this.evaluator);
      }, () => { }, () => {
        this.projService.getIdeasWithTypeId(this.evaluator[0].typeID, this.evaluator[0].usersID).subscribe(
          ideas => {
            this.ideas = ideas;
            console.log(this.ideas);
            this.ideas.sort((a, b) => a.ideaID - b.ideaID);
            this.ideas = this.ideas.filter(function(val) {
              return (val.statusID === 3 || val.statusID === 9 || val.statusID === 8);
            });

            this.dataSource = new MatTableDataSource<IdeaModel>(this.ideas);
            this.dataSource.paginator = self.paginator;
          }
        );
      }
    );
  }
}
