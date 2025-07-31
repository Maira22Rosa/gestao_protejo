import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}
  nameUsuario: string = 'Usuário';
  viewNavBar: boolean = false;

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.nameUsuario = localStorage.getItem('username') || 'Usuário';

    this.loginService.usernameObservable().subscribe((name) => {
      this.nameUsuario = name || 'Usuário';
    });
  }
}
