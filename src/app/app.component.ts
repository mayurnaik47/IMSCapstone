import {Component, OnInit} from '@angular/core';
import {ProjectService} from './services/project.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IMSCapstone';
  firstName: string;

  constructor(private route: ActivatedRoute, private router: Router, private projService: ProjectService) {

  }

  ngOnInit() {
    this.router.navigate(['login']);
    this.firstName = sessionStorage.getItem('fName');
  }

  changeStatusNav(event) {
    if (event.route) {
      console.log('router' + this.router.url);
      if (this.router.url === 'login') {
        sessionStorage.clear();
      }
      this.projService.checkIfLoggedIn();
    }

    this.firstName = sessionStorage.getItem('fName');
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
