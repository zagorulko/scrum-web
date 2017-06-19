import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import {
  MdSidenavModule,
  MdToolbarModule,
  MdButtonModule,
  MdIconModule,
  MdCardModule,
  MdCheckboxModule,
  MdRadioModule,
  MdInputModule,
  MdListModule,
  MdProgressSpinnerModule,
  MdProgressBarModule,
  MdTabsModule,
  MdDialogModule,
  MdMenuModule,
  MdSnackBarModule,
  MdGridListModule
} from '@angular/material';

import {
  CovalentCommonModule,
  CovalentLayoutModule,
  CovalentMediaModule,
  CovalentMenuModule,
  CovalentNotificationsModule,
  CovalentSearchModule
} from '@covalent/core';

import { BasicLayoutComponent } from './basic-layout.component';
import { CardLayoutComponent } from './card-layout.component';
import { MenuComponent } from './menu.component';
import { SidenavLayoutComponent } from './sidenav-layout.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdCardModule,
    MdCheckboxModule,
    MdRadioModule,
    MdInputModule,
    MdListModule,
    MdProgressSpinnerModule,
    MdProgressBarModule,
    MdTabsModule,
    MdDialogModule,
    MdMenuModule,
    MdSnackBarModule,
    MdGridListModule,
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentMenuModule,
    CovalentNotificationsModule,
    CovalentSearchModule,
  ],
  exports: [
    CommonModule,
    HttpModule,
    RouterModule,
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdCardModule,
    MdCheckboxModule,
    MdRadioModule,
    MdInputModule,
    MdListModule,
    MdProgressSpinnerModule,
    MdProgressBarModule,
    MdTabsModule,
    MdDialogModule,
    MdMenuModule,
    MdSnackBarModule,
    MdGridListModule,
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentMenuModule,
    CovalentNotificationsModule,
    CovalentSearchModule,
    BasicLayoutComponent,
    CardLayoutComponent,
    SidenavLayoutComponent
  ],
  declarations: [
    BasicLayoutComponent,
    CardLayoutComponent,
    MenuComponent,
    SidenavLayoutComponent
  ]
})
export class SharedModule { }
