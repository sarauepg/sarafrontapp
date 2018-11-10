import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TipoAtendimentoPage } from './tipo-atendimento';
import { SharedModule } from '../../directives/shared.module';

@NgModule({
  declarations: [TipoAtendimentoPage],
  imports: [
    IonicPageModule.forChild(TipoAtendimentoPage),
    SharedModule
  ],
})
export class TipoAtendimentoPageModule {}
