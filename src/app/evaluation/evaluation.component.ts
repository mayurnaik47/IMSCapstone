import {Component, OnInit, ViewChild} from '@angular/core';
import {Evaluators, IdeaEvaluation, IdeaModel} from '../models/project.model';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ProjectService} from '../services/project.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  ideas: IdeaModel[];
  evaluator: Evaluators;
  displayedColumns: string[] = ['ideaID', 'title', 'userName', 'statusID', 'Action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private dataSource: MatTableDataSource<IdeaModel>;

  constructor(private projService: ProjectService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.initEvalList();
  }

  initEvalList() {

    const self = this;

    this.projService.getEvaluatorsTypeID(80).subscribe(
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
