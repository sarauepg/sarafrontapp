import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisaoGeralPage } from './visao-geral';

@NgModule({
  declarations: [
    VisaoGeralPage,
  ],
  imports: [
    IonicPageModule.forChild(VisaoGeralPage),
  ],
})
export class VisaoGeralPageModule {}
