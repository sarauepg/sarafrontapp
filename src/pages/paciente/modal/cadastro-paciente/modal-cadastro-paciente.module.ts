import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ng2CompleterModule } from 'ng2-completer';
import { SharedModule } from '../../../../directives/shared.module';
import { ModalCadastroPacientePage } from './modal-cadastro-paciente';

@NgModule({
    declarations: [ModalCadastroPacientePage], 
    imports: [
        IonicPageModule.forChild(ModalCadastroPacientePage),
        Ng2CompleterModule,
        SharedModule
    ]
})
export class ModalCadastroPacienteModule { }