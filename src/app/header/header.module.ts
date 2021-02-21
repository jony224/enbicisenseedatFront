import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TabMenuModule } from 'primeng/tabmenu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,
    TieredMenuModule,
    TabMenuModule,
    BreadcrumbModule,
    ButtonModule,
    ConfirmDialogModule
  ],
  declarations: [HeaderComponent,
    BreadcrumbComponent],
  exports: [HeaderComponent,
    BreadcrumbComponent],
  providers: [ConfirmationService]

})
export class HeaderModule { }
