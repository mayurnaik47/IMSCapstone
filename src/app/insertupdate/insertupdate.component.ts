import { Component, OnInit } from '@angular/core';
import {IdeaModel, IdeaType, MaxID} from '../models/project.model';
import {ProjectService} from '../services/project.service';
import {max} from 'rxjs/operators';



@Component({
  selector: 'app-insertupdate',
  templateUrl: './insertupdate.component.html',
  styleUrls: ['./insertupdate.component.css']
})
export class InsertupdateComponent implements OnInit {

  newIdea: IdeaModel;
  isTitle = false;
  isDesc = false;
  isEsttime = false;
  isType = false;
  maxId: number;
  ideaTypes: IdeaType[];


  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.newIdea = new IdeaModel();
    this.newIdea.typeID = -1;

    this.projectService.getAllIdeaTypes().subscribe(
      ideaTypes => {
        this.ideaTypes = ideaTypes;
      }

    );

  }

  addNewIdea() {

    let self = this;

      if(!this.newIdea.title) this.isTitle = true;
      else { this.isTitle = false; }

      if(!this.newIdea.description) this.isDesc = true;
      else this.isDesc = false;

      if(!this.newIdea.typeID || this.newIdea.typeID === -1) this.isType = true;
      else { this.isType = false; }

      if(!this.newIdea.estTime) this.isEsttime = true;
      else this.isEsttime = false;

      if (!this.isEsttime && !this.isType && !this.isDesc && !this.isTitle) {

        // tslint:disable-next-line:radix
        this.newIdea.usersID = parseInt(sessionStorage.getItem('usersID'));
        this.newIdea.statusID = 1;

        this.projectService.addNewUserIdea(this.newIdea).subscribe(

          newIdea => {
            this.newIdea = newIdea;
          },
          error => {},
          () => {

            this.projectService.getMaxid().subscribe(
              maxId => {
                this.maxId = maxId.maxId;
              }

            );
          }

        );

        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() {
          alert("Idea has been inserted successfully..Node the idea ID"+self.maxId);
        },500);



      }

  }

}
