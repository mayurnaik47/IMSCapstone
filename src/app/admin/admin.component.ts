import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {IdeaType, Phase} from '../models/project.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  phaseDetails: Phase;
  resetPhaseVar: Phase;
  firstName: string;
  lastName: string;
  actionSTart = 'START';
  phaseNumber = 1;

  newIdeatype: IdeaType;
  delIdeatype: IdeaType;
  validTypeid= true;

  ideaTypes: IdeaType[];

  // spinner
  color = 'primary';
  mode = 'indeterminate';
  value = 20;

  constructor(private projService: ProjectService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.newIdeatype = new IdeaType();
    this.delIdeatype = new IdeaType();
    this.firstName = sessionStorage.getItem('fName');
    this.lastName = sessionStorage.getItem('lName');
    this.resetPhaseVar = new Phase();
    this.getPhaseDetails();
    this.getAllIdeaTypes();
  }

  getAllIdeaTypes() {
    this.projService.getAllIdeaTypes().subscribe(
      ideaTypes => {
        this.ideaTypes = ideaTypes;
      }
    );
  }

  getPhaseDetails() {
    // save phase details in session storage
    this.projService.getPhaseDetails().subscribe(
      phase => {
        this.phaseDetails = phase;
        sessionStorage.setItem('phaseID', this.phaseDetails[0].phase.toString());
        sessionStorage.setItem('phaseAction', this.phaseDetails[0].action);
      }
    );
  }

  doEvaluateAction() {
    const self = this;
    if (this.phaseDetails[0].phase == 1 && this.phaseDetails[0].action == 'TO BE STARTED') {
      this.resetPhaseVar.phase = 1;
      this.resetPhaseVar.action = 'IN PROGRESS';
      this.actionSTart = 'STOP';
      this.phaseNumber = 1;
    } else if (this.phaseDetails[0].phase == 1 && this.phaseDetails[0].action == 'IN PROGRESS') {
      this.actionSTart = 'START';
      this.resetPhaseVar.phase = 1;
      this.resetPhaseVar.action = 'STOPPED';
      this.phaseNumber = 2;
    } else if (this.phaseDetails[0].phase == 1 && this.phaseDetails[0].action == 'STOPPED') {
      this.resetPhaseVar.phase = 2;
      this.resetPhaseVar.action = 'IN PROGRESS';
      this.actionSTart = 'STOP';
      this.phaseNumber = 2;
      this.projService.delEvalScoresForph2().subscribe();
    } else if (this.phaseDetails[0].phase == 2 && this.phaseDetails[0].action == 'IN PROGRESS') {
      this.resetPhaseVar.phase = 2;
      this.resetPhaseVar.action = 'STOPPED';
      this.actionSTart = 'PUBLISH';
      this.phaseNumber = 2;
    } else if (this.phaseDetails[0].phase == 2 && this.phaseDetails[0].action == 'STOPPED') {
      this.actionSTart = 'START';
      alert('Final Results are Published');
      this.resetPhase();
    }

    this.projService.updatePhaseDetails(this.resetPhaseVar).subscribe();





    setTimeout(function() {
      self.getPhaseDetails();
    }, 600);

  }

  resetPhase() {
    const self = this;
    this.resetPhaseVar.phase = 1;
    this.phaseNumber = 1;
    this.resetPhaseVar.action = 'TO BE STARTED';
    this.projService.updatePhaseDetails(this.resetPhaseVar).subscribe();
    setTimeout(function() {
     self.getPhaseDetails();
   }, 600);

  }

  addIdeaType() {
    this.projService.addNewIdeaType(this.newIdeatype).subscribe(
      () => {},
      () => {},
      () => {
        this.getAllIdeaTypes();
      }
    );
  }

  deleteType() {
    if (this.delIdeatype.typeID === -1) { this.validTypeid = false; }

    if (this.validTypeid) {
      this.projService.delIdeaType(this.delIdeatype).subscribe(
        () => {},
        () => {},
        () => {
          this.getAllIdeaTypes();
        }
      );
    }
  }

}
