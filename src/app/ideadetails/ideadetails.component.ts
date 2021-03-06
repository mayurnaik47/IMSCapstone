import {Component, DoCheck, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ProjectService} from '../services/project.service';
import {IdeaFeedback, IdeaModel, IdeaType} from '../models/project.model';
import {Location} from '@angular/common';
import {FileUploader} from 'ng2-file-upload';

const uri = 'http://localhost:3000/file/upload';

@Component({
  selector: 'app-ideadetails',
  templateUrl: './ideadetails.component.html',
  styleUrls: ['./ideadetails.component.css']
})
export class IdeadetailsComponent implements OnInit {

  ideaDetails: IdeaModel;
  ideaId: number;
  ideaTypes: IdeaType[];
  isType = false;
  validData = true;
  feedbacks: IdeaFeedback[];
  uploader: FileUploader = new FileUploader({url: uri});

  attachmentList: any = [];


  constructor(private projService: ProjectService, private route: ActivatedRoute, private location: Location) {

    this.uploader.onCompleteItem = (item: any, response: any , status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response));
      this.ideaDetails[0].docName = this.attachmentList[0].uploadname;
    }
  }

  ngOnInit() {

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }

    this.projService.getAllIdeaTypes().subscribe(
      ideaTypes => {
        this.ideaTypes = ideaTypes;
      }

    );

    this.route.params.subscribe(
      (param: Params) => {
        this.ideaId = param.id;
      }
    );

    this.getIdeaByIdeaId(this.ideaId);
    this.getCommentByIdeaId(this.ideaId);

  }

  getCommentByIdeaId(ideaId) {

    this.projService.getIdeaCommentsByIdeaID(ideaId).subscribe(
      ideaComments => {
        this.feedbacks = ideaComments;
        console.log(this.feedbacks);
      }
    );
  }


  getIdeaByIdeaId(ideaId) {

     this.projService.getIdeasWithIdeaId(ideaId).subscribe(
       ideaDetails => {
         this.ideaDetails = ideaDetails;
         console.log(this.ideaDetails);

       }, () => {} , () => {

       });

   }

  goBack() {
    this.location.back();
  }

  updateIdea() {
    const self = this;
    this.validData = true;
    if (this.ideaDetails[0].typeID === -1) {
      this.isType = true;
      this.validData = false;
    }
    if (this.validData) {
     this.projService.updateIdea(this.ideaDetails[0]).subscribe(
       () => {},
       () => {},
       () => {
         alert('Record updated successfully');
         self.getIdeaByIdeaId(self.ideaId);
       }
     );
    }
  }
}
