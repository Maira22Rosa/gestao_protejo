import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my_project';
  isLoggedIn: boolean = false;
  nameUsuario: string = '';
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.isLoggedInObservable().subscribe((isLogged: any) => {
      this.isLoggedIn = isLogged;
    });
  }
}
