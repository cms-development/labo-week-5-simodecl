import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  username: '';
  password: '';
  errors: null;
  token: null;

  constructor(
    public authService: AuthService,
    public router: Router) { }

  ngOnInit() {
    localStorage.clear();
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
      localStorage.setItem('access_token', result.access_token);
      localStorage.setItem('refresh_token', result.refresh_token);
      this.router.navigate(['/articles']);
    },
    error => {
      this.errors = error;
    },
    () => {
      // Route to new page
    });
  }
}
