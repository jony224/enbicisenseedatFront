import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  
  private crumb$: BehaviorSubject<MenuItem[]> = new BehaviorSubject([]);

  constructor(
    private router: Router
  ) { }

  crumb(): Observable<MenuItem[]> {
    return this.crumb$.asObservable();
  }

  init(items: MenuItem[]) {
    this.crumb$.next(items);
  }

  push(item: MenuItem) {
    
    this.crumb$.getValue().push(item);
    this.crumb$.next(this.crumb$.getValue());
  }

  vaciar(){
    if(this.crumb$.getValue().length == 2){
      this.pop();
      this.pop();
    }
    if(this.crumb$.getValue().length == 3){
      this.pop();
      this.pop();
      this.pop();
    }
  }

  pop() {
    this.crumb$.getValue().pop();
    this.crumb$.next(this.crumb$.getValue());
  }


  back() {
    const i = this.crumb$.getValue()[this.crumb$.getValue().length - 2];
    if (typeof i.routerLink === 'string') {
      this.router.navigate([i.routerLink]);
    } else {
      this.router.navigate(i.routerLink);
    }
  }


}


