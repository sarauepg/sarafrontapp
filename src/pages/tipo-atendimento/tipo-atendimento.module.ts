import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TipoAtendimentoPage } from './tipo-atendimento';

@NgModule({
  declarations: [
    TipoAtendimentoPage,
  ],
  imports: [
    IonicPageModule.forChild(TipoAtendimentoPage),
  ],
})
export class TipoAtendimentoPageModule {}