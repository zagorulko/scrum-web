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
  MdGridListModule,
  MdSelectModule,
  MdSliderModule
} from '@angular/material';

import {
  CovalentCommonModule,
  CovalentDialogsModule,
  CovalentLayoutModule,
  CovalentMediaModule,
  CovalentMenuModule,
  CovalentNotificationsModule,
  CovalentSearchModule
} from '@covalent/core';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';

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
    MdSelectModule,
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentMenuModule,
    CovalentNotificationsModule,
    CovalentSearchModule,
    CovalentDynamicFormsModule,
    NgxChartsModule
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
    MdSelectModule,
    MdSliderModule,
    CovalentCommonModule,
    CovalentDialogsModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentMenuModule,
    CovalentNotificationsModule,
    CovalentSearchModule,
    CovalentDynamicFormsModule,
    NgxChartsModule,
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
