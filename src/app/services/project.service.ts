import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
  Evaluators,
  IdeaCriteria,
  IdeaEvaluation,
  IdeaFeedback,
  IdeaModel,
  IdeaStatus,
  IdeaType,
  MaxID, Phase,
  UserModel
} from '../models/project.model';
import {ActivatedRoute, Router} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})


export class ProjectService {


  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  getUserDetailsByUsername(name: string): Observable<UserModel> {
    return this.http.get<UserModel>('http://localhost:3000/routeUsers/getUserByUsername/' + name);
  }

  getAllIdeasId(): Observable<IdeaModel[]> {
    return this.http.get<IdeaModel[]>('http://localhost:3000/routeIdea/');
  }

  getAllIdeasBySearchQuery(query: string): Observable<IdeaModel[]> {
    return this.http.get<IdeaModel[]>('http://localhost:3000/routeIdea/searchQuery/1?searchQuery=' + query);
  }

  getIdeasByUsers(userId: number): Observable<IdeaModel[]> {
    return this.http.get<IdeaModel[]>('http://localhost:3000/routeIdea/' + userId + '?idType=usersID');
  }

  getIdeasWithIdeaId(ideaId: number): Observable<IdeaModel> {
    return this.http.get<IdeaModel>('http://localhost:3000/routeIdea/' + ideaId + '?idType=ideaID');
  }

  getPhaseDetails(): Observable<Phase> {
    return this.http.get<Phase>('http://localhost:3000/routePublic/phase/2');
  }

  updatePhaseDetails(phase: Phase): Observable<IdeaEvaluation> {
    console.log(phase);
    return this.http.put<IdeaEvaluation>('http://localhost:3000/routePublic/phase/' + phase.phase + '?action=' + phase.action , phase, httpOptions);
  }

  getIdeasWithStatusId(statusId: number): Observable<IdeaModel[]> {
    return this.http.get<IdeaModel[]>('http://localhost:3000/routeIdea/' + statusId + '?idType=statusID');
  }

  getIdeasWithTypeId(typeID: number, evalId: number): Observable<IdeaModel[]> {
    return this.http.get<IdeaModel[]>('http://localhost:3000/routeIdea/' + typeID + '?idType=typeID&evalID=' + evalId);
  }

  getIdeaCriteriasByEvalAndIdeaID(userID: number, ideaID: number): Observable<IdeaCriteria[]> {
    return this.http.get<IdeaCriteria[]>('http://localhost:3000/routeIdeaCriteria/getIdeaCriteria/' + ideaID + '?userID=' + userID);
  }

  getIdeaCriteriasByPhase(phase: number): Observable<IdeaCriteria[]> {
    return this.http.get<IdeaCriteria[]>('http://localhost:3000/routeIdeaCriteria/getCriteria/' + phase);
  }

  getIdeaCommentsByIdeaID(ideaID: number): Observable<IdeaFeedback[]> {
    return this.http.get<IdeaFeedback[]>('http://localhost:3000/routeIdeaCriteria/getIdeaComments/' + ideaID);
  }

  getIdeaRatingsByIdeaID(ideaID: number, userID: number): Observable<IdeaEvaluation[]> {
    return this.http.get<IdeaEvaluation[]>('http://localhost:3000/routeIdeaEvaluation/getIdeaRatings/' + ideaID + '?userID=' + userID);
  }

  getAvgSubmittedIdeasForRanking(ideas: IdeaModel[]): Observable<IdeaModel[]> {

    return this.http.put<IdeaModel[]>('http://localhost:3000/routeIdeaEvaluation/getAvgSubmittedIdeasForRanking/31?', ideas, httpOptions);
  }

  getEvaluatorsTypeID(userID: number): Observable<Evaluators> {
    return this.http.get<Evaluators>('http://localhost:3000/routeIdeaEvaluation/getEvaluatorType/' + userID );
  }

  getEvaluatorsByTypeID(typeID: number): Observable<Evaluators[]> {
    return this.http.get<Evaluators[]>('http://localhost:3000/routeIdeaEvaluation/getEvaluatorsByType/' + typeID );
  }

  getAllIdeaTypes(): Observable<IdeaType[]> {
    return this.http.get<IdeaType[]>('http://localhost:3000/routeType/');
  }

  getIdeaByTypeName(id: number): Observable<IdeaType> {
    return this.http.get<IdeaType>('http://localhost:3000/routeType/' + id);
  }

  getIdeaStatusName(id: number): Observable<IdeaStatus> {
    return this.http.get<IdeaStatus>('http://localhost:3000/routeStatus/' + id);
  }

  addNewUserIdea(idea: IdeaModel): Observable<IdeaModel> {
    return this.http.post<IdeaModel>('http://localhost:3000/routeIdea/', idea, httpOptions);
  }

  addNewRatingsByUserIdeaID(rating: IdeaEvaluation): Observable<IdeaEvaluation> {
    return this.http.post<IdeaEvaluation>('http://localhost:3000/routeIdeaEvaluation/', rating, httpOptions);
  }

  updateRatingsByUserIdeaID(rating: IdeaEvaluation): Observable<IdeaEvaluation> {
    return this.http.put<IdeaEvaluation>('http://localhost:3000/routeIdeaEvaluation/', rating, httpOptions);
  }

  updateIdeaEvalStatusByUserIdeaID(rating: IdeaEvaluation): Observable<IdeaEvaluation> {
    return this.http.put<IdeaEvaluation>('http://localhost:3000/routeIdeaEvaluation/updateEvalStatus/', rating, httpOptions);
  }

  addNewComment(comment: IdeaFeedback): Observable<IdeaFeedback> {
    return this.http.post<IdeaFeedback>('http://localhost:3000/routeFeedback/', comment, httpOptions);
  }

  updateIdeaStatus(idea: IdeaModel): Observable<IdeaModel> {
    return this.http.put<IdeaModel>('http://localhost:3000/routeIdea/' + idea.ideaID + '?updateAttr=statusID', idea, httpOptions);
  }

  updateIdea(idea: IdeaModel): Observable<IdeaModel> {
    return this.http.put<IdeaModel>('http://localhost:3000/routeIdea/' + idea.ideaID + '?updateAttr=all', idea, httpOptions);
  }

  getMaxid(): Observable<MaxID> {
    return this.http.get<MaxID>('http://localhost:3000/routeIdea/maxId/1');
  }

  checkIfLoggedIn() {
   const ifLoggedIn =  sessionStorage.getItem('loggedin');

   if (ifLoggedIn === 'false' || ifLoggedIn === null) {
     this.router.navigate(['']);
   }

  }

}


