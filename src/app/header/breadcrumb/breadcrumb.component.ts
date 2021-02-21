import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements OnInit, OnDestroy {


  private subscription: Subscription;

  breadcrumb: MenuItem[];

  isNewItem = false;

  constructor(
    private bService: BreadcrumbService,
    public aService: AuthService
  ) { }


  ngOnInit(): void {
    this.breadcrumb = [
    ]

    this.subscription = this.bService.crumb().subscribe(items => {

      this.isNewItem = true;
      this.breadcrumb = items;
      setTimeout(() => {
        this.isNewItem = false;
      });

    });
  }

 
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
