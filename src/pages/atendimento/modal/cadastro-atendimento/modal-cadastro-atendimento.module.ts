import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCadastroAtendimentoPage } from './modal-cadastro-atendimento';

@NgModule({
    declarations: [ModalCadastroAtendimentoPage],
    imports: [
        IonicPageModule.forChild(ModalCadastroAtendimentoPage),
    ]
})
export class ModalCadastroAtendimentoModule {}