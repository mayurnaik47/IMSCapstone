import {Component, OnDestroy, OnInit} from '@angular/core';
import {Evaluators, IdeaCriteria, IdeaEvaluation, IdeaFeedback, IdeaModel} from '../models/project.model';
import {ProjectService} from '../services/project.service';
import {ActivatedRoute, Params} from '@angular/router';
import {saveAs} from 'file-saver';
import {FileserviceService} from '../services/fileservice.service';

@Component({
  selector: 'app-evaluationpanel2',
  templateUrl: './evaluationpanel2.component.html',
  styleUrls: ['./evaluationpanel2.component.css']
})
export class Evaluationpanel2Component implements OnInit, OnDestroy {

  ideaDetails: IdeaModel;
  ideaId: number;
  value = 0;
  criteria: IdeaCriteria[];
  ratings: number[];
  feedback: string = null;
  feedbackObject: IdeaFeedback;
  feedbackObjects: IdeaFeedback[] = [];
  commentExists = false;
  timeout  = null;
  average = 0.0;
  alertSave = false;
  ideaRatings: IdeaEvaluation;
  statusID: number;
  evaluators: Evaluators[];
  evalUserID: number;

  evalStatusIcon = [];

  isReadyForDetailedProposal = true;    // Flag to check if all evaluators have completed the evaluation;

  gaugeType = 'full';
  gaugeValue = this.average;
  gaugeLabel = 'Average Score';
  gaugeAppendText = '/5';

  // Score submission flag
  isSubmit = false;


  constructor(private projService: ProjectService, private route: ActivatedRoute, private _fileService: FileserviceService) {
  }

  ngOnInit() {
    // tslint:disable-next-line:radix
    this.evalUserID = parseInt(sessionStorage.getItem('usersID'));
    this.ideaRatings = new IdeaEvaluation();
    this.route.params.subscribe(
      (param: Params) => {
        this.ideaId = param.id;
      }
    );

    this.getCommentsByIdeaId(this.ideaId);
    this.timeout = setInterval(() => {
      this.getCommentsByIdeaId(this.ideaId);
    }, 2000);
    this.getIdeasByIdeaId(this.ideaId);
    this.getIdeasByPhase(2);
  }

  ngOnDestroy() {
    clearInterval(this.timeout);
  }

  getIdeasByIdeaId(ideaId) {

    this.projService.getIdeaRatingsByIdeaID(ideaId, this.evalUserID).subscribe(
      ideaEvalDetails => {
        if (ideaEvalDetails[0] && ideaEvalDetails[0].evalStatus === 'SUBMITTED') { this.isSubmit = true; }
        else if (ideaEvalDetails[0] && ideaEvalDetails[0].evalStatus === 'NOT SUBMITTED') { this.isSubmit = false; }
        else if (!ideaEvalDetails[0]) { this.isSubmit = null; }
      }
    );

    this.projService.getIdeasWithIdeaId(ideaId).subscribe(
      ideaDetails => {
        this.ideaDetails = ideaDetails;
        this.statusID = this.ideaDetails[0].statusID;
      }, () => {} , () => {
        this.checkIfEvaluatorsCompleteEvaluation(ideaId, this.ideaDetails[0].typeID);

        if (this.ideaDetails[0].statusID === 9) {
          this.projService.getIdeaRatingsByIdeaID(ideaId, this.evalUserID).subscribe(
            ratings => {
              this.ratings = ratings.map(function(val) {
                return val.rating;
              });
              this.calculateAverage();
            }
          );
        }
      });
  }

  getIdeasByPhase(phase) {

    this.projService.getIdeaCriteriasByPhase(phase).subscribe(
      ideaCriterias => {
        this.criteria = ideaCriterias;
        this.ratings = new Array(this.criteria.length).fill(0);
      }, () => {} , () => {

      });
  }

  checkIfEvaluatorsCompleteEvaluation(ideaID, typeID) {

    const self = this;

    this.projService.getEvaluatorsByTypeID(typeID).subscribe(
      evaluators => {
        this.evaluators = evaluators;

      }, () => {},
      () => {
        this.evaluators.forEach(function(val, index) {
          self.projService.getIdeaRatingsByIdeaID(ideaID, val.usersID).subscribe(
            evaluationStatus => {
              if (evaluationStatus[0] && evaluationStatus[0].evalStatus === 'SUBMITTED') {
                self.evalStatusIcon[index] = 'accent';
              } else {
                self.evalStatusIcon[index] = 'primary';
                self.isReadyForDetailedProposal = false;
              }
            }
          );
        });
      });
    setTimeout(function() {
      if (self.isReadyForDetailedProposal === true) {
        if (self.ideaDetails[0].statusID === 9 || self.ideaDetails[0].statusID === 3) {
          alert('All Evaluators Submiited data successfully');
          self.ideaDetails[0].statusID = 8;
          self.ideaDetails[0].statusName = 'SUBMITTED FOR RAKING PH2';
          self.projService.updateIdeaStatus(self.ideaDetails[0]).subscribe();
        }
      }
    }, 800);
  }

  getCommentsByIdeaId(ideaId) {

    this.projService.getIdeaCommentsByIdeaID(ideaId).subscribe(
      ideaComments => {
        this.feedbackObjects = ideaComments;
      }
    );
  }

  saveScore(isUpdate) {
    this.isSubmit = false;

    // Updating Idea Status to Processing
    if (this.ideaDetails[0].statusID === 3 || this.ideaDetails[0].statusID === 9) {
      this.ideaDetails[0].statusName = 'PROCESSING PH2';
      this.ideaDetails[0].statusID = 9;
      this.statusID = 9;
      this.projService.updateIdeaStatus(this.ideaDetails[0]).subscribe();
    }
    // tslint:disable-next-line:only-arrow-functions
    const self = this;
    // todo: need to make this generic
    this.ideaRatings.usersID = this.evalUserID;
    this.ideaRatings.ideaID = this.ideaDetails[0].ideaID;
    this.ideaRatings.evalStatus = 'NOT SUBMITTED';

    this.criteria.forEach(function(val, index) {
      self.ideaRatings.critID = val.critID;
      self.ideaRatings.rating = self.ratings[index];
      if (isUpdate === false) { self.projService.addNewRatingsByUserIdeaID(self.ideaRatings).subscribe();  }
      else if (isUpdate === true) { self.projService.updateRatingsByUserIdeaID(self.ideaRatings).subscribe(); }
    });


    this.alertSave = true;
    this.calculateAverage();
  }

  calculateAverage() {
    const total = this.ratings.reduce(function(sum, cur, index, ratings) {
      return sum + cur;
    }, 0);

    this.average = total / this.ratings.length;
    this.gaugeValue = this.average;

  }

  submitEvaluation() {

    // tslint:disable-next-line:only-arrow-functions
    const self = this;
    let directSubmit = false;

    // If evaluator directly submit the ratings without updating the results.
    if (this.isSubmit === null) {
      directSubmit = true;
      // Updating Idea Status to Processing
      if (this.ideaDetails[0].statusID === 3 || this.ideaDetails[0].statusID === 9) {
        this.ideaDetails[0].statusName = 'PROCESSING PH2';
        this.ideaDetails[0].statusID = 9;
        this.statusID = 9;
        this.projService.updateIdeaStatus(this.ideaDetails[0]).subscribe();
      }
    }

    this.isSubmit = true;



    // todo: need to make this generic
    this.ideaRatings.usersID = this.evalUserID;
    this.ideaRatings.ideaID = this.ideaDetails[0].ideaID;
    this.ideaRatings.evalStatus = 'SUBMITTED';


    this.criteria.forEach(function(val, index) {
      self.ideaRatings.critID = val.critID;
      self.ideaRatings.rating = self.ratings[index];
      if (directSubmit === true) { self.projService.addNewRatingsByUserIdeaID(self.ideaRatings).subscribe(); }
      else { self.projService.updateIdeaEvalStatusByUserIdeaID(self.ideaRatings).subscribe(); }
    });

    this.checkIfEvaluatorsCompleteEvaluation(this.ideaDetails[0].ideaID, this.ideaDetails[0].typeID);

    this.calculateAverage();

  }

  addComment() {
    this.commentExists = true;
    this.feedbackObject =  new IdeaFeedback();

    // todo: need to make this generic
    this.feedbackObject.usersID = this.evalUserID;
    this.feedbackObject.ideaID = this.ideaDetails[0].ideaID;
    this.feedbackObject.message = this.feedback;

    this.projService.addNewComment(this.feedbackObject).subscribe();

    this.feedbackObjects.push(this.feedbackObject);
    this.feedback = null;

  }

  downloadFile(){
    var filename = this.ideaDetails[0].docName;

    this._fileService.downloadFile(filename)
      .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
      );
  }

}
