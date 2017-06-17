import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

let imports_and_exports = [
  CommonModule,
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
  MdGridListModule
];

@NgModule({
  imports: imports_and_exports,
  exports: imports_and_exports,
  declarations: []
})
export class SharedModule { }
