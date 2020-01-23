import {Component, OnInit, ViewChild} from '@angular/core';
import {IdeaModel, IdeaStatus, IdeaType} from '../models/project.model';
import {ProjectService} from '../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-myideas',
  templateUrl: './myideas.component.html',
  styleUrls: ['./myideas.component.css']
})
export class MyideasComponent implements OnInit {

  ideas: IdeaModel[];
  displayedColumns: string[] = ['ideaID', 'title', 'typeID', 'statusID'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private dataSource: MatTableDataSource<IdeaModel>;

  constructor(private projService: ProjectService, private route: ActivatedRoute) {

  }


  ngOnInit() {

    this.initIdeaList();

  }


  initIdeaList() {

    const self = this;

    this.projService.getIdeasByUsers(51).subscribe(
      ideas => {
        this.ideas = ideas;
        console.log(this.ideas);
      },
      () => {
        console.log('Cant fetch getIdeasByUsers');
      },
      () => {
        this.dataSource = new MatTableDataSource<IdeaModel>(self.ideas);
        this.dataSource.paginator = self.paginator;
      }
    );

  }

}
