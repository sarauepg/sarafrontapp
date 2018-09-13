import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ng2CompleterModule } from 'ng2-completer';
import { SharedModule } from '../../../../directives/shared.module';
import { ModalCadastroAgendamentoPage } from './modal-cadastro-agendamento';

@NgModule({
    declarations: [ModalCadastroAgendamentoPage], 
    imports: [
        IonicPageModule.forChild(ModalCadastroAgendamentoPage),
        Ng2CompleterModule,
        SharedModule
    ]
})
export class ModalCadastroAgendamentoModule { }