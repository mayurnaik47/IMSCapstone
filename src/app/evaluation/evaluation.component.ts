import {Component, OnInit, ViewChild} from '@angular/core';
import {Evaluators, IdeaEvaluation, IdeaModel, Phase} from '../models/project.model';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ProjectService} from '../services/project.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  phase: Phase;
  ideas: IdeaModel[];
  evaluator: Evaluators;
  evalUserID: number;
  firstName: string;
  lastName: string;
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
            this.dataSource = new MatTableDataSource<IdeaModel>(this.ideas);
            this.dataSource.paginator = self.paginator;
          }
        );
      }
    );
  }
}
