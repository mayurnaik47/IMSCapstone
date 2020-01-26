import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../services/project.service';
import {UserModel} from '../models/project.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn = false;
  usernameStatus = false;
  passwordStatus = false;
  unserpassMatch = true;
  username: string;
  password: string;
  users: UserModel;
  firstName: string;
  lastName: string;

  constructor(private projService: ProjectService, private router: Router) { }

  ngOnInit() {
  }

  OnloggedIn() {

    if (!this.username) { this.usernameStatus = true; } else { this.usernameStatus = false; }

    if (!this.password) { this.passwordStatus = true; } else { this.passwordStatus = false; }

    if (this.password && this.username) {

        this.projService.getUserDetailsByUsername(this.username).subscribe(
          users => {
            this.users = users;
            console.log(this.users);
          },
          error => console.log('Error: ' + error),
          () => {

            if (this.users != null) {
              if (this.username === this.users[0].userName && this.password === this.users[0].password) {
               this.loggedIn = true;
               sessionStorage.setItem('username', this.username);
               sessionStorage.setItem('fName', this.users[0].fName);
               sessionStorage.setItem('lName', this.users[0].lName);
               sessionStorage.setItem('usersID', this.users[0].usersID);
               this.firstName = sessionStorage.getItem('fName');
               this.lastName = sessionStorage.getItem('lName');
               sessionStorage.setItem('loggedin', this.loggedIn.toString());
               this.router.navigate(['home']);
              } else {
                this.unserpassMatch = false;
              }
            } else {

              this.unserpassMatch = false;
            }
          }
        );
      }
    sessionStorage.setItem('loggedin', this.loggedIn.toString());

  } // Function ends

}
