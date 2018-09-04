import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCadastroAtendimentoPage } from './modal-cadastro-atendimento';
import { Ng2CompleterModule } from 'ng2-completer';
import { SharedModule } from '../../../../directives/shared.module';

@NgModule({
    declarations: [ModalCadastroAtendimentoPage], 
    imports: [
        IonicPageModule.forChild(ModalCadastroAtendimentoPage),
        Ng2CompleterModule,
        SharedModule
    ]
})
export class ModalCadastroAtendimentoModule { }