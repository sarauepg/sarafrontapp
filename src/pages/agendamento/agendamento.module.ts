import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendamentoPage } from './agendamento';
import { SharedModule } from '../../directives/shared.module';

@NgModule({
  declarations: [
    AgendamentoPage
  ],
  imports: [
    IonicPageModule.forChild(AgendamentoPage),
    SharedModule
  ],
})
export class AgendamentoPageModule {}
