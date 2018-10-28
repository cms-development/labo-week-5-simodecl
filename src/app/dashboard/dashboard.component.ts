import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  username: '';
  password: '';
  errors: null;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }
  login(username, password) {
    const data = {
      username: username,
      password: password,
      client_id: '671c1a41-66db-48af-baac-1c81b0392dea',
      client_secret: 'secret',
      grant_type: 'password'
    };
    const formData = new FormData();
    for (const key of Object.keys(data)) {
      formData.append(key, data[key]);
    }
    this.authService.login(formData).subscribe(result => {
      // Handle result
      console.log(result);
    },
    error => {
      this.errors = error;
    },
    () => {
      // Route to new page
    });
  }
}
