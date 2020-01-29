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

  constructor(private route: ActivatedRoute, private router: Router, private projService: ProjectService) {

  }

  ngOnInit() {
    this.router.navigate(['login']);
  }

  changeStatusNav(event) {
    if (event.route) {
      console.log('router' + this.router.url);
      if (this.router.url === 'login') {
        sessionStorage.clear();
      }
      this.projService.checkIfLoggedIn();
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
