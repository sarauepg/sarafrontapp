import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisaoGeralPage } from './visao-geral';
import { SharedModule } from '../../directives/shared.module';

@NgModule({
  declarations: [VisaoGeralPage],
  imports: [
    IonicPageModule.forChild(VisaoGeralPage),
    SharedModule
  ],
})
export class VisaoGeralPageModule {}
