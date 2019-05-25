import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PasswordRecoveryPage } from './password-recovery.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordRecoveryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PasswordRecoveryPage]
})
export class PasswordRecoveryPageModule {}
