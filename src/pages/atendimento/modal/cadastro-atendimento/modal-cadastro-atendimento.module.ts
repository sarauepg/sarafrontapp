import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCadastroAtendimentoPage } from './modal-cadastro-atendimento';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { Ng2CompleterModule } from 'ng2-completer';

@NgModule({
    declarations: [ModalCadastroAtendimentoPage],
    imports: [
        IonicPageModule.forChild(ModalCadastroAtendimentoPage),
        Ng2CompleterModule
    ]
})
export class ModalCadastroAtendimentoModule { }