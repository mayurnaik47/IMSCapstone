import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ProjectService } from "./services/project.service";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SearchresultsComponent } from "./searchresults/searchresults.component";
import { InsertupdateComponent } from "./insertupdate/insertupdate.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MyideasComponent } from "./myideas/myideas.component";
import { MatTableModule } from "@angular/material/table";
import { NgxGaugeModule } from "ngx-gauge";

import {
  MatBadgeModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatSortModule
} from "@angular/material";
import { MatButtonModule } from "@angular/material/button";
import { IdeadetailsComponent } from "./ideadetails/ideadetails.component";
import { EvaluationComponent } from "./evaluation/evaluation.component";
import { EvaluationpanelComponent } from "./evaluationpanel/evaluationpanel.component";
import { IdearankingComponent } from "./idearanking/idearanking.component";
import { Evaluationph2Component } from "./evaluationph2/evaluationph2.component";
import { AdminComponent } from "./admin/admin.component";

const appRoute: Routes = [
  { path: "login", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "evalphase1", component: EvaluationComponent },
  { path: "evalphase2", component: Evaluationph2Component },
  { path: "evalphase1/evalPanel/:id", component: EvaluationpanelComponent },
  { path: "search/:query", component: SearchresultsComponent },
  { path: "insertupdateidea", component: InsertupdateComponent },
  { path: "myideas", component: MyideasComponent },
  { path: "myideas/ideaDetails/:id", component: IdeadetailsComponent },
  { path: "rankingph1", component: IdearankingComponent },
  { path: "admin", component: AdminComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SearchresultsComponent,
    InsertupdateComponent,
    MyideasComponent,
    IdeadetailsComponent,
    EvaluationComponent,
    EvaluationpanelComponent,
    IdearankingComponent,
    Evaluationph2Component,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoute),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSliderModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    NgxGaugeModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule {}
