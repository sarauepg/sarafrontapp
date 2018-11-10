import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtendimentoPage } from './atendimento';
import { Ng2CompleterModule } from 'ng2-completer';
import { SharedModule } from '../../directives/shared.module';

@NgModule({
  declarations: [AtendimentoPage],
  imports: [
    IonicPageModule.forChild(AtendimentoPage),
    Ng2CompleterModule,
    SharedModule
  ],
})
export class AtendimentoPageModule {}
