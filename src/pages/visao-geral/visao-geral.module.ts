import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisaoGeralPage } from './visao-geral';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  declarations: [
    VisaoGeralPage,
  ],
  imports: [
    Ng2GoogleChartsModule,
    IonicPageModule.forChild(VisaoGeralPage),
  ],
})
export class VisaoGeralPageModule {}
