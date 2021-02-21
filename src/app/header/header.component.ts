import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { HeaderAnimations } from './header.animations';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: HeaderAnimations
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  isAdmin = false;
  
  state = 'collapse';
  fixed = true;

  menuItems: MenuItem[];
  constructor(public authService: AuthService, private router: Router,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    
    this.menuItems = [
      {label:'Paseos', icon:'pi pi-check', routerLink: ['/paseos'] },
      {label:'Colaboradores',
      items: [
        {label: 'Coordinadores', icon: 'pi pi-user', routerLink: ['/coordinadores']},
        {label: 'Voluntarios', icon: 'pi pi-user', routerLink: ['/voluntarios']}
      ], icon:'pi pi-user'},
      {label:'Beneficiarios', icon:'pi pi-check', routerLink: ['/beneficiarios'] },
      {label:'Entidades', icon:'pi pi-home', routerLink: ['/entidades'] },
      {label:'Vehículos', icon:'pi pi-check', routerLink: ['/vehiculos'] },
      {separator:true},
      {label:'Log Out', icon:'pi pi-fw pi-power-off', command: (event)=>{
        this.logout();
      },routerLink: ['/login'] },
    ];

    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
    })
    this.authService.isUserLoggedAdmin$.subscribe((isAdmin)=> {
      this.isAdmin = isAdmin;
    })
  }

  logout(): void{
    this.confirmationService.confirm({
      message: '¿Estas seguro/a de que quieres cerrar la sesión actual?',
      accept: () => {
        localStorage.removeItem("token");
    this.authService.isUserLoggedIn$.next(false);
    this.authService.isUserLoggedAdmin$.next(false);
    this.router.navigate(["login"]);
      }
    });
    
  }


  expand() {
    if (!this.fixed) {
      this.state = 'expanded';
    }
  }

  colapse() {
    if (!this.fixed) {
      this.state = 'collapse';
    }
  }

  toggle() {
    this.fixed = !this.fixed;
    console.log(this.fixed);
    this.state = this.fixed ? 'collapse' : 'expanded';
  }

}
