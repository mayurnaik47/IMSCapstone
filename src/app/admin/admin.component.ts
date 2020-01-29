import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {Phase} from '../models/project.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  phaseDetails: Phase;
  resetPhaseVar: Phase;

  // spinner
  color = 'primary';
  mode = 'indeterminate';
  value = 20;

  constructor(private projService: ProjectService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.resetPhaseVar = new Phase();
    this.getPhaseDetails();
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
    } else if (this.phaseDetails[0].phase == 1 && this.phaseDetails[0].action == 'IN PROGRESS') {
      this.resetPhaseVar.phase = 1;
      this.resetPhaseVar.action = 'STOPPED';
    } else if (this.phaseDetails[0].phase == 1 && this.phaseDetails[0].action == 'STOPPED') {
      this.resetPhaseVar.phase = 2;
      this.resetPhaseVar.action = 'IN PROGRESS';
      this.projService.delEvalScoresForph2().subscribe();
    } else if (this.phaseDetails[0].phase == 2 && this.phaseDetails[0].action == 'IN PROGRESS') {
      this.resetPhaseVar.phase = 2;
      this.resetPhaseVar.action = 'STOPPED';
    } else if (this.phaseDetails[0].phase == 2 && this.phaseDetails[0].action == 'STOPPED') {
      alert('Final Results Available');
    }

    this.projService.updatePhaseDetails(this.resetPhaseVar).subscribe();





    setTimeout(function() {
      self.getPhaseDetails();
    }, 600);

  }

  resetPhase() {
    const self = this;
    this.resetPhaseVar.phase = 1;
    this.resetPhaseVar.action = 'TO BE STARTED';
    this.projService.updatePhaseDetails(this.resetPhaseVar).subscribe();
    setTimeout(function() {
     self.getPhaseDetails();
   }, 600);

  }

  getAllSelectedIdeasPhase1() {





  }


}
